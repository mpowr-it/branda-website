---
sidebar_position: 9
title: CHANGELOG
description: All notable changes to Branda.
---

# Changelog

All notable changes to Branda are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and Branda adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Released versions are available on
the [GitHub Releases page](https://github.com/mpowr-it/branda/releases).

## [Unreleased]

### Added

- Organization management: create, rename, delete, list, and search organizations via
  `branda-cli org`.
- Organization management UI: a macOS status bar app (`BrandaMenuBar`) with a three-column
  popover; column 1 (organizations) fully functional, with type-ahead search.
- Brand management: create, rename, delete, list, and search brands within an organization
  via `branda-cli brand`; deleting an organization cascades to its brands.
- Brand management UI: column 2 of the status bar popover becomes a fully functional brand
  manager for the organization selected in column 1; search suggestions merge organizations
  and brands.
- Brand asset management: create, update, rename, reposition, delete, and list brand assets
  (RGB/CMYK colors, images, SVGs, fonts) via `branda-cli asset`; deleting a brand cascades to
  its assets.
- Color shorthand input: `branda-cli asset create`/`update` accept a hex code, comma-separated
  RGB triple, or compact CMYK token in place of `--type` plus channel flags, with the asset's
  name auto-detected from a standard named-color palette unless `--name` is supplied.
- Continuous integration: every push/PR to `main` builds the Swift package and runs the full
  test suite on macOS.
- Release automation: pushing a SemVer tag (e.g. `v1.0.0`) on `main` builds a universal
  (Apple Silicon + Intel) `.dmg` installer bundling both `branda-cli` and the `BrandaMenuBar`
  status bar app, and publishes it as a GitHub Release.
</content>
