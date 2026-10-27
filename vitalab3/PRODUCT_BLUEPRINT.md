# VitaLab 3.0 · Consolidated Product Blueprint

**Product principle:** life and wellbeing are multidimensional, interconnected and personal. VitaLab helps people record daily events and reflect on them without pathologising emotions or turning an arbitrary score into a medical claim.

## Architecture decisions and feature inventory

| Capability from the VitaLab project | State in this deliverable | Notes |
|---|---|---|
| 0–1,000 LifeScore, dynamic ± activity effects | **Working** | 500 neutral baseline, duration/intensity moderation, 10-day decay, daily caps, duplicate attenuation, deterministic |
| 10,000+ logging choices, aliases and slang | **Working** | 742 curated base activities × context variations = 18,096 selectable combinations; aliases not a separate behaviour count |
| Daily mood, stress, energy, sleep, nutrition and hydration | **Working in part** | Mood, stress, energy, sleep, water, steps, resting HR entered via check-ins; nutrition activity choices in catalogue |
| Life map, timeline, history and trend views | **Working** | Calendar, log history, 14/30-day charts, 6 domain buckets |
| Onboarding, user goals, habits, gamification | **Working in part** | Local onboarding, goals, streaks and private challenges; no leaderboards |
| AI reflections and activity inference | **Rules-based substitute** | Suggestions and explainable insights, not a trained AI model or emotional classifier |
| Self-reported biometrics | **Working in part** | Steps and resting HR in local daily check-in; no wearables |
| Reports, data portability, personal privacy | **Working in part** | Printable summary, CSV/JSON export/import, deletion; local storage not encrypted |
| Supabase Auth, PostgreSQL, RLS, secure sync | **Schema only** | Optional SQL in `supabase/`; no active cloud integration |
| Apple Health, Health Connect, Garmin, Oura, Fitbit, WHOOP | **Future integration** | Requires vendor permissions and consent, and platform SDK development |
| AI health/nutrition coaching, predictive insights | **Future with safety review** | Need validated evidence, bias checks, escalation and appropriate claims |
| Native Android / iOS apps | **Future** | Responsive web app / PWA works in browser, but no signed APK/IPA |
| Social community, coaches, NDIS care mode | **Future** | Separate consent, permission, accessibility and safeguarding requirements |
| Optional spirituality / astrology modules | **Future opt-in** | Must be clearly separate from medical evidence and LifeScore |
| Sexual/reproductive wellbeing modules | **Future opt-in** | Stronger confidentiality, age gating and regional privacy checks required |

## LifeScore 3.1 model

For an activity with curated base effect `b ∈ [-12,12]`, duration `t`, typical duration `r`, and user intensity `i ∈ [1,10]`:

```
duration_factor = clamp(sqrt(t/r), 0.55, 1.6)
intensity_factor = clamp(0.78 + 0.048*i, 0.8, 1.25)
raw_impact = sign(b) * max(1, round(abs(b*duration_factor*intensity_factor)))
repeat_factor = 1 / sqrt(1 + same-activity-entries-earlier-today)
daily_positive_cap = 65
daily_negative_cap = 65
recency_weight = 0.5 ^ (age_in_days / 10)
LifeScore = clamp(500 + round(sum(capped_impact * recency_weight over last 35 days)), 0, 1000)
```

This is a **behavioural engagement model**. No score change is calculated from mood, stress, disability, body weight, illness, medical medication, lack of entries or personal traits. Catalog weights remain product hypotheses pending research/clinical review. Historical scores are recomputed from logged entries and the current model; freeze engine versions during server migration to preserve auditability.

## Domain mapping

- **Physical:** movement, food choices and hydration.
- **Rest & sleep:** sleep hygiene, rest and recovery routines.
- **Mental:** mindfulness, learning, self-care, balanced digital use.
- **Social:** personal connections and community support.
- **Purpose:** focus, personal growth, creativity, meaningful contribution.
- **Environment:** home, nature, surroundings and sustainability.

The UI reports the number of logs per domain, never a fabricated objective domain 'health score'.

## Roadmap to a production release

**Gate 1: Stabilise and validate.** UX testing with different accessibility needs; reviewer assessment of ambiguous catalog entries, nutrition and behaviour weighting; timezone and localisation testing; automated browser E2E CI; data restore and deletion stress tests.

**Gate 2: Authenticated persistence.** Deploy Supabase schema to a test project; implement account creation, MFA, consent, RLS-backed CRUD and `v3_log_activity` server RPC. Migrate old v2 `activity_logs`/`user_activities` by reviewed mapping. Never transfer unconsented demo or real data.

**Gate 3: Security and legal.** Encrypt sensitive data appropriately, independent security review, AU privacy compliance, data breach and deletion procedures, user age/consent controls, retention policy, audit logs, backups, export, access review.

**Gate 4: Integrations.** Build HealthKit (iOS), Health Connect (Android) and wearable provider connectors. Explicit per-source permission and transparent provenance, deduplication and reconciliation.

**Gate 5: Intelligence.** Optional AI reflection adapter with opt-in, minimum necessary data transfer, safety boundaries, evaluation and monitored hallucination/error rates. No unsupported clinical/diagnostic claims.

**Gate 6: Mobile and launch.** Shared app engine packaged for Android and iOS, secure native storage, offline sync/conflict resolution, push notification consent, crash reporting, app store review, staged release and monitoring.

## Launch acceptance criteria

- Every user-owned table enforces RLS in Supabase and passes cross-user data isolation tests.
- Score is consistent between client/server; idempotency and repeated logs cannot fraudulently inflate score beyond documented rules.
- All personal data can be exported and erased, including provider-side and backups subject to retention disclosure.
- No sensitive fields leak into third-party analytics, logs, crash reports or URL query parameters.
- More than 10,000 searchable context choices remain performant on low-memory Android devices.
- WCAG 2.2 AA accessibility audit, keyboard navigation, reduced motion and screen-reader checks pass.
- No live AI or wearable feature is labelled working unless connected and tested end to end.
- Wellness and medical language reviewed for applicable Australian requirements.