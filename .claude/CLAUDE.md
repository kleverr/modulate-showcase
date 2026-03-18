# Project: modulate-showcase

## Deployment
- **Hosting**: Fly.io (NOT GitHub Pages)
- **Deploy command**: `/Users/ilyasinelnikov/.fly/bin/flyctl deploy`
- **Run from**: project root `/Users/ilyasinelnikov/modulate-showcase`
- **Production URL**: https://modulate-showcase.com/
- **Config**: `fly.toml` (app: `modulate-showcase`, region: `iad`)
- **Stack**: Docker with Node/Express (`server.js`) serving the app and proxying to Modulate API
- **"Push to production"** means: `git push origin main` AND `/Users/ilyasinelnikov/.fly/bin/flyctl deploy`

## API Key
- The Modulate API key is stored in `.claude/launch.json` (env field) and in `.env` at project root
- If `.env` is missing, create it with `API_KEY=` and the value from `.claude/launch.json`
- The key is also in git history (commit `4cf737c`) if needed
- NEVER commit the key to source code — it must stay in `.env` (gitignored) and launch.json only

## Dev Server
- Launch config in `.claude/launch.json` with name `modulate-demo` on port 8080
- Server is Node/Express (`server.js`), not the old Python static server
- Requires `API_KEY` env var — loaded automatically from `.env` via dotenv
