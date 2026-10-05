---
sidebar_position: 2
title: Organizations
description: "Create, list, search, rename, and delete organizations, and manage their icons."
---

# Organizations

An **organization** is the top-level container in Branda's brand hierarchy. It has:

- a **display name** (must be unique, case-insensitive and trimmed of whitespace),
- a system-generated **identifier** (UUID), and
- an **owner** — automatically set to your OS login username when you create it (there is
  no `--owner` flag; you cannot set someone else as the owner).

## Create an organization

```bash
branda-cli org create "Acme"
```

Creates a new organization named "Acme" owned by you. Fails if the name is already in use
(comparison ignores case and surrounding whitespace) or if the display name is missing.

## List organizations

```bash
branda-cli org list
```

Lists all organizations, sorted alphabetically by display name (case-insensitive). If there
are none, prints `empty list` (human mode) or `[]` (`--json` mode) — this is a success, not
an error.

Add `--table` to print the same organizations as an aligned Markdown table with the columns
**Name**, **Owner**, and **ID** — readable in the terminal and ready to paste into Markdown
documents, tickets, or chat. A `|` in a value is escaped as `\|` so the table stays intact. An
empty list still prints `empty list`.

```bash
branda-cli org list --table
```

```text
| Name          | Owner  | ID                                   |
| ------------- | ------ | ------------------------------------ |
| Acme          | jdoe   | 5F1E0C3A-1B2C-4D5E-8F90-A1B2C3D4E5F6 |
| Globex \| Inc | asmith | 0B9A8C7D-6E5F-4A3B-9C2D-1E0F9A8B7C6D |
```

## Search organizations

```bash
branda-cli org search <term>
```

Searches organizations by:
- **display name** — case-insensitive substring match,
- **owner** — case-insensitive substring match,
- **identifier (UUID)** — exact match only.

```bash
branda-cli org search jdoe                              # find by owner
branda-cli org search 5F1E....-....-....-....-........  # find by exact UUID
```

No matches returns `empty list` / `[]` with a success exit code, same as an empty list.

## Rename an organization

```bash
branda-cli org rename "Acme" "Acme Corp"
```

Renames an organization, identified by its current display name **or** its UUID. The
identifier and owner never change. By default you are asked to confirm before the rename is
applied:

```
Rename "Acme" to "Acme Corp"? [y/N]
```

Use `--non-interactive` to skip the prompt (useful for scripts and automation):

```bash
branda-cli org rename "Acme" "Acme Corp" --non-interactive
```

Renaming an organization to its own current name is treated as a harmless no-op success.
Renaming to a name already used by a different organization is rejected.

## Delete an organization

```bash
branda-cli org delete "Acme"
```

Deletes an organization, identified by its current display name or UUID. Like rename, this
prompts for confirmation unless `--non-interactive` is supplied:

```bash
branda-cli org delete "Acme" --non-interactive
```

Once deleted, an organization's display name becomes available for reuse. Deleting a
nonexistent organization returns a "not found" result (exit code `2`).

If the organization has any brands under it (see [Brands](./brands.md) below), those brands are
also deleted as part of the same operation, and the interactive confirmation prompt tells you
exactly how many:

```
Delete "Acme"? This will also delete 3 brand(s) [y/N]
```

Cancelling the prompt leaves everything in place — neither the organization nor its brands
are removed.

## Organization icons

Every organization can have an optional icon image. Without one, the status-bar app shows a
generated placeholder with the organization's initials.

```bash
# Assign or replace the icon from a file (type inferred from the extension)
branda-cli org icon set "Acme" --file acme-logo.png

# Assign from stdin (then --mime-type is required)
cat acme-mark.svg | branda-cli org icon set "Acme" --mime-type image/svg+xml

# Remove the icon
branda-cli org icon remove "Acme"
```

- Icons accept the same images as `image` assets: any decodable `image/*` file, including SVG
  (which must be well-formed). Invalid input is rejected with exit code `1`, and an existing icon
  stays unchanged.
- `set` prints `Set icon of organization "Acme" (image/png)`; assigning again replaces the icon.
- `remove` prints `Removed icon from organization "Acme"`, or
  `Organization "Acme" has no icon; nothing to remove` (still exit code `0`) when there is none.
- Neither command asks for confirmation. An unknown organization exits with code `2`.
- Renaming keeps the icon; deleting the organization deletes its icon and its brands' icons.
- With `--json`, organizations with an icon include an `icon` object
  (`mimeType`, `fileExtension`, `revision`); the key is omitted when there is no icon. Plain and
  `--table` listings don't show icons.

The icon is stored as `<id>.icon` next to the organization's `<id>.json` file in the data
directory.
