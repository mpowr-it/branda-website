---
sidebar_position: 6
title: Stats
description: "Store-wide totals of organizations, brands, and assets, optionally grouped."
---

# Stats

```bash
branda-cli stats
```

Shows how much is stored, across every organization and brand:

```text
Organizations  3
Brands         6
Assets         61
```

An empty store reports zeros — a success, not an error. Nothing is changed, so nothing is logged at
INFO; an organization or brand whose records cannot be read is skipped with a WARN and the remaining
counts stay correct.

## Grouped totals

```bash
branda-cli stats --grouped
branda-cli stats -g
```

The same totals, followed by each organization and its brands:

```text
Organizations  3
Brands         6
Assets         61

acme inc.  2 brands  43 assets
  Sparke  29 assets
  Uh yeah  14 assets
Globex  0 brands  0 assets
MPOWR IT  1 brand  6 assets
  Default  6 assets
```

Organizations are listed alphabetically, ignoring case, and so are each organization's brands. An
organization with no brands still appears, so nothing is invisible.

## Stats as a table or JSON

`--table` prints the three totals as a two-column table. With `--grouped` it prints one row per
brand, repeating the organization, and a totals row:

```text
| Organization | Brand    | Assets |
| ------------ | -------- | ------ |
| acme inc.    | Sparke   | 29     |
| acme inc.    | Uh yeah  | 14     |
| Globex       |          | 0      |
| MPOWR IT     | Default  | 6      |
| Total        | 6 brands | 61     |
```

`--json` prints `{"organizations":3,"brands":6,"assets":61}`. With `--grouped` those three keys stay
exactly the same and a `groups` array is added, so a script reading totals never has to know which
form was used:

```json
{
  "organizations": 3,
  "brands": 6,
  "assets": 61,
  "groups": [
    {
      "id": "30A77A09-…",
      "displayName": "acme inc.",
      "brandCount": 2,
      "assets": 43,
      "brands": [
        { "id": "24DA7BC7-…", "displayName": "Sparke", "assets": 29 }
      ]
    }
  ]
}
```

Within a group, `brandCount` is the number of brands and `brands` the list of them.

Exit code 1 for an unknown argument or for `--json --table` together.
