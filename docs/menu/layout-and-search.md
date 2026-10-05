---
sidebar_position: 2
title: Layout, search & sync
description: "The popover layout, searching across organizations, brands, and assets, and live refresh."
---

# Layout, search & sync

## Layout

The popover shows a header (Branda icon + search bar) followed by three columns:

| Column                  | Width share | Status                                             |
| ------------------------ | ----------- | --------------------------------------------------- |
| 1 — Organizations        | 1/4         | Fully functional (described below)                  |
| 2 — Brands                | 1/4         | Fully functional (described below)                  |
| 3 — Assets (fonts, colors, logos) | 1/2 | Functional asset list and editor                    |

Each column caption carries a **count badge** at its right edge, showing how many entries that
column is currently listing:

- **Organizations** always shows a badge — `0` when you have no organizations yet.
- **Brands** shows the selected organization's brand count, and `0` for an organization without
  brands. While no organization is selected and the column shows its placeholder, there is no badge,
  because there is nothing to count.
- **Assets** works the same way for the selected brand.

A badge always counts the rows you can see in that column, so it never disagrees with the list
below it, and it follows every change — including one made from the command line — in the same
refresh as the rows themselves. VoiceOver reads the count together with the caption
("Organizations, 3 items"), both on the caption itself and when you enter the column's list.

For store-wide totals across every organization and brand, use `branda stats` — see
[`cli.md`](../cli/stats.md).

Each column has the same actions at its bottom: **"+"** (add) on the left, and the **pencil**
(edit) and **"-"** (delete) on the right. In column 3, add is enabled when a brand is selected;
pencil and delete are enabled when an asset is focused. In columns 1 and 2, pencil and "-" are
disabled unless an entry in that column is selected; column 2's "+" button is also disabled until
an organization is selected in column 1.

## Searching

Type into the search bar (placeholder: *"Lookup org, brand or asset..."*) to search your
organizations, their brands, and their assets — the same searches `branda-cli org search`,
`branda-cli brand search`, and `branda-cli asset search` use (all unscoped, across everything).

- Matching results appear in a dropdown below the search bar as you type (updating quickly,
  within a fraction of a second), each labeled with its kind: **"Org: "** for an organization
  match, **"Brand: "** for a brand match, **"Asset: "** for an asset match.
- The part of each result that matched what you typed is shown in **bold**, so a long list stays
  scannable. Every occurrence is emphasized, and the kind label itself never is.
- Asset results carry a second, dimmed line naming their owner, as `Organization / Brand`, so two
  assets with the same name in different brands are easy to tell apart.
- Assets also match by file extension and file type, not just by name: typing `png` finds your PNG
  files and typing `image` finds every image. When a result matched that way, its second line shows
  the detail that matched — `Acme / Sparkle · PNG` — so you can see why it is in the list. Colors
  and website links have no file, so they only match by name.
- At most 50 results are listed. If more matched, a final line reads *"… and N more matches"*;
  refine the term to narrow it down. That line is only a note — the arrow keys skip over it.
- All results — organizations and brands together — are sorted alphabetically by the matched
  name.
- Use the **up/down arrow keys** to move through the suggestions, or simply **click** a
  suggestion with the mouse.
- Press **ENTER** on a highlighted suggestion (or click one):
  - Selecting an **organization** suggestion selects it in column 1 (as before), clearing any
    brand selection in column 2.
  - Selecting a **brand** suggestion selects its parent organization in column 1 *and* the
    brand itself in column 2, in one action.
  - Selecting an **asset** suggestion selects its organization in column 1, its brand in column 2,
    *and* the asset itself in column 3 — so one search plus ENTER takes you to any asset, wherever
    it lives.
  - The dropdown then closes either way.
- Press **ESCAPE** to close the dropdown without losing what you've typed.
- Clearing the search bar closes the dropdown and restores the placeholder text.
- The suggestion keys (up/down, ENTER, ESCAPE) only affect the search dropdown while the search
  field has focus — while a dialog or a confirmation is showing, those keys act on
  that control instead.
- If a search cannot be completed, the dropdown shows a distinct *"Search failed"* message rather
  than an empty "no matches" list.

Only one item is ever selected at a time within each of column 1 and column 2.

## Automatic refresh

While Branda is running, the popover stays in sync with your stored brand data. Organizations,
brands, and assets that you create, update, rename, reposition, or delete with `branda-cli` — or
that change through file sync or a restored backup — appear in an open popover within about two
seconds, without closing and reopening it. If the organization or brand you had selected is
deleted, that selection is cleared and the columns to its right reset. If the asset you had selected is deleted, it is deselected and its preview or video
playback stops.

Refreshes never interrupt you: the selected asset, keyboard focus, scroll position, and a playing
video are kept. While you are renaming, editing, confirming a deletion, or choosing a file, nothing
in the popover changes; pending updates appear as soon as you finish. If you save an asset that was
deleted in the terminal in the meantime, Branda shows a "not found" error instead of recreating it.
