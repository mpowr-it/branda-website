# Branda Website

Website and end-user documentation for the Branda app, built with Docusaurus and published to
<https://branda.mpowr.tech> via GitHub Pages. See `README.md` for setup, tasks, and deployment.

## OmniMem

The `omnimem` MCP server is the persistent memory store for this work; follow the instructions it
provides. **This repository's project name is** `branda-website` — use it for `briefing()`,
`recall()`, `update_project_state()`, and as the project tag. Do not derive the name from the
working directory: work happens in git worktrees (`~/orca/workspaces/branda-website/<branch>`).

## Related repository

The app itself lives in `mpowr-it/branda` (locally `~/Sites/MPOWR-IT/experiments/branda`).
Its `doc/cli.md` and `doc/status-bar.md` are the source of truth for feature behavior —
check them before documenting a feature here; do not invent behavior.

## Conventions

- Use `mise run <task>` (see `mise.toml`) rather than raw `npm` commands.
- Before committing, run `mise run typecheck` and `mise run build` — the build fails on broken
  links (`onBrokenLinks: 'throw'`).
- Docs are versioned per major Branda version. `docs/` is the major in development;
  never edit `versioned_docs/` except to fix errors in an already-released major.
- Record notable changes under `[Unreleased]` in `CHANGELOG.md` (Keep a Changelog format).
- Deployment happens only from `main` via `.github/workflows/deploy.yml`; never run
  `docusaurus deploy` manually.
- Content is under the restrictive license in `LICENSE.md`; don't add third-party content
  whose license conflicts with it.
