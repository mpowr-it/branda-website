---
sidebar_position: 5
title: Accessibility
description: "Keyboard navigation, VoiceOver support, and system display settings in the status bar app."
---

# Accessibility

- Rows (organizations, brands, assets) and every icon-only control (add, delete, edit, clear
  search, and the menu-bar item) are labeled for VoiceOver and can be operated from the keyboard.
- Search results are announced with their kind, name, and (for assets) their owner. The bold
  emphasis is visual only and does not change what VoiceOver reads.
- **TAB** moves from the search bar to column 1's rows, then through that column's **"+"**,
  **pencil**, and **"-"** buttons, then to column 2's rows and buttons, and on to column 3.
  **Shift-TAB** goes back the same way. Inside a column, ↑/↓ move the selection.
- VoiceOver announces organization and brand rows by kind and name, followed by the tile they
  show, for example *"Organization Acme, icon"* or *"Brand Sparkle, placeholder icon"*, plus
  *"selected"* for the selected row. The rows offer the actions **Select**, **Edit** (opens the
  edit dialog), and **Delete** (opens the delete confirmation).
- Asset rows additionally offer **Quick Look**, which selects the asset and opens the same
  preview as pressing **SPACE** (see [Quick Look (SPACE)](./assets.md#quick-look-space)).
- In the add and edit dialogs, the **Name** field has focus first; **TAB** then moves to
  **Choose Icon…**, **Remove Icon**, **Cancel**, and **Save**; VoiceOver reads each control and the icon preview.
- The app honors **Reduce Motion** (overlays cross-fade instead of moving), **Reduce
  Transparency** (translucent overlays become opaque), and **Increase Contrast** (stronger
  borders and separation).
- When a save fails in a dialog (for example, a duplicate name), the dialog stays open with the
  error visible so you can correct it — focus does not jump back to the search bar.
- Opening the native file picker (for images/fonts) leaves the popover open and does not reload
  or steal focus.
