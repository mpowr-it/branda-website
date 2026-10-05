---
sidebar_position: 7
title: Settings
description: "Read and change the global keyboard shortcuts of the status bar app from the command line."
---

# Settings

Branda's two global shortcuts — the ones that open the popover from any application — are
configurable, from here and from the status bar app's settings dialog. Both read and write the same
file, so a change made either way is the same change.

```bash
branda-cli settings list
```

```text
open          ⌘⌥B    (default)
open-pinned   ⌘⌥⇧B   (default)
```

| Setting       | Opens                     | Default |
| ------------- | ------------------------- | ------- |
| `open`        | The popover               | ⌘⌥B     |
| `open-pinned` | The popover, pinned       | ⌘⌥⇧B    |

## Changing a shortcut

```bash
branda-cli settings set open "cmd+opt+ctrl+b"
branda-cli settings set open "⌃⌘⌥B"            # the same combination
```

```text
Set open to ⌘⌥⌃B (was ⌘⌥B)
```

Combinations may be written either way, in any order and any case. Modifiers are `cmd`, `opt` (or
`alt`), `ctrl` and `shift`; keys are letters, digits, and names like `space`, `return`, `escape`,
`f1`, `left`.

Two rules apply, and a shortcut that breaks one is refused with exit code `1` and nothing written:

- **At least two modifiers.** A system-wide shortcut outranks every application, so `⌘E` would stop
  that key working everywhere — including inside Branda, where ⌘E edits the selected row.
- **The two shortcuts must differ**, or one of them could never be reached.

```text
Invalid shortcut: ⌘E needs at least two modifiers — a system-wide shortcut with one would override that key in every application
Invalid shortcut: ⌘⌥⇧B is already the shortcut for open-pinned
```

Whether macOS will actually grant a combination — another application may already own it — is only
known when the status bar app registers it, so `set` guarantees the value is well formed and unique
and the app reports anything it could not take.

## Restoring the defaults

```bash
branda-cli settings reset open
branda-cli settings reset --all
```

Resetting something already at its default succeeds and changes nothing, so a script can put a
machine into a known state without checking first.

## Machine-readable output

`--json` gives both spellings, the raw key code, and each setting's default, so a script can
display, compare, or re-set a value without parsing glyphs:

```json
{
  "open": {
    "shortcut": "⌘⌥⌃B",
    "ascii": "cmd+opt+ctrl+b",
    "keyCode": 11,
    "modifiers": ["command", "option", "control"],
    "isDefault": false,
    "default": { "shortcut": "⌘⌥B", "ascii": "cmd+opt+b" }
  },
  "openPinned": { "…": "…" }
}
```

`--table` prints the same rows as an aligned Markdown table.

## Where the settings live

```
~/Library/Application Support/Branda/settings.json
```

One file, beside your organizations, shared with the status bar app:

```json
{
  "version": 1,
  "open":       { "keyCode": 11, "modifiers": ["command", "option"] },
  "openPinned": { "keyCode": 11, "modifiers": ["command", "option", "shift"] }
}
```

It is written only when you change something — a fresh install has no file and uses the defaults.
If it is missing, unreadable, or edited into something Branda cannot understand, both shortcuts fall
back to their defaults and a `WARN` says so; nothing fails.
