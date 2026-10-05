---
sidebar_position: 1
title: branda Menu
description: "The Branda status bar app: opening it, keyboard shortcuts, pinning, and settings."
---

# branda Menu

The **branda Menu** is Branda's macOS status bar app (`Branda.app`). It gives you a three-column
popover — organizations, brands, assets — that you can open from anywhere. It works on the same
data as [branda-cli](../cli/index.md): nothing here changes how organizations, brands, or assets
are stored or validated.

## Opening the app

Branda runs only as an icon in the macOS status bar (menu bar) — it never shows a
Dock icon or a regular application window.

- **Click the Branda icon** in the status bar to open the popover. The search bar is
  automatically focused so you can start typing right away.
- **Click the icon again** (or click anywhere outside the popover) to close it. Any click outside —
  another app's window, the desktop, a second display — closes it on the first click.
- **Press ⌘⌥B** from any application to open the popover with the search field focused; press it
  again to close it.
- **Press ⌘⌥⇧B** to open it already pinned (see below), or to pin one that is already open.

If another application already owns one of those key combinations, Branda leaves it alone and
records a warning on startup (`global shortcut unavailable: …`, visible when running with
`BRANDA_LOG_LEVEL=WARN`); the other shortcut still works.

## Pinning the popover

The **pin** button at the right of the header keeps the popover open: while pinned, clicks and drags
elsewhere no longer dismiss it, which is what makes dragging files between Finder and Branda
comfortable. Click it again to unpin.

- **⌘P** toggles the pin from the keyboard while the popover is open.
- The pin lasts only for that popover session: once the popover closes, the next one opens unpinned.
- The menu-bar icon and ⌘⌥B always close the popover, pinned or not.
- Branda's own windows never dismiss the popover, pinned or not: the file picker, the editors, the
  confirmation overlays, and the Quick Look preview.

## Settings

The **gear** button at the right of the header, beside the pin, opens Branda's settings — or press
**⌘,** while the popover is open. **Escape** or the **Close** button closes it again.

The dialog shows which version you are running on the left, and on the right the two shortcuts that
open Branda from anywhere:

| Setting                                  | Default |
| ---------------------------------------- | ------- |
| Keyboard shortcut to open branda          | ⌘⌥B     |
| Keyboard shortcut to open branda pinned   | ⌘⌥⇧B    |

To change one, click its field (or focus it and press Space) and press the combination you want. It
takes effect immediately and survives a restart. **Reset** puts a shortcut back to its default and is
available only while that row has been changed.

Two rules apply, and a combination that breaks one is refused with the reason shown:

- **At least two modifiers.** A system-wide shortcut outranks every application, so ⌘E would stop
  that key working everywhere — including inside Branda, where ⌘E edits the selected row.
- **The two shortcuts must differ**, or one of them could never be reached.

A combination another application already owns is refused the same way. If a shortcut you saved
earlier cannot be registered at startup — something else claimed it in the meantime — the gear
button shows a warning badge and the row says so, rather than leaving you with a key that quietly
does nothing.

**Escape while recording** cancels the recording and keeps the previous value; it does not close the
dialog. Closing the dialog mid-recording does the same.

**Quit branda** at the bottom left quits the app.

The same two settings can be read and changed from the command line — see
[branda-cli settings](../cli/settings.md) — and a change made there appears here without restarting anything.

## Acting on a column from the keyboard

The three buttons at the bottom of each column have keyboard shortcuts. They act on **the column
you are in** — whichever one holds the keyboard focus, whether that focus is on a row or on the
column's own action buttons:

| Keys | Action |
| ---- | ------ |
| **⌘N** | Add — a new organization, brand, or asset, depending on the column |
| **⌘E** | Edit the selected row |
| **⌘⌫** | Delete the selected row |

Each does exactly what clicking the corresponding button does, including the confirmation before
anything is deleted. Nothing is ever deleted by a single keystroke.

In the Assets column, ⌘N opens the same type menu the **+** button opens — ↑/↓ to move, Return to
choose, Escape to dismiss, or just type the first letters of a type.

A shortcut does nothing at all when:

- the search field has focus, or no column does. There is no "last column" it falls back to, so a
  keystroke can never act on a column you are not looking at;
- a dialog or confirmation is open, or the text cursor is in a text field — where ⌘⌫ keeps its
  usual meaning of deleting to the start of the line;
- the Quick Look preview is showing. It covers the popover, so a confirmation behind it could not be
  read; press SPACE or Escape to close the preview and the shortcuts work again;
- the matching button is disabled — ⌘N in Brands with no organization selected, or ⌘E and ⌘⌫ with
  no row selected.

These work only while the popover is open; they are not system-wide. Each button's tooltip names its
shortcut, and VoiceOver announces it with the action.
