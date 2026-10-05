---
sidebar_position: 7
title: FAQ
description: Frequently asked questions about Branda.
---

# FAQ

## General

### Does Branda need an account or an internet connection?

No. Branda stores everything locally on your Mac and has no account, sync service, or cloud
backend. The only network access happens for **website link** assets: the status bar app loads a
link's preview image in the background, and Quick Look loads the live page while you preview it.
Creating or updating a link never contacts the website.

### Which macOS versions are supported?

macOS 13 (Ventura) or later, on Apple Silicon and Intel Macs.

### Where is my data stored? Can I back it up?

In `~/Library/Application Support/Branda/`, as human-readable JSON files plus the original files
of your file-based assets. To back up, copy that folder; to restore, copy it back. The status bar
app picks up a restored backup automatically. See
[Where your data lives](./installation.md#where-your-data-lives).

### Can I share a brand library with my team?

Not directly — Branda has no built-in sharing. Because the data is plain files, you can copy the
data folder to another Mac. Branda records the owner of every organization, brand, and asset as the
macOS user who created it.

## Installation

### macOS says the installer is from an unidentified developer

Branda releases are not notarized by Apple. Double-click `Branda.pkg` a second time and choose
**Open Anyway**, or allow it under **System Settings → Privacy & Security**. See
[Installation](./installation.md#unidentified-developer-warning).

### I can't find the app after installing

Branda has no Dock icon and no window — look for its icon in the status bar, or press **⌘⌥B**.
If the icon is hidden behind the notch or by a menu bar manager, the shortcut still works.

### `branda-cli: command not found`

The installer places `branda-cli` in `/usr/local/bin`. Make sure that directory is on your `PATH`.

## Using Branda

### My keyboard shortcut does nothing

Another app may already own the combination. Branda then shows a warning badge on the gear button
in the popover, and its settings tell you which shortcut could not be registered. Pick a different
combination in the settings (**⌘,** in the popover) or with
[`branda-cli settings set`](./cli/settings.md). Shortcuts need at least two modifiers.

### `branda-cli` says `Missing required argument: name (or color shorthand)` for a hex color

Your shell treated the `#` as the start of a comment. Quote the hex code — `"#FF0000"` — or leave
out the `#`: `FF0000`.

### Can I use SVG files?

Yes. SVGs are regular **image** assets (`--type image` with a `.svg` file) and are additionally
checked for being well-formed.

### Does Branda convert between RGB and CMYK?

No. A color is stored exactly as you enter it, either as RGB or as CMYK. You can switch a color
asset between the two modes, but you supply the new channel values yourself. The status bar app
converts CMYK to RGB only for displaying the swatch.

### Do changes made with branda-cli show up in the menu?

Yes. While the popover is open, changes from `branda-cli` — or from a restored backup or file
sync — appear within about two seconds, without interrupting what you are doing.

### What happens when I delete an organization or a brand?

Deletes cascade: deleting an organization deletes all its brands and their assets; deleting a brand
deletes all its assets. Both the CLI and the app ask for confirmation first and tell you how many
items will go with it. There is no undo, so keep a backup of your data folder.

### How do I quit Branda?

Open the settings (gear button or **⌘,** in the popover) and click **Quit branda**.

## Licensing

### Can I use Branda at work?

Branda is source-available, not open source. Using it for any commercial purpose requires written
permission from MPOWR IT GmbH — see the [Licence](./licence.md).
