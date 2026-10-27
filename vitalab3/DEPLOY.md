# VitaLab 3.0 integration (non-destructive)

This feature branch adds a new standalone local-first beta at `/vitalab3/` and does not change V2's routes or database. Once this branch is deployed on the existing Next.js app, visit `/vitalab3/` for the new experience. The feature's static assets are in `public/vitalab3`.

## Validate

```sh
cd vitalab3
npm run verify
node supabase/build-weight-seed.mjs
```

The app uses browser localStorage, not your existing Supabase schema. The SQL files are **optional future scaffolding** and should not be deployed to production without security, migration and privacy review. Do not place live private health records in this beta. Live LLM intelligence, account login, wearable sync and a signed mobile app are NOT implemented.

For a self-contained development server and complete runnable folder use the VitaLab-3.0-build.zip deliverable.
