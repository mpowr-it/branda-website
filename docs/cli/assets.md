---
sidebar_position: 4
title: Assets
description: "Manage brand assets — RGB/CMYK colors, images, fonts, videos, website links, PDFs, and Markdown."
---

# Assets

An **asset** is a child node of exactly one brand — one of eight types used to build up a
brand's visual identity:

| Type          | Represents                          | Payload                                             |
| ------------- | ------------------------------------ | ---------------------------------------------------- |
| `color_rgb`   | An RGB color (for a color palette)   | Red, green, blue — each `0`–`255`                     |
| `color_cmyk`  | A CMYK color (for a color palette)   | Cyan, magenta, yellow, key/black — each `0`–`100`     |
| `image`       | Any `image/*` file (including SVG)   | The file's raw bytes + its MIME type                  |
| `font`        | A font file                          | The file's raw bytes (validated by file signature)     |
| `video`       | A local video file                   | The file's raw bytes (container detected from content) |
| `website_link`| A web page                           | A normalized `http`/`https` URL                        |
| `pdf`         | A PDF document                       | The file's raw bytes (must be a readable PDF)          |
| `markdown`    | A Markdown document                  | The file's raw bytes (must be UTF-8 or UTF-16 text)    |

> **SVGs are images.** There is no separate `svg` asset type. Create an SVG with
> `--type image` (using a `.svg` file, whose type is inferred, or `--mime-type image/svg+xml`).
> SVG content is stored under the `image/svg+xml` MIME type and is additionally validated to
> be well-formed. Any asset created by an older version of Branda with the removed `svg` type
> is transparently handled as an `image` (MIME `image/svg+xml`) from now on — no action needed.

Every asset has:

- a **display name** (must be unique **within its parent brand**, case-insensitive and
  trimmed of whitespace, across all asset types — brands with the same asset name in
  *different* brands are allowed),
- a system-generated **identifier** (UUID),
- a **position** (used only for sort order among the brand's other assets), and
- an **owner** — automatically set to your OS login username when you create it (there is no
  `--owner` flag, same as for organizations and brands).

Every asset command **requires** `--brand <name|id>` identifying the parent brand. When
`--brand` is a UUID, `--org` is not required (brand IDs are globally unique). When `--brand`
is a display name, `--org <name|id>` is **also required**, since brand names are only unique
within an organization (same rule as brand commands referencing `--org`).

## Create an asset

```bash
# Colors: supplied as structured numeric flags
branda-cli asset create "Primary Blue" --type color_rgb --r 10 --g 20 --b 200 --brand "Sparkle" --org "Acme"
branda-cli asset create "Ink"          --type color_cmyk --c 10 --m 0 --y 0 --k 90 --brand "Sparkle" --org "Acme"

# Colors: shorthand form (no --type, no --name needed — see "Color shorthand" below)
branda-cli asset create "#FF0000"            --brand "Sparkle" --org "Acme"   # -> color_rgb, named "Red"
branda-cli asset create "0,255,0"            --brand "Sparkle" --org "Acme"   # -> color_rgb, named "Green"
branda-cli asset create "20C,40M,60Y,10K" --name "RandomCMYK" --brand "Sparkle" --org "Acme"  # -> color_cmyk

# Image / font: supplied via --file, or via stdin when --file is omitted
branda-cli asset create "Logo" --type image --file logo.png --brand "Sparkle" --org "Acme"
branda-cli asset create "Icon" --type image --file icon.svg --brand "Sparkle" --org "Acme"   # SVG is an image
cat logo.png | branda-cli asset create "Logo Alt" --type image --mime-type image/png --brand "Sparkle" --org "Acme"
cat icon.svg | branda-cli asset create "Icon Alt" --type image --mime-type image/svg+xml --brand "Sparkle" --org "Acme"
branda-cli asset create "Brand Font" --type font --file brand.ttf --brand "Sparkle" --org "Acme"

# Video / PDF / Markdown: supplied via --file, or via stdin when --file is omitted
branda-cli asset create "Intro"      --type video    --file intro.mp4 --brand "Sparkle" --org "Acme"
branda-cli asset create "Guidelines" --type pdf      --file guidelines.pdf --brand "Sparkle" --org "Acme"
cat README.md | branda-cli asset create "Readme" --type markdown --brand "Sparkle" --org "Acme"

# Website link: supplied via --url
branda-cli asset create "Homepage" --type website_link --url "https://www.example.com/brand" --brand "Sparkle" --org "Acme"
```

`--file <path>` and stdin are mutually exclusive by construction: supply `--file` to read
from a local path, or omit it entirely to read from stdin — never both. `--mime-type` is
required for `image` content read from stdin (there's no filename to infer a type from), and
optional otherwise (as an override).

Fails if the name is already in use within the brand (across all asset types), if the parent
brand/organization doesn't exist, or if the payload fails validation for its type (RGB/CMYK
values out of range, content not a decodable `image/*` payload, SVG content — `image/svg+xml` —
not well-formed, or font content not matching a recognized font signature). A newly created asset
is appended after the brand's existing assets (its `position` is one greater than the current
maximum saved position; this preserves append order when deletion has left gaps).

