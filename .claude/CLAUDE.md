# Project: modulate-showcase

## Deployment
- **Hosting**: Fly.io (NOT GitHub Pages)
- **Deploy command**: `/Users/ilyasinelnikov/.fly/bin/flyctl deploy`
- **Run from**: project root `/Users/ilyasinelnikov/modulate-showcase`
- **Production URL**: https://modulate-showcase.com/
- **Config**: `fly.toml` (app: `modulate-showcase`, region: `iad`)
- **Stack**: Docker with Node.js + Express backend (rate limiting via SQLite, API proxy)
- **"Push to production"** means: `git push origin main` AND `/Users/ilyasinelnikov/.fly/bin/flyctl deploy`

## Dev Server
- Launch config in `.claude/launch.json` with name `modulate-demo` on port 8080
