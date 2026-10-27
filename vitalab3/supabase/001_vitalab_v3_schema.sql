-- VitaLab V3 optional cloud schema. NOT used by the bundled local-first app.
-- Apply in a fresh Supabase project or after reviewing against your current schema.
-- Existing v2 tables remain untouched; v3 names are isolated to prevent collisions.
-- Cloud synchronisation and authentication UI still need implementation.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.v3_profiles (
 user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 display_name text NOT NULL DEFAULT '' CHECK (char_length(display_name)<=70),
 goals text[] NOT NULL DEFAULT '{}',
 timezone text NOT NULL DEFAULT 'Australia/Perth',
 theme text NOT NULL DEFAULT 'dark' CHECK (theme IN ('dark','light')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.v3_activity_weights (
 id text PRIMARY KEY,
 title text NOT NULL,
 category text NOT NULL,
 domain text NOT NULL CHECK (domain IN ('body','rest','mind','connection','purpose','environment')),
 base_impact integer NOT NULL CHECK (base_impact BETWEEN -12 AND 12),
 reference_minutes integer NOT NULL DEFAULT 30 CHECK(reference_minutes BETWEEN 1 AND 1440),
 catalog_version text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.v3_activity_logs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 activity_base_id text NOT NULL REFERENCES public.v3_activity_weights(id),
 activity_variant_id text NOT NULL,
 activity_variant_label text NOT NULL DEFAULT '' CHECK(char_length(activity_variant_label)<=200),
 duration_minutes integer NOT NULL CHECK(duration_minutes BETWEEN 1 AND 1440),
 intensity integer NOT NULL CHECK(intensity BETWEEN 1 AND 10),
 impact integer NOT NULL CHECK(impact BETWEEN -24 AND 24),
 notes text NOT NULL DEFAULT '' CHECK(char_length(notes)<=1500),
 engine_version text NOT NULL DEFAULT '3.1.0',
 logged_at timestamptz NOT NULL DEFAULT now(),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS v3_logs_user_date_idx ON public.v3_activity_logs(user_id,logged_at DESC);
CREATE INDEX IF NOT EXISTS v3_logs_user_base_idx ON public.v3_activity_logs(user_id,activity_base_id,logged_at DESC);

CREATE TABLE IF NOT EXISTS public.v3_daily_checkins (
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 date date NOT NULL,
 mood smallint CHECK(mood BETWEEN 1 AND 5),
 energy smallint CHECK(energy BETWEEN 1 AND 5),
 stress smallint CHECK(stress BETWEEN 1 AND 5),
 sleep_hours numeric(4,2) CHECK(sleep_hours BETWEEN 0 AND 24),
 water_glasses integer CHECK(water_glasses BETWEEN 0 AND 40),
 steps integer CHECK(steps BETWEEN 0 AND 100000),
 resting_hr integer CHECK(resting_hr BETWEEN 20 AND 240),
 notes text NOT NULL DEFAULT '' CHECK(char_length(notes)<=2000),
 updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (user_id,date)
);

CREATE TABLE IF NOT EXISTS public.v3_goals (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 title text NOT NULL CHECK(char_length(title) BETWEEN 1 AND 90),
 domain text NOT NULL CHECK (domain IN ('body','rest','mind','connection','purpose','environment')),
 weekly_target integer NOT NULL CHECK(weekly_target BETWEEN 1 AND 28),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS v3_goals_user_idx ON public.v3_goals(user_id);

CREATE TABLE IF NOT EXISTS public.v3_journal (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 text text NOT NULL CHECK(char_length(text) BETWEEN 1 AND 4000),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS v3_journal_user_idx ON public.v3_journal(user_id,created_at DESC);

ALTER TABLE public.v3_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v3_activity_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v3_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v3_daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v3_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v3_journal ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS v3_profile_own ON public.v3_profiles;
CREATE POLICY v3_profile_own ON public.v3_profiles FOR ALL TO authenticated USING(user_id=(SELECT auth.uid())) WITH CHECK(user_id=(SELECT auth.uid()));
DROP POLICY IF EXISTS v3_weights_read ON public.v3_activity_weights;
CREATE POLICY v3_weights_read ON public.v3_activity_weights FOR SELECT TO authenticated USING(true);
-- Intentionally no client insert/update/delete on weights; admins load seeds from SQL.
DROP POLICY IF EXISTS v3_log_read ON public.v3_activity_logs;
CREATE POLICY v3_log_read ON public.v3_activity_logs FOR SELECT TO authenticated USING(user_id=(SELECT auth.uid()));
DROP POLICY IF EXISTS v3_log_delete ON public.v3_activity_logs;
CREATE POLICY v3_log_delete ON public.v3_activity_logs FOR DELETE TO authenticated USING(user_id=(SELECT auth.uid()));
-- Intentionally no direct INSERT or UPDATE policy for activity logs.
-- Authenticated writes must pass through the server-defined score function below.
DROP POLICY IF EXISTS v3_checkins_own ON public.v3_daily_checkins;
CREATE POLICY v3_checkins_own ON public.v3_daily_checkins FOR ALL TO authenticated USING(user_id=(SELECT auth.uid())) WITH CHECK(user_id=(SELECT auth.uid()));
DROP POLICY IF EXISTS v3_goals_own ON public.v3_goals;
CREATE POLICY v3_goals_own ON public.v3_goals FOR ALL TO authenticated USING(user_id=(SELECT auth.uid())) WITH CHECK(user_id=(SELECT auth.uid()));
DROP POLICY IF EXISTS v3_journal_own ON public.v3_journal;
CREATE POLICY v3_journal_own ON public.v3_journal FOR ALL TO authenticated USING(user_id=(SELECT auth.uid())) WITH CHECK(user_id=(SELECT auth.uid()));

-- Authoritative scoring: the client cannot submit an arbitrary impact value.
-- This RPC records a versioned raw impact. The 35-day rolling score, duplicate
-- attenuation and per-day caps remain derived by the LifeScore engine.
CREATE OR REPLACE FUNCTION public.v3_log_activity(
 p_base_id text,
 p_variant_id text,
 p_variant_label text,
 p_duration integer,
 p_intensity integer,
 p_notes text DEFAULT ''
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
 v_user uuid := auth.uid();
 v_weight integer;
 v_ref integer;
 v_result integer;
 v_raw numeric;
 v_id uuid;
BEGIN
 IF v_user IS NULL THEN RAISE EXCEPTION 'Sign in required' USING ERRCODE='28000'; END IF;
 IF p_duration NOT BETWEEN 1 AND 1440 OR p_intensity NOT BETWEEN 1 AND 10 THEN
  RAISE EXCEPTION 'Invalid intensity or duration' USING ERRCODE='22023';
 END IF;
 IF char_length(COALESCE(p_notes,''))>1500 OR char_length(COALESCE(p_variant_id,''))>180
    OR char_length(COALESCE(p_variant_label,''))>200 THEN
  RAISE EXCEPTION 'Input too long' USING ERRCODE='22023';
 END IF;
 SELECT base_impact, reference_minutes INTO v_weight,v_ref
 FROM public.v3_activity_weights WHERE id=p_base_id;
 IF NOT FOUND THEN RAISE EXCEPTION 'Unknown activity' USING ERRCODE='22023'; END IF;
 v_raw := v_weight
   * LEAST(1.6,GREATEST(0.55,sqrt(p_duration::numeric/v_ref::numeric)))
   * LEAST(1.25,GREATEST(0.8,0.78+p_intensity*.048));
 v_result := CASE WHEN v_weight=0 THEN 0 ELSE sign(v_raw)::integer * GREATEST(1,round(abs(v_raw))::integer) END;
 v_result := GREATEST(-24,LEAST(24,v_result));
 INSERT INTO public.v3_activity_logs(user_id,activity_base_id,activity_variant_id,activity_variant_label,duration_minutes,intensity,impact,notes)
 VALUES(v_user,p_base_id,p_variant_id,COALESCE(p_variant_label,''),p_duration,p_intensity,v_result,COALESCE(p_notes,''))
 RETURNING id INTO v_id;
 RETURN v_id;
END;
$$;
REVOKE ALL ON FUNCTION public.v3_log_activity(text,text,text,integer,integer,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.v3_log_activity(text,text,text,integer,integer,text) TO authenticated;

-- Production notes:
-- 1. Load 002_vitalab_v3_weights.sql using the SQL editor/service role, not client keys.
-- 2. Use Supabase Auth and call v3_log_activity via authenticated RPC.
-- 3. Query v3_activity_logs for a user under RLS; never accept user_id from clients.
-- 4. Configure retention, account deletion, key rotation, backups, export, AU privacy review.
-- 5. Audit scoring weights with clinical/wellbeing experts prior to public health claims.