### Video, website link, PDF, and Markdown validation

- **`video`** accepts local video files only: `mp4`, `m4v`, `mov`, `avi`, `mkv`, or `webm`. The
  container is detected from the file content, so a renamed text file (`notes.txt` → `intro.mp4`)
  or an audio-only file is rejected, as is an extension that doesn't match the content. When
  reading from stdin, the extension is derived from the content. Branda does not decode the video
  stream: a file with a valid container that can't be played is still created, and the status-bar
  app shows a "preview unavailable" indicator for it. Remote video URLs are website links, not
  videos.
- **`website_link`** accepts only `http` and `https` URLs with a host and **without** embedded
  credentials (`https://user:password@…` is rejected). Surrounding whitespace is trimmed and the
  scheme and host are lowercased; path, query, and fragment are kept as entered. Creating or
  updating a link never contacts the website.
- **`pdf`** must be a structurally readable PDF. A PDF whose first page can't be rendered is still
  accepted; the status-bar app shows a PDF indicator instead of a page preview.
- **`markdown`** must be text: UTF-8 (with or without BOM) or BOM-marked UTF-16. Binary content is
  rejected; an empty file is allowed.

Invalid content is rejected with exit code `1` and a `WARN` log, and nothing is written: no asset
metadata or payload file is left behind. `list` shows the new type values (`video`,
`website_link`, `pdf`, `markdown`); in `--json` mode file-based payloads show `mimeType` and
`fileExtension`, website links show `url`, and file contents are never embedded.

### Color shorthand (no `--type` needed)

When `--type` is omitted, the positional value is instead parsed as a color shorthand,
letting you skip both `--type` and the individual channel flags for the most common color
formats:

| Shorthand | Example | Creates |
| --- | --- | --- |
| Hex (6-digit) | `#FF0000` or `FF0000` | `color_rgb` |
| Hex (3-digit) | `#F00` or `f00` | `color_rgb` (each digit duplicated) |
| RGB CSV | `0,255,0` | `color_rgb` |
| CMYK shorthand | `20C,40M,60Y,10K` (any order, case-insensitive) | `color_cmyk` |

A value matching none of these shapes, with `--type` omitted, is rejected with a clear
"could not recognize" error — it is never silently misinterpreted as a display name.

If `--name` is **not** supplied, the created asset's name is automatically derived from a
standard named-color palette: an exact match's own name, or (when there's no exact match)
the **nearest** palette color's name by color distance — so every shorthand color always
gets a sensible name. Supplying `--name` always overrides the auto-detected name, exactly
as it would for any other asset. CMYK shorthand is auto-named the same way, by converting
to its RGB equivalent first for the lookup only (the asset's stored payload keeps your
original CMYK values, unconverted).

The explicit `--type <type>` plus channel-flag form shown above continues to work exactly
as before — the shorthand form is purely an additional, shorter alternative for
`color_rgb`/`color_cmyk` assets.

> **Always quote hex codes.** In `bash`/`zsh`, an unquoted `#` starts a comment, causing the
> shell to silently discard `#FF0000` and everything after it *before* `branda-cli` ever sees
> it — you'll get `Missing required argument: name (or color shorthand)` with no mention of
> `#`. Always quote hex shorthand: `branda-cli asset create "#FF0000" --brand ... --org ...`.
> This applies to any hex code, quoted or not with a leading `#` — the digit-only form
> (`FF0000`, no `#`) avoids the problem entirely if you prefer not to quote.

## List assets

```bash
branda-cli asset list --brand "Sparkle" --org "Acme"
```

