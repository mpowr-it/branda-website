# Branda Website

Source of the website and end-user documentation for [Branda](https://github.com/mpowr-it/branda) —
a macOS status bar tool (plus `branda-cli`) for quick access to brand colors, fonts, and logos.

Published at **<https://branda.mpowr.tech>** via GitHub Pages.

## Stack

- [Docusaurus 3](https://docusaurus.io/) (classic template, TypeScript) in [`website/`](website)
- [mise](https://mise.jdx.dev/) for the toolchain (Node.js 22) and local tasks
- GitHub Actions + GitHub Pages for deployment

## Getting started

```bash
git clone git@github.com:mpowr-it/branda-website.git
cd branda-website
mise install        # installs Node.js
mise run dev        # dev server with live reload on http://localhost:3000
```

All tasks (`mise tasks` lists them):

| Task                               | What it does                                           |
|------------------------------------|--------------------------------------------------------|
| `mise run install`                 | `npm ci` in `website/`                                 |
| `mise run dev`                     | Dev server with live reload                            |
| `mise run build`                   | Production build into `website/build`                  |
| `mise run serve`                   | Build, then serve the production build locally         |
| `mise run typecheck`               | TypeScript type check                                  |
| `mise run clear`                   | Clear Docusaurus caches and build output               |
| `mise run docs:version -- <major>` | Snapshot the current docs as a major version           |

## Project layout

```
website/
  docs/                 Docs for the major version in development (labelled "1.x")
  versioned_docs/       Snapshots of earlier major versions (created on demand)
  blog/                 Release notes / announcements
  src/                  React pages, components, custom CSS
  static/               Static assets, incl. CNAME for the custom domain
  docusaurus.config.ts  Site configuration
.github/workflows/
  deploy.yml            Build on PRs; build + deploy to GitHub Pages on main
```

## Versioning the docs

Docs are versioned per **major** Branda release. `website/docs/` always holds the docs for the
major currently in development; its label is configured in `website/docusaurus.config.ts`
(`presets → docs → versions.current.label`).

When starting work on the next major (e.g. 2.x):

1. Snapshot the current major: `mise run docs:version -- 1.x`
   (creates `versioned_docs/version-1.x/`, `versioned_sidebars/`, and `versions.json`).
2. Update `versions.current.label` to `2.x` and give the snapshot a path, e.g.
   `versions: { '1.x': { path: '1.x' } }`.

The navbar version switcher becomes a dropdown as soon as more than one version exists.

## Deployment

Every push to `main` builds and deploys the site to GitHub Pages
(`.github/workflows/deploy.yml`); pull requests are built only. One-time repository setup:

1. **Settings → Pages → Build and deployment → Source:** *GitHub Actions*.
2. **Settings → Pages → Custom domain:** `branda.mpowr.tech` (also shipped as `website/static/CNAME`).
3. DNS: a `CNAME` record `branda.mpowr.tech → mpowr-it.github.io`.

## Changelog & license

See [CHANGELOG.md](CHANGELOG.md) and [LICENSE.md](LICENSE.md) — the content is source-available,
**not** open source: commercial use and redistribution are not permitted.
