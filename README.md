# FreeStuff API Docs

Source of https://docs.freestuffbot.xyz, built with [Docus](https://docus.dev) and deployed to GitHub Pages on push to `master`.

```bash
bun install
bun run dev        # http://localhost:3008
bun run generate   # static build into .output/public
```

- Pages live in `content/`, API data models and endpoints in `data/api-v2.json` (rendered by `app/components/content/`).
- For AI agents the build also emits `/llms.txt`, `/llms-full.txt`, `/sitemap.md`, a markdown copy of every page under `/raw/<path>.md` and the agent skills from `skills/` under `/.well-known/skills/`.
- `server/plugins/agent-api-reference.ts` expands the `:data-model` / `:endpoint` components into plain markdown for those files.
