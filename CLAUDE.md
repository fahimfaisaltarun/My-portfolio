@AGENTS.md

# Claude-specific notes

`AGENTS.md` (imported above) is the single source of truth for project rules — put shared rules
there, not here, so every coding agent sees the same instructions. This file only holds things
specific to Claude Code.

- **Verify visually.** After UI changes, open the running dev server in the browser pane and check
  the result (desktop and ~375px mobile width) instead of assuming the code works. Check the
  console for errors and hydration warnings.
- **Check the Next.js docs first.** This is Next.js 16 — read `node_modules/next/dist/docs/` for the
  API you're touching before writing code. Don't rely on memory for metadata, caching, fonts or
  routing APIs.
- **Finish with** `npm run lint`, `npx tsc --noEmit` and `npm run build`. Report failures honestly.
- **Design decisions are settled** (palette "Ember noir", Inter Tight + Instrument Serif). Don't
  propose new palettes or fonts unless asked; extend the existing tokens instead.
- When the user approves a new decision in chat, record it in the decision log in
  `docs/project-brief.md`.