Lists a brand's assets ordered by `position`. If there are none, prints `no assets, yet`
(human mode) or `[]` (`--json` mode) — this is a success, not an error.

Every line also carries the asset's metadata: the file size, the extension, and the date it was
added, the same facts the status-bar app shows below each asset name.

```text
Primary Blue  (color_rgb)  #0A14C8  2026-09-18  1F1EBFCE-B262-4827-A90A-8CB99CA69D9A
Homepage  (website_link)  https://example.com  2026-09-18  FCC5C1FF-4DC9-4EEE-BD34-03EBC2E1EE27
Logo  (image)  178 B  image/png  PNG  2026-09-18  1F7DEC49-1B68-4129-97A8-0427A1864360
```

Values that do not apply, or cannot be read, are simply left out: a color has no file size or
extension, and a file whose payload is missing shows everything except its size.

Add `--table` for an aligned Markdown table with the columns **Position**, **Name**, **Type**,
**Value**, **Size**, **Extension**, **Added**, and **ID**. **Value** is a short, readable summary
of the payload — file contents are never printed:

| Asset type | Value |
| --- | --- |
| `color_rgb` | `#RRGGBB` (same as the status-bar app copies) |
| `color_cmyk` | `c:m:y:k`, e.g. `10:0:12.50:90` (same as the status-bar app copies) |
| `website_link` | The normalized URL |
| `image`, `font`, `video`, `pdf`, `markdown` | The stored MIME type, e.g. `image/png` |

**Size** is the stored payload file's size in human-readable units (`938 B`, `38 KB`, `4.2 MB`),
**Extension** its file extension in capitals, and **Added** the date the asset was added as
`YYYY-MM-DD`. Colors and website links leave **Size** and **Extension** empty.

```bash
branda-cli asset list --brand "Sparkle" --org "Acme" --table
```

```text
| Position | Name         | Type         | Value               | Size   | Extension | Added      | ID                                   |
| -------- | ------------ | ------------ | ------------------- | ------ | --------- | ---------- | ------------------------------------ |
| 0        | Primary Blue | color_rgb    | #0A14C8             |        |           | 2026-09-12 | 2C3D4E5F-6A7B-4C8D-9E0F-1A2B3C4D5E6F |
| 1        | Ink          | color_cmyk   | 10:0:12.50:90       |        |           | 2026-09-12 | 3D4E5F6A-7B8C-4D9E-8F01-2A3B4C5D6E7F |
| 2        | Logo         | image        | image/png           | 4.2 MB | PNG       | 2026-09-18 | 4E5F6A7B-8C9D-4E0F-9A12-3B4C5D6E7F80 |
| 3        | Homepage     | website_link | https://example.com |        |           | 2026-09-18 | 5F6A7B8C-9D0E-4F1A-8B23-4C5D6E7F8091 |
```

## Search assets

```bash
branda-cli asset search "logo"
branda-cli asset search "png" --brand "Sparkle" --org "Acme"
```

Finds assets by display name, file extension, media type, or exact id — case-insensitive, matching
any part of the value, like `org search` and `brand search`. Colors and website links have no file,
so they match by name or id only.

Without `--brand` the search spans every organization and brand, and each line names the owner:

```text
Acme / Sparkle  Logo  (image)  4.2 MB  image/png  PNG  2026-09-18  4E5F6A7B-…
Acme Corp / Aardvark Aalto  Logo  (markdown)  1.1 KB  text/markdown  MD  2026-09-12  6FE4D691-…
```

With `--brand` it searches that brand alone and drops the owner, printing exactly what `asset list`
prints. No matches prints `no matches` with exit code 0 — a success, not an error.

`--table` works here too. An unscoped search leads with **Organization** and **Brand** and omits
**Position** (position has no meaning across brands); a scoped search prints the same columns as
`asset list`, starting with **Position**.

`--json` returns the same objects as `asset list --json`; an unscoped search adds an `organization`
and a `brand` object to each result so a script can resolve the owner without a second call:

```json
[
  {
    "displayName": "Logo",
    "type": "image",
    "createdAt": "2026-09-18T07:12:44.031Z",
    "payload": { "mimeType": "image/png", "fileExtension": "png", "fileSizeBytes": 4404019 },
    "organization": { "id": "30A77A09-…", "displayName": "Acme" },
    "brand": { "id": "24DA7BC7-…", "displayName": "Sparkle" }
  }
]
```

