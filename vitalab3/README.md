# VitaLab 3.0 · Life, in perspective.

A working, responsive **local-first holistic wellbeing web application** that consolidates the VitaLab / VITALABS design work into one coherent experience. Built 28 October 2026.

## Start the application

Requires Node.js 20+ (no `npm install` necessary; the app has **zero runtime dependencies**).

```bash
npm start
```

Open **http://localhost:4173**. Choose **Create my VitaLab** to start a private, empty workspace or **Explore with clearly labelled sample data** for a seeded demo. You can also upload this folder to any static HTTPS host; set its publishing directory to the folder containing `index.html`.

Run tests:

```bash
npm run verify
```

## What actually works

- Fully responsive dark/light dashboard, installable PWA on supporting browsers, static offline caching after first visit.
- Guided onboarding and optional, explicitly labelled sample data.
- **LifeScore™ 0–1,000**, calculated from a deterministic, auditable scoring engine; score trend, domain breakdown and duplicate-entry attenuation.
- **742 distinct curated base activities and 18,096 selectable context variants**, across 21 activity categories and six life dimensions. Search supports common colloquial terms. Users cannot edit impact weights.
- Quick-logging, searchable activity library, natural-language **suggestions** and an explanation of each estimated activity impact; no fictitious AI scoring.
- Daily check-ins for mood, energy, stress, sleep, hydration, steps and resting heart rate; check-in symptoms never reduce LifeScore.
- Activity timeline, calendar heatmap, week/month trend charts, personal goal tracking, reflections and explainable pattern insights.
- Complete JSON export/import, CSV export, print-friendly reports and local data deletion.
- Cross-device responsive design, keyboard navigation, explicit status messages and colour contrast foundations.

## Important status and privacy limitations

This is a **functional beta**, not a launched, clinical, regulated or production-hosted health service. No online account, cloud sync, clinician validation, wearables, third-party health integration, facial emotion recognition, shared community, social leaderboards, emergency/crisis handling or LLM API is connected. Insights are deterministic and generated on-device.

**Sensitive information is stored in browser localStorage, which is not encrypted.** Local storage is not suitable for protected personal health information on shared or compromised devices. Use fictional demo data until cloud security, consent, privacy policy, retention, access controls and deletion workflows have been reviewed. Clearing browser data deletes records unless exported. The PWA cache stores application files, not a database backup.

LifeScore is an **experimental behavioural reflection index, not a clinically validated measure of health or wellbeing**. It must not be interpreted as a diagnosis, risk prediction or judgment of a person. The rules are a product hypothesis requiring expert review and user validation before any clinical claims.

## Architecture

```text
index.html + app.css
  └── src/app.mjs        UI, navigation, interaction and data binding
      ├── src/catalog.mjs   curated base activities + generated context variants
      ├── src/engine.mjs    deterministic LifeScore and insights
      └── src/storage.mjs   local state, import/export and sanitation
sw.js                     offline static cache
serve.mjs                 no-dependency local HTTP server
supabase/                 optional future RLS cloud schema + authoritative weights
```

All application code is readable source and can be developed directly. No proprietary SDK, account or backend service is required to explore it.

## Relationship to earlier VitaLab projects

This build uses the broader feature history of the Replit VitaLab app, v0/Vercel VitaLab V2, Expo mobile preview, and the life-intelligence developer blueprints. It does **not** silently overwrite those repositories or migrate their user data. In particular, V2's activity logging refers to both `user_activities` and `activity_logs`, and an older SQL function refers to `user_profiles`/`score` where the schema defines `profiles`/`lifescore`. The V3 engine therefore lives in its own namespace and uses a versioned, deterministic model.

The optional SQL schema in `supabase/` is prepared for future secure sign-in and server-authoritative scoring. **It is not wired into this local beta** and must not be executed against production without review/migration testing. See `PRODUCT_BLUEPRINT.md` for scope and launch gates.