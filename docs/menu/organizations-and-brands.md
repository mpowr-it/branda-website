---
sidebar_position: 3
title: Organizations & brands
description: "Create, edit, select, and remove organizations and brands in the status bar app."
---

# Organizations & brands

## Managing organizations (column 1)

Column 1 lists your organizations, sorted alphabetically. If you have none yet, it shows
**"no organizations, yet"** instead of a list.

Organizations created, renamed, or deleted with `branda-cli` appear here automatically while the popover
is open — see [Automatic refresh](./layout-and-search.md#automatic-refresh).

Each row shows a small square icon tile before the name:

- If the organization has an icon (see [Organization icons](../cli/organizations.md#organization-icons)), the tile
  shows it, scaled to fit without cropping.
- Otherwise the tile shows a placeholder: up to two initials (for example **MI** for "MPOWR IT",
  **A** for "Acme") on a light color. Each organization keeps its color, even after renaming or
  restarting the app.
- Icons assigned or removed with `branda-cli` update in an open popover automatically.

## Create an organization

1. Click the **"+"** button below column 1. The **Add Organization** dialog opens with the name
   field focused.
2. Type a display name. Optionally click **Choose Icon…** to pick an image file (PNG, JPEG, GIF,
   SVG, and other image types); the preview shows the chosen icon. **Remove Icon** discards it
   again, so the preview returns to the initials placeholder.
3. Click **Save** or press **ENTER**.
   - The organization is created and selected (its owner is automatically set to your macOS user
     account — there's nothing to fill in for that).
   - If the name is empty, already used by another organization, or the chosen file is not a
     valid image, an error appears in the dialog. The dialog stays open with your input so you
     can correct it; nothing is saved.
4. Click **Cancel** or press **ESCAPE** to close the dialog without creating anything.

## Edit an organization

1. Select an organization and click the **pencil** below column 1, or **double-click** the
   organization. The **Edit Organization** dialog opens, pre-filled with the current name and
   icon (or its placeholder).
2. Change the name, choose a new icon with **Choose Icon…**, or remove the current icon with
   **Remove Icon**.
3. Click **Save** or press **ENTER** to apply all changes together. The organization keeps its
   identity; no additional confirmation is shown. Saving without changes simply closes the
   dialog.
4. Errors (duplicate or empty name, invalid image) keep the dialog open with your input.
5. Click **Cancel** or press **ESCAPE** to discard the changes.

Names are no longer edited inline in the list; use the dialog instead.

## Select and remove an organization

1. **Single-click** an organization to select it. The "-" button below column 1 becomes
   enabled.
2. Click **"-"** to request removal. A confirmation dialog appears.
   - If the organization has one or more brands, the dialog also states how many brands will
     be deleted along with it — deleting an organization always deletes all of its brands too.
   - Confirm to remove the organization — its name becomes available for reuse.
   - Cancel to keep it (it remains selected).
3. Clicking a different organization changes the selection — only one organization can be
   selected at a time.

## Managing brands (column 2)

Brand rows show the same icon tile as organizations: the brand's icon, or a placeholder with its
initials on a stable light color.

Column 2 lists the brands of whichever organization is currently selected in column 1, sorted
alphabetically. If no organization is selected, column 2 shows a placeholder asking you to
select one. If the selected organization has no brands yet, it shows **"no brands, yet"**
instead of a list.

Brands created, renamed, or deleted with `branda-cli` appear here automatically while the popover
is open — see [Automatic refresh](./layout-and-search.md#automatic-refresh).

## Create a brand

1. Select an organization in column 1 — this immediately enables the **"+"** button below
   column 2.
2. Click **"+"**. The **Add Brand** dialog opens with the name field focused.
3. Type a display name and optionally choose an icon with **Choose Icon…** (or discard it with
   **Remove Icon**).
4. Click **Save** or press **ENTER**.
   - The brand is created under the selected organization and selected (its owner is
     automatically set to your macOS user account).
   - If the name is empty, already used by another brand **in the same organization**, or the
     chosen file is not a valid image, an error appears in the dialog and it stays open with your
     input. The same name is always allowed in a *different* organization.
5. Click **Cancel** or press **ESCAPE** to close the dialog without creating anything.

## Edit a brand

1. Select a brand and click the **pencil** below column 2, or **double-click** the brand. The
   **Edit Brand** dialog opens, pre-filled with the current name and icon (or its placeholder).
2. Change the name, choose a new icon, or remove the current icon.
3. Click **Save** or press **ENTER** to apply all changes together — no additional confirmation is
   shown. Errors keep the dialog open with your input.
4. Click **Cancel** or press **ESCAPE** to discard the changes.

Names are no longer edited inline in the list; use the dialog instead.

## Select and remove a brand

1. **Single-click** a brand to select it. The "-" button below column 2 becomes enabled.
2. Click **"-"** to request removal. A confirmation dialog appears.
   - Confirm to remove the brand — its name becomes available for reuse within that
     organization.
   - Cancel to keep it (it remains selected).
3. Clicking a different brand changes the selection — only one brand can be selected at a
   time.
4. Selecting a different organization in column 1 (or removing the currently selected one)
   reloads column 2 for the newly selected organization and clears any brand selection.
