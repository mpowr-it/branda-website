---
sidebar_position: 5
title: Output & paging
description: "Machine-readable JSON output, Markdown tables, and how long listings are paged."
---

# Output & paging

## Machine-readable output (`--json`)

Every subcommand accepts `--json` to emit structured JSON instead of human-readable text,
suitable for scripts and other tools or AI agents to consume:

```bash
branda-cli org create "Acme" --json
# {"id":"...","displayName":"Acme","owner":"jdoe"}

branda-cli org list --json
# [{"id":"...","displayName":"Acme","owner":"jdoe"}, ...]

branda-cli brand create "Sparkle" --org "Acme" --json
# {"id":"...","orgID":"...","displayName":"Sparkle","owner":"jdoe"}

branda-cli brand list --json
# [{"id":"...","orgID":"...","displayName":"Sparkle","owner":"jdoe"}, ...]

branda-cli asset create "Primary Blue" --type color_rgb --r 10 --g 20 --b 200 --brand "Sparkle" --org "Acme" --json
# {"id":"...","brandID":"...","displayName":"Primary Blue","type":"color_rgb","position":0,"owner":"jdoe","payload":{"red":10,"green":20,"blue":200}}

branda-cli asset list --brand "Sparkle" --org "Acme" --json
# [{"id":"...","brandID":"...","displayName":"Primary Blue","type":"color_rgb","position":0,"owner":"jdoe","createdAt":"2026-09-12T09:31:02.884Z","payload":{...}}, ...]
```

Each asset carries `createdAt`, an ISO-8601 timestamp of when it was added (`null` only when no
date could be derived for a very old record). File-based assets also carry
`payload.fileSizeBytes`, the size of the stored payload file (`null` when that file is missing or
unreadable; absent for colors and website links):

```json
{
  "displayName": "Logo",
  "type": "image",
  "createdAt": "2026-09-18T07:12:44.031Z",
  "payload": { "mimeType": "image/png", "fileExtension": "png", "fileSizeBytes": 4404019 }
}
```

These fields were added, and no existing field changed its name or meaning, so scripts written
before them keep working.

## Markdown tables (`--table`)

Every `list` subcommand — and `asset search`, `stats`, and `settings list` — accepts `--table` to
print an aligned Markdown table that reads well in a terminal and can be pasted into documents,
tickets, or chat. A `|` inside a value is escaped as `\|`. The columns are described with each
command. `--table` can't be combined with `--json`.

## Paging

A listing longer than your terminal window stops after filling it, instead of scrolling past until
only the tail is left. The first entries stay on screen, and the bottom row tells you where you are
and how to get out:

```text
lines 1-23/61  ·  ↑/↓ scroll  PgUp/PgDn page  q quit
```

## Keys

| Key                  | Effect                     |
| -------------------- | -------------------------- |
| `↓` / `j`            | One line down              |
| `↑` / `k`            | One line up                |
| `PgDn` / Space / `f` | One screen down            |
| `PgUp` / `b`         | One screen up              |
| `End` / `G`          | Last screen                |
| `Home` / `g`         | First screen               |
| `q` / Ctrl-C         | Leave the listing          |

At either end the movement keys simply do nothing — the last entry stays visible rather than
scrolling blank space into view — and any other key is ignored. Leaving a listing early exits `0`:
reading part of a listing is not a failure.

The listing is drawn on the terminal's alternate screen, the way `less` and `git log` do, so when
it ends your terminal shows exactly what it showed before — nothing is left in the scrollback.
With `--table`, the heading row and its separator stay at the top while the rest scrolls.

## What never pages

Paging only happens when a person is watching. A listing is printed in one go — byte for byte as it
always was — whenever any of these is true:

- output is piped, redirected, or otherwise not going to a terminal;
- stdin is not a terminal, so no key could ever arrive (`branda-cli org list < /dev/null`);
- `--json` was given: machine-readable output is never paged;
- the listing fits in the window;
- the window size is unknown, or the window is too small to show anything;
- paging was turned off (below).

Scripts therefore need no changes, and neither does anything that reads `branda-cli` output.

## Turning paging off

| Form                 | Scope                                        |
| -------------------- | -------------------------------------------- |
| `--no-pager`         | This command                                 |
| `BRANDA_PAGER=off`   | Every command in that environment            |

The flag wins over the environment variable; any other value of `BRANDA_PAGER` means automatic.
There is no way to force paging on, because piped output must stay exactly as it is. To use your
own pager instead, turn Branda's off and pipe:

```bash
branda-cli org list --no-pager | less
```

Run with `BRANDA_LOG_LEVEL=DEBUG` to see which of the conditions above decided it:

```text
[DEBUG] listing paged: 61 lines, window 24x120
[DEBUG] listing not paged: notATerminal (61 lines)
```
