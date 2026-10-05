---
sidebar_position: 3
title: Brands
description: "Create, list, search, rename, and delete brands within organizations, and manage their icons."
---

# Brands

A **brand** is a child node of exactly one organization. It has:

- a **display name** (must be unique **within its parent organization**, case-insensitive and
  trimmed of whitespace — brands with the same name in different organizations are allowed),
- a system-generated **identifier** (UUID), and
- an **owner** — automatically set to your OS login username when you create it (there is no
  `--owner` flag, same as for organizations).

Every state-changing brand command (`create`, `rename`, `delete`) **requires** an
`--org <name|id>` option identifying the parent organization. The `--org` value can be
either the organization's current display name or its UUID.

`list` and `search` also accept `--org` but treat it as **optional**:
- **with `--org`**, results are scoped to that organization,
- **without `--org`**, results span all organizations (each result line/JSON record
  identifies its parent organization).

There is no implicit "current organization" — every command that needs one takes it
explicitly.

## Create a brand

```bash
branda-cli brand create "Sparkle" --org "Acme"
```

Creates a new brand "Sparkle" under organization "Acme". Fails if the name is already in use
within "Acme" (comparison ignores case and surrounding whitespace) or if the parent
organization does not exist.

## List brands

```bash
# Scoped: only Acme's brands
branda-cli brand list --org "Acme"

# Unscoped: every brand across every organization; each row shows its parent org
branda-cli brand list
```

Both modes sort alphabetically by display name (case-insensitive). Unscoped human-readable
output appends `[<orgName>]` to each row so same-named brands from different organizations
are distinguishable. Empty results (`empty list` / `[]`) return exit code `0`, same as for
organizations.

Add `--table` for an aligned Markdown table. Scoped listings use the columns **Name**, **Owner**,
and **ID**; unscoped listings add an **Organization** column with each brand's current
organization name (or the organization's ID if names can't be loaded, like the plain output).
`--table` can appear anywhere in the command, including before `--org`.

```bash
branda-cli brand list --table
```

```text
| Name    | Organization | Owner | ID                                   |
| ------- | ------------ | ----- | ------------------------------------ |
| Sparkle | Acme         | jdoe  | 7A1B2C3D-4E5F-4A6B-8C7D-9E0F1A2B3C4D |
| Sparkle | Globex       | jdoe  | 8B2C3D4E-5F6A-4B7C-9D8E-0F1A2B3C4D5E |
```

## Search brands

```bash
# Scoped
branda-cli brand search jdoe --org "Acme"
branda-cli brand search <brand-uuid> --org "Acme"

# Unscoped
branda-cli brand search jdoe
branda-cli brand search <brand-uuid>
```

Matches display name and owner as case-insensitive substrings; matches identifier (UUID) as
an exact match. Unscoped results identify each brand's parent organization.

## Rename a brand

```bash
branda-cli brand rename "Sparkle" "Sparkle Plus" --org "Acme"
```

Renames a brand within its parent organization, identified by current name or UUID. The
identifier, owner, and parent organization never change. By default you're asked to confirm;
use `--non-interactive` to skip the prompt for scripts. Renaming to the brand's own current
name is a no-op; renaming to a name already used within the same organization is rejected;
renaming to a name that only exists in a *different* organization is allowed.

## Delete a brand

```bash
branda-cli brand delete "Sparkle" --org "Acme"
```

Deletes a brand from its parent organization, identified by current name or UUID. Prompts
for confirmation unless `--non-interactive` is supplied. The brand's display name becomes
available for reuse within the same organization.

Cascade note: when a whole organization is deleted, all of its brands are deleted with it —
you don't need to delete them individually first (see [Delete an organization](./organizations.md#delete-an-organization)).

If the brand has any assets under it (see [Assets](./assets.md) below), those assets are also
deleted as part of the same operation, and the interactive confirmation prompt tells you
exactly how many:

```
Delete brand "Sparkle" from "Acme"? This will also delete 4 asset(s) [y/N]
```

Cancelling the prompt leaves everything in place — neither the brand nor its assets are
removed.

## Brand icons

Brands have optional icons too, managed exactly like organization icons but with `--org`:

```bash
branda-cli brand icon set "Sparkle" --org "Acme" --file sparkle.png
cat sparkle.svg | branda-cli brand icon set "Sparkle" --org "Acme" --mime-type image/svg+xml
branda-cli brand icon remove "Sparkle" --org "Acme"
```

Output follows the organization commands, for example
`Set icon of brand "Sparkle" in "Acme" (image/png)` or
`Brand "Sparkle" in "Acme" has no icon; nothing to remove`. `brand list --json` and
`brand search --json` include the `icon` object for brands with an icon. The icon file is stored as
`<brandID>.icon` next to the brand's JSON file and is deleted with the brand.
