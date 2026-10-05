# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Docusaurus website (classic template) with a major version switcher.
- GitHub Pages deployment workflow publishing to <https://branda.mpowr.tech>.
- `mise.toml` with tasks to install, build, serve, and version the website locally.
- Project documentation: `README.md`, `CLAUDE.md`, `CHANGELOG.md`, `LICENSE.md`.
- Branda documentation: What is branda?, Installation, Quickstart, branda-cli reference,
  branda Menu guide, Usage with AI agents, FAQ, Licence, Changelog, and Imprint.
- Branda visual identity: app icon as logo and favicon, ember/apricot palette from the icon,
  Bricolage Grotesque + Instrument Sans typography, light and dark themes, and a social card.
- Homepage with a gradient hero, a slow ring-drift background animation (respects reduced
  motion), a rendering of the status bar popover, and feature highlights.

### Changed

- Deploy workflow uses the latest GitHub Actions (checkout v7, setup-node v7,
  upload-pages-artifact v5, deploy-pages v5), all running on Node.js 24.

### Deprecated

### Removed

- Docusaurus template content (tutorial docs, sample blog posts, the blog, and placeholder
  images).

### Fixed

### Security

[Unreleased]: https://github.com/mpowr-it/branda-website/commits/main
