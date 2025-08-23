-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  gender TEXT,
  height_cm INTEGER,
  weight_kg DECIMAL(5,2),
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active')),
  goals TEXT[],
  theme_preference TEXT DEFAULT 'default' CHECK (theme_preference IN ('default', 'forest', 'ocean', 'sunset', 'minimal')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  lifescore INTEGER DEFAULT 500 CHECK (lifescore >= 0 AND lifescore <= 1000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities master table (15,000 entries)
CREATE TABLE IF NOT EXISTS public.activities_master (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('physical', 'emotional', 'mental', 'social', 'spiritual')),
  subcategory TEXT,
  lifescore_impact INTEGER NOT NULL CHECK (lifescore_impact >= -100 AND lifescore_impact <= 100),
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user activity logs
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES public.activities_master(id),
  custom_activity_name TEXT,
  intensity INTEGER CHECK (intensity >= 1 AND intensity <= 10),
  duration_minutes INTEGER,
  mood_before INTEGER CHECK (mood_before >= 1 AND mood_before <= 10),
  mood_after INTEGER CHECK (mood_after >= 1 AND mood_after <= 10),
  energy_before INTEGER CHECK (energy_before >= 1 AND energy_before <= 10),
  energy_after INTEGER CHECK (energy_after >= 1 AND energy_after <= 10),
  notes TEXT,
  lifescore_impact INTEGER,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lifescore history
CREATE TABLE IF NOT EXISTS public.lifescore_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lifescore INTEGER NOT NULL CHECK (lifescore >= 0 AND lifescore <= 1000),
  change_amount INTEGER NOT NULL,
  reason TEXT,
  activity_log_id UUID REFERENCES public.activity_logs(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lifescore_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- RLS Policies for activity_logs
CREATE POLICY "activity_logs_select_own" ON public.activity_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "activity_logs_insert_own" ON public.activity_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "activity_logs_update_own" ON public.activity_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "activity_logs_delete_own" ON public.activity_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for lifescore_history
CREATE POLICY "lifescore_history_select_own" ON public.lifescore_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "lifescore_history_insert_own" ON public.lifescore_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Activities master table is public read-only
CREATE POLICY "activities_master_select_all" ON public.activities_master FOR SELECT TO authenticated USING (true);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update lifescore
CREATE OR REPLACE FUNCTION public.update_lifescore(
  p_user_id UUID,
  p_change_amount INTEGER,
  p_reason TEXT,
  p_activity_log_id UUID DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_score INTEGER;
  new_score INTEGER;
BEGIN
  -- Get current lifescore
  SELECT lifescore INTO current_score FROM public.profiles WHERE id = p_user_id;
  
  -- Calculate new score (ensure it stays within bounds)
  new_score := GREATEST(0, LEAST(1000, current_score + p_change_amount));
  
  -- Update profile
  UPDATE public.profiles 
  SET lifescore = new_score, updated_at = NOW()
  WHERE id = p_user_id;
  
  -- Log the change
  INSERT INTO public.lifescore_history (user_id, lifescore, change_amount, reason, activity_log_id)
  VALUES (p_user_id, new_score, p_change_amount, p_reason, p_activity_log_id);
  
  RETURN new_score;
END;
$$;
