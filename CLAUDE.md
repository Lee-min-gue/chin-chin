# ChinChin (친친) - Claude Code Guidelines

## Project Overview

This is a Next.js (App Router) project using TypeScript, Supabase for auth/backend, and deployed to Vercel. Always assume this stack unless told otherwise.

- **Framework**: Next.js 16+ with App Router, Turbopack
- **Language**: TypeScript (strict)
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS, Realtime)
- **Auth**: Kakao OAuth (custom server-side implementation via Admin API)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS + shadcn/ui components

## Auth & Supabase

When debugging auth issues (especially Supabase + Kakao OAuth), prefer server-side API route patterns over client-side onAuthStateChange. Client-side Supabase auth has caused infinite loading bugs in this project.

- Auth callback is at `src/app/api/auth/callback/kakao/route.ts`
- Session management middleware at `src/lib/supabase/middleware.ts`
- Never use `onAuthStateChange` for login flow — use server-side verifyOtp

## Environment Variables

Never overwrite .env.local without first backing it up. Do not run `vercel env pull` without warning — it overwrites local env files. Always check existing .env.local values before assuming they are placeholders.

- Required env vars are documented in `.env.example`
- Never commit `.env.local` or any file containing secrets

## Tool Limitations

Interactive CLI commands (gh auth login, vercel login, vercel link) cannot be run by Claude. When these are needed, print the exact command for the user to run manually and wait, rather than attempting them.

## Testing & Validation

After making changes to auth flows, API routes, or environment config, always run `npm run build` to verify no build errors before considering the task complete.

## Documentation Sync

When pushing to GitHub, update the following:
- `implementation-plan.md` — add/check off completed items
- `chinchin-prd.md` — update if features or architecture changed
- Notion process page (ID: `2fb73d17-f446-8196-9c70-fe7213ddd1a7`)
- Notion dev docs page (ID: `2fc73d17-f446-8162-a579-f3347dd85776`)
