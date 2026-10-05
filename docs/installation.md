---
sidebar_position: 2
title: Installation
description: Install Branda (status bar app and branda-cli) on macOS from the release disk image or from source.
---

# Installation

## Requirements

- macOS 13 (Ventura) or later
- Apple Silicon or Intel Mac — releases are universal binaries

## Install from a release (recommended)

Each Branda release ships as a single disk image, `Branda-<version>.dmg`, on the
[GitHub Releases page](https://github.com/mpowr-it/branda/releases).

1. Download the latest `Branda-<version>.dmg` and open it.
2. Double-click **`Branda.pkg`** and follow the installer. It places:
   - **`Branda.app`** — the status bar app — in `/Applications`
   - **`branda-cli`** — the command-line tool — in `/usr/local/bin`
3. Start **Branda** from `/Applications` (or Spotlight). The Branda icon appears in your status
   bar; there is no Dock icon and no regular window.

The disk image also contains a `Read Me.txt` with these steps.

### "Unidentified developer" warning

Branda releases are **not notarized** by Apple (the project doesn't use a paid Apple Developer ID),
so macOS Gatekeeper will likely block the installer the first time. To proceed:

1. Double-click `Branda.pkg` again — macOS usually offers an **Open Anyway** option the second
   time.
2. Or open **System Settings → Privacy & Security**, scroll down to the notice about the blocked
   installer, and click **Open Anyway**.

### Verify the installation

```bash
branda-cli --help
```

If your shell can't find `branda-cli`, make sure `/usr/local/bin` is on your `PATH`.

## Build from source

Branda is a Swift package with no third-party dependencies. You need Xcode or the Swift toolchain
(Swift 6), plus [mise](https://mise.jdx.dev/) if you want to use the project's tasks.

```bash
git clone git@github.com:mpowr-it/branda.git
cd branda
mise install          # provisions the project toolchain

mise run build        # swift build
mise run test         # swift test
mise run menubar      # build and run the status bar app
```

Without mise, use the Swift toolchain directly:

```bash
swift build
swift run branda-cli --help
swift run BrandaMenuBar
```

To build the same installer artifacts as a release locally:

```bash
mise run release -- 1.2.3
# -> dist/Branda-1.2.3.dmg (plus the intermediate .app and .pkg)
```

## Where your data lives

Branda stores everything locally in open, human-readable files:

```text
~/Library/Application Support/Branda/
├── settings.json                                    (only once you change a shortcut)
└── organizations/
    ├── <orgID>.json                                 (+ <orgID>.icon)
    └── <orgID>/brands/
        ├── <brandID>.json                           (+ <brandID>.icon)
        └── <brandID>/assets/
            └── <assetID>.json                       (+ <assetID>.payload for file assets)
```

Colors and website links are stored inline in their JSON record; files (images, fonts, videos,
PDFs, Markdown) keep their raw bytes in a `.payload` file next to it. To back up or move your
brand library, copy this folder.

## Uninstall

1. Quit Branda: open its settings (gear button or **⌘,** in the popover) and click
   **Quit branda**.
2. Delete `/Applications/Branda.app` and `/usr/local/bin/branda-cli`.
3. Optionally delete your data: `~/Library/Application Support/Branda/`.
