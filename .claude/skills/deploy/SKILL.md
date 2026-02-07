---
description: Build, deploy to Vercel, and update documentation
user_invocable: true
---

# Deploy to Vercel

Execute the following steps in order:

1. **Pre-flight check**
   - Run `npm run build` and fix any TypeScript or build errors
   - Verify the build completes with 0 errors

2. **Deploy**
   - Run `vercel --prod` to deploy to production
   - If not linked, ask the user to run `vercel link` manually (do NOT attempt it yourself)
   - Confirm the deployment URL responds successfully

3. **Git commit & push** (if there are uncommitted changes)
   - Stage and commit any pending changes
   - Push to the remote repository

4. **Update documentation**
   - Update `implementation-plan.md` with any new completed items
   - Update `chinchin-prd.md` if features or architecture changed
   - Update Notion process page (ID: `2fb73d17-f446-8196-9c70-fe7213ddd1a7`) with deployment notes
   - Update Notion dev docs page (ID: `2fc73d17-f446-8162-a579-f3347dd85776`) with phase checklist

5. **Report summary**
   - Show deployment URL
   - List what was deployed
   - Confirm documentation was updated
