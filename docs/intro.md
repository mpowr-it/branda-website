---
sidebar_position: 1
slug: /
title: What is branda?
description: Branda keeps your brand colors, fonts, logos and documents one click away in the macOS status bar — and exposes them to scripts and AI agents via branda-cli.
---

# What is branda?

**Branda** is a small macOS tool for quick access to brand information — colors, fonts, logos,
videos, PDFs, Markdown documents, and links. It lives in your **status bar** (menu bar), so the
right hex code or logo file is always one click or one shortcut away, and it comes with a
command-line tool, **`branda-cli`**, that exposes the very same data to scripts, other tools, and
AI agents.

## Two ways to use the same data

| | **branda Menu** (`Branda.app`) | **branda-cli** |
| --- | --- | --- |
| What it is | A status bar app with a three-column popover | A command-line tool |
| Best for | Looking things up, copying values, dragging files into other apps | Bulk setup, automation, scripts, AI agents |
| Open it with | Click the status bar icon or press **⌘⌥B** | `branda-cli --help` |

Both read and write the same store on your Mac. A change made in one appears in the other
automatically — the menu refreshes within about two seconds while it is open.

Branda follows a **CLI-first** principle: everything the menu app can do, `branda-cli` can do
too.

## How brand information is organized

Branda organizes everything in a simple three-level hierarchy:

```text
Organization            e.g. "Acme"
└── Brand               e.g. "Sparkle"
    └── Asset           e.g. "Primary Blue", "Logo", "Brand Font", "Guidelines"
```

- An **organization** is the top-level container — a company, a client, or a team.
- A **brand** belongs to exactly one organization. Brand names only need to be unique within their
  organization.
- An **asset** belongs to exactly one brand. Branda supports eight asset types:

| Asset type | What it holds |
| --- | --- |
| RGB color | Red, green, blue (`0`–`255` each) — shown and copied as `#RRGGBB` |
| CMYK color | Cyan, magenta, yellow, key (`0`–`100` each) |
| Image | Any image file, including SVG |
| Font | A font file |
| Video | A local video file (`mp4`, `m4v`, `mov`, `avi`, `mkv`, `webm`) |
| Website link | An `http`/`https` URL |
| PDF | A PDF document, e.g. brand guidelines |
| Markdown | A Markdown document |

Organizations and brands can each have an optional **icon**; without one, Branda shows their
initials on a stable color.

## Highlights

- **Always at hand** — open the popover from any app with **⌘⌥B**, type a few letters, and jump
  straight to any organization, brand, or asset.
- **Copy & drag** — double-click a color to copy its value, drag a logo straight into Keynote,
  Figma, or Finder, and press **Space** for a Quick Look preview.
- **Scriptable** — every `branda-cli` command supports `--json` output and non-interactive mode,
  with documented exit codes.
- **Your data stays yours** — everything is stored locally in open, human-readable JSON files
  under `~/Library/Application Support/Branda/`. No account, no cloud.
- **Zero dependencies** — a native Swift app for macOS 13 (Ventura) or later.

## Where to go next

- [Installation](./installation.md) — get Branda onto your Mac.
- [Quickstart](./quickstart.mdx) — set up your first organization, brand, and assets in five
  minutes.
- [branda-cli](./cli/index.md) — the complete command-line reference.
- [branda Menu](./menu/index.md) — everything the status bar app can do.
- [Usage with AI agents](./ai-agents.mdx) — let coding agents read your brand information.