Exit code 1 if the term is missing or blank, 2 if `--brand` or `--org` names something that does not
exist. A brand whose records cannot be read is skipped with a WARN and the search continues.

## Store creation dates for older assets

```bash
branda-cli asset backfill-dates --brand "Sparkle" --org "Acme"
```

Assets created before Branda recorded creation dates have none stored. They still show a date —
derived from their own record file's timestamp — but that value can change if the files are copied
or restored from a backup. This command writes the derived date into the records once, so it stays
fixed from then on:

```text
Stored creation date for 3 assets in "Sparkle"
```

Assets that already carry a date are left untouched, so running it again is harmless:

```text
All assets in "Sparkle" already have a creation date
```

With `--json` it prints `{"brand":"Sparkle","updated":3}`. Exit code 2 if the brand or organization
does not exist, 1 if `--brand` is missing.

## Update an asset

```bash
branda-cli asset update "Primary Blue" --r 0 --g 0 --b 0 --brand "Sparkle" --org "Acme"
branda-cli asset update "Logo" --file new-logo.png --brand "Sparkle" --org "Acme"
branda-cli asset update "Intro" --file intro-v2.mov --brand "Sparkle" --org "Acme"
branda-cli asset update "Homepage" --url "https://brand.example.com" --brand "Sparkle" --org "Acme"

# Color shorthand also works for update (same shapes as create, above)
branda-cli asset update "Primary Blue" "#00FF00" --brand "Sparkle" --org "Acme"
branda-cli asset update "Ink" "50C,0M,0Y,0K" --brand "Sparkle" --org "Acme"

# Explicitly switch a color asset's stored mode
branda-cli asset update "Primary Blue" --type color_cmyk --c 0 --m 100 --y 100 --k 0 --brand "Sparkle" --org "Acme"
branda-cli asset update "Ink" --type color_rgb --r 255 --g 0 --b 0 --brand "Sparkle" --org "Acme"
```

Without `--type`, `update` replaces an existing asset's **payload only** — its identifier, name,
type, and position are never touched. It uses the same per-type payload flags and validation rules
as `create`; an invalid update is rejected and the asset's existing payload is left unchanged.
The color shorthand form works the same way as for `create`, except the parsed shorthand's
kind (RGB or CMYK) must match the target asset's existing type, and `update` never auto-names or
renames the asset.

An asset's type never changes through `update` (except between the two color modes, below): a
`--url` update only applies to a `website_link`, and a `--file`/stdin update to a file-based asset
must pass the same validation as `create` for that asset's type.

Supplying `--type color_rgb` or `--type color_cmyk` explicitly selects the color-mode update path.
Any other `--type` value is rejected for `update`.
That path may switch an RGB asset to CMYK or a CMYK asset to RGB while preserving its identifier,
name, owner, and position. The submitted channel values determine the resulting stored type and
payload; no automatic RGB/CMYK conversion is performed.

## Rename an asset

```bash
branda-cli asset rename "Primary Blue" "Brand Blue" --brand "Sparkle" --org "Acme"
```

Renames an asset within its parent brand, identified by current name or UUID. The identifier,
type, position, owner, and payload never change. By default you're asked to confirm; use
`--non-interactive` to skip the prompt. Renaming to the asset's own current name is a no-op;
renaming to a name already used by a different asset within the same brand is rejected.

## Reposition an asset

```bash
branda-cli asset reposition "Ink" --position 0 --brand "Sparkle" --org "Acme"
```

Moves an asset to an explicit 0-based target index among its brand's current assets (sorted
by position). All of that brand's assets are then renumbered to a fresh contiguous sequence
reflecting the new order. This does not require confirmation — it's non-destructive and
always reversible with another `reposition`.

## Delete an asset

```bash
branda-cli asset delete "Ink" --brand "Sparkle" --org "Acme"
```

Deletes an asset from its parent brand, identified by current name or UUID. Prompts for
confirmation unless `--non-interactive` is supplied. The remaining assets in that brand keep
their existing relative order — deleting one does **not** renumber the others (unlike
`reposition`, which always renumbers everything).

Cascade note: when a whole brand is deleted, all of its assets are deleted with it — you
don't need to delete them individually first (see [Delete a brand](./brands.md#delete-a-brand)).
