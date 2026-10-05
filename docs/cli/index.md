---
sidebar_position: 1
title: branda-cli
description: "Overview of branda-cli: command structure, global flags, exit codes, and examples."
---

# branda-cli

`branda-cli` is Branda's command-line interface for managing brand information. It is the primary
way to interact with Branda — the [branda Menu](../menu/index.md) status bar app uses the same
underlying capabilities, and every change made here shows up there automatically.

The release installer puts `branda-cli` in `/usr/local/bin` (see [Installation](../installation.md)).
When working from source, run it via `swift run branda-cli`.

## Global usage

```bash
branda-cli <command> <subcommand> [args] [flags]
```

Commands are grouped: `org` (organizations), `brand` (brands within organizations), and
`asset` (assets — colors, images (including SVGs), fonts — within a brand).

Running `branda-cli --help` on its own lists the top-level commands (`org`, `brand`,
`asset`); running `branda-cli org --help`, `branda-cli brand --help`, or
`branda-cli asset --help` lists that command's subcommands.

## Global flags

| Flag                 | Description                                                   |
| -------------------- | --------------------------------------------------------------- |
| `--non-interactive`  | Skip confirmation prompts (applies to `rename` and `delete`)      |
| `--json`             | Emit machine-readable JSON instead of human-readable text         |
| `--table`            | Print `list` results as an aligned Markdown table (see each `list` section below) |
| `--no-pager`         | Print a long listing in one go instead of paging it (see [Paging](./output.md#paging)) |
| `--help` / `-h`      | Show usage help                                                    |

`--table` is only accepted by `list` subcommands and can't be combined with `--json`. Using it
anywhere else — for example `org search Acme --table` or `org list --table --json` — fails with
exit code `1` before any data is read or changed:

```text
Invalid flag: --table is only supported by list
Invalid flags: --table and --json cannot be combined
```

## Exit codes

| Code | Meaning                                                                      |
| ---- | ----------------------------------------------------------------------------- |
| `0`  | Success (including an empty list or no search matches)                        |
| `1`  | Validation error (missing/empty input, duplicate name, invalid asset payload, invalid flag combination)  |
| `2`  | Not found (the referenced organization, brand, or asset does not exist)        |
| `3`  | Aborted (confirmation declined, or required but unavailable)                   |

## Command groups

| Command | Manages | Reference |
| --- | --- | --- |
| `org` | Organizations | [Organizations](./organizations.md) |
| `brand` | Brands within an organization | [Brands](./brands.md) |
| `asset` | Colors, images, fonts, videos, links, PDFs, Markdown within a brand | [Assets](./assets.md) |
| `stats` | Totals across the whole store | [Stats](./stats.md) |
| `settings` | The status bar app's global shortcuts | [Settings](./settings.md) |

Output formats (`--json`, `--table`) and paging are described in
[Output & paging](./output.md); diagnostics and environment variables in
[Logging & environment](./logging.md).

## Examples

```bash
# Create two organizations
branda-cli org create "Acme"
branda-cli org create "Globex"

# Create brands under them
branda-cli brand create "Sparkle" --org "Acme"
branda-cli brand create "Shine"   --org "Acme"
branda-cli brand create "Sparkle" --org "Globex"   # same name is fine in a different org

# List everything
branda-cli org list
branda-cli brand list                              # all brands, each labelled with its org

# Find your brands
branda-cli brand search "$(whoami)"

# Rename a brand, skipping confirmation
branda-cli brand rename "Sparkle" "Sparkle Plus" --org "Acme" --non-interactive

# Build up a brand's assets
branda-cli asset create "Primary Blue" --type color_rgb --r 10 --g 20 --b 200 --brand "Sparkle Plus" --org "Acme"
branda-cli asset create "Ink"          --type color_cmyk --c 10 --m 0 --y 0 --k 90 --brand "Sparkle Plus" --org "Acme"
branda-cli asset create "Logo"         --type image --file logo.png --brand "Sparkle Plus" --org "Acme"
branda-cli asset list --brand "Sparkle Plus" --org "Acme"

# Update a color's values without recreating the asset
branda-cli asset update "Primary Blue" --r 0 --g 0 --b 0 --brand "Sparkle Plus" --org "Acme"

# Reorder assets, then remove one
branda-cli asset reposition "Ink" --position 0 --brand "Sparkle Plus" --org "Acme"
branda-cli asset delete "Ink" --brand "Sparkle Plus" --org "Acme" --non-interactive

# Cascade delete: removes Acme AND its brands (and each brand's assets) in one go
branda-cli org delete "Acme" --non-interactive
```
