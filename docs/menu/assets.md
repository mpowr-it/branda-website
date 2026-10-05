---
sidebar_position: 4
title: Assets
description: "Browse, preview, add, edit, copy, drag, and reorder brand assets in the status bar app."
---

# Assets

Column 3 lists the assets belonging to the brand selected in column 2, in saved position order.
If no brand is selected, it asks you to select one. If the brand has no assets, it shows **"no
assets, yet"**.

## What a row shows

Each row shows its preview, then the asset name in bold, and below the name a smaller, dimmed line
of details, separated by `·`:

| Asset type | Details |
| --- | --- |
| Image, font, video, PDF, Markdown | File size · file type · extension · date added |
| RGB color | `#RRGGBB` · date added |
| CMYK color | `c:m:y:k` · date added |
| Website link | The URL · date added |

For example `4.2 MB · image/png · PNG · 18 Sep 2026`, `#0A14C8 · 12 Sep 2026`, or
`https://example.com · 2 Aug 2026`. These are the same values `branda-cli asset list` prints (see
[List assets](../cli/assets.md#list-assets)).

Details that are unavailable are simply left out, and the rest of the line still appears: an asset
whose stored file is missing shows everything except its size, and an asset without a file
extension shows the rest. A line too long for the column ends with an ellipsis rather than wrapping,
so all rows stay the same height.

Dates follow your system's regional format. Assets created before Branda recorded dates show a date
derived from their stored record; `branda-cli asset backfill-dates` makes that date permanent (see
[Store creation dates for older assets](../cli/assets.md#store-creation-dates-for-older-assets)).

Details update automatically when assets change on disk — replacing a file with `branda-cli`
updates the size within about two seconds, as described under
[Automatic refresh](./layout-and-search.md#automatic-refresh).

## Asset previews

- Images show a scaled preview constrained to the column item bounds.
- Fonts show a readable sample when the font payload can be previewed; otherwise a font/type
  indicator is shown.
- RGB and CMYK assets show colored tiles. CMYK values are converted for display only; stored
  values are unchanged.
- **Videos** show their first frame. When you select a video it starts playing **muted** inside
  its row, and loops while it stays selected. It stops as soon as you select another asset
  (mouse or keyboard), switch brands, delete or edit it, or close the popover. Branda never plays
  sound and never changes your system volume. A video that can't be played shows a film icon with
  an orange "preview unavailable" badge.
- **Website links** show the page's preview image (its Open Graph / Twitter card image) when one
  is available. Otherwise they show the page title (or host name) with the site's favicon, or
  with a generic link icon when the site has no favicon either. The preview is
  loaded in the background and never blocks the list. Preview requests send no cookies or saved
  credentials, follow at most 3 redirects, skip local/private-network addresses, and give up after
  3 seconds. The link stays fully usable when no preview is available.
- **PDFs** show a thumbnail of the first page. A PDF whose first page can't be rendered shows a
  document icon with a "preview unavailable" badge; the asset is not affected.
- **Markdown** documents show the Markdown icon (**M↓**); the document itself isn't rendered in
  the row.
- While a video or PDF preview is loading, its tile shows a small spinner.
- Unsupported or unavailable previews fall back to a contained file/type indicator.
- VoiceOver reads each row's preview state followed by its details, for example *"Video, playing
  muted, 12.4 MB, video/mp4, MP4, added 18 September 2026"* or *"PDF, first page preview"*.
  With VoiceOver on, ↑/↓ move the selection within a column (each selected row is announced),
  ←/→ move between columns, and VO+Space selects the row under the VoiceOver cursor.

## Add assets

1. Select a brand in column 2.
2. Click the **"+"** action in column 3 and choose Color, Image, Font, Video, Website Link, PDF,
   or Markdown.
3. For colors, the editor defaults to **RGB/Hex** and includes a color chooser plus a `#RRGGBB`
   value. Switch to **CMYK** when you want percentage channels instead. The submitted mode stores
   the asset as RGB or CMYK; values are not automatically converted between modes. For
   images, fonts, videos, PDFs, and Markdown, choose a file and edit or confirm its name. For a
   website link, enter an `http://` or `https://` URL (no user name or password in the URL).
4. Save the form. The new asset is appended after the current last asset.

You can also drag image, recognized font, video (`mp4`, `m4v`, `mov`, `avi`, `mkv`, `webm`), PDF,
or Markdown (`.md`, `.markdown`) files from Finder directly over column 3. While a
file is over the column, a dashed drop-target outline appears; if no brand is selected it shows
*"Select a brand first"* and nothing is created. A valid drop
creates the asset immediately using the filename without its extension as the initial name. An
unsupported, malformed, empty, or duplicate-name drop creates nothing and shows an inline error.
Multiple dropped files are processed independently, each with its own result. Large images and
fonts load their previews in the background, so the list stays responsive; a brief
*"Loading previews…"* indicator appears while they load.

## Focus, edit, rename, and delete

- Single-click an asset to focus it. The full row highlights.
- The **pencil** action edits the payload while keeping the asset identity, name, owner, and
  position unchanged. Image/font edits remain the same type. Color edits open in the current
  RGB/Hex or CMYK mode and can switch modes before saving; the submitted mode determines the
  stored color type.
- Double-click an RGB or CMYK asset to copy `#RRGGBB` or `c:m:y:k` notation. Double-click an image
  or font to copy its payload. Double-click a website link to copy its URL; double-click a video,
  PDF, or Markdown asset to copy its file.
- Click the **pencil** action to edit an asset. The dialog opens with the name field focused and
  allows renaming and/or payload changes. Duplicate names show an error without overwriting data.
- Click **"-"** to request deletion. Confirm in the in-popover dialog to remove the asset and its
  associated file payload; cancel to leave it focused and unchanged.

## Quick Look (SPACE)

Select an asset in column 3 and press **SPACE** to open it in macOS Quick Look, just like in
Finder. The popover stays open behind the preview.

- Press **SPACE** again, **ESCAPE**, or click the preview's close button to close it. The same
  asset stays selected, so **↑/↓** and **TAB** keep working right away.
- While the preview is open, **↑/↓** (or a click on another row) moves the selection and the
  preview follows. If the shown asset changes through `branda-cli`, the preview updates; if it is
  deleted or you switch brands, the preview closes. Closing the popover closes the preview too.
- What you see depends on the asset type:
  - **Images (including SVG), fonts, videos, PDFs, and Markdown** show their stored file, exactly
    as Quick Look shows such files in Finder (font specimen, playable video, paged PDF, …).
  - **Colors** show a large swatch filled with the color, with its value in the center in black
    or white (whichever is easier to read): `#RRGGBB` for RGB colors, `C 0 M 45 Y 100 K 0` for
    CMYK colors.
  - **Website links** show the live web page. The page is loaded over the network only while you
    preview it — never in advance. Without a connection, Quick Look shows its own empty or error
    view; the app is not affected.
- SPACE only previews when the asset list has keyboard focus. In the search field it types a
  space, on a focused button it presses the button, and in dialogs it behaves as usual.
- If a file asset's stored file is missing or unreadable, no preview opens and a warning is
  logged.
- The preview works on temporary copies outside your data directory. They are deleted as soon as
  the preview closes (and any leftovers the next time the app starts); your brand data is never
  changed.

## Drag assets out

Drag an asset row out of the popover and drop it in Finder or another application to get a file
named after the asset:

| Asset type | What you get |
| --- | --- |
| Image, font, video, PDF, Markdown | The stored file, for example `Logo.png` |
| RGB or CMYK color | `Primary Blue.svg`, the same swatch Quick Look shows |
| Website link | `Homepage.webloc`, which opens the page |

The asset itself is never moved or changed — you always get a copy. Pinning the popover first makes
this easier, since the popover then stays open while you drag, but it is not required. Dropping a
row back inside column 3 reorders it instead of exporting anything.

## Reorder assets

Drag an asset row vertically above or below another row. The visible order updates immediately,
then persists through the asset position values. Reopening the popover or switching away and back
retains the saved order. If persistence fails, the list returns to its last saved order and shows
an error.
