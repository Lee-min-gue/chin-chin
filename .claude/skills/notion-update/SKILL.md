---
description: Sync local docs and Notion pages with current project state
user_invocable: true
---

# Update All Documentation

Sync all project documentation with the current codebase state:

1. **Analyze recent changes**
   - Check `git log` for recent commits since last documented update
   - Identify what features were added, bugs fixed, or improvements made

2. **Update local documents**
   - `implementation-plan.md` — add/check off completed items, add new phases if needed
   - `chinchin-prd.md` — update if features, architecture, or tech stack changed

3. **Update Notion pages**
   - Process page (ID: `2fb73d17-f446-8196-9c70-fe7213ddd1a7`) — add new process section
   - Dev docs page (ID: `2fc73d17-f446-8162-a579-f3347dd85776`) — add new phase checklist

4. **Commit documentation changes**
   - Stage and commit updated local docs
   - Push to remote
