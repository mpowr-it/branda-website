---
sidebar_position: 8
title: Logging & environment
description: "Log levels, environment variables, and where branda-cli writes diagnostics."
---

# Logging & environment

`branda-cli` writes diagnostic logs to stderr (separate from the normal command output on
stdout), each prefixed with its severity:

```
[DEBUG] ...
[INFO] ...
[WARN] ...
[ERROR] ...
```

- **DEBUG** — fine-grained developer diagnostics; off by default.
- **INFO** — emitted every time a state-changing command (`create`, `update`, `rename`,
  `reposition`, `delete` — for organizations, brands, and assets) succeeds, and always shows
  both the **previous** and the **new** state. When an organization is deleted with N brands
  under it, N per-brand INFO lines are emitted in addition to the org's INFO line (one per
  cascaded brand). When a brand is deleted with N assets under it, N per-asset INFO lines are
  emitted the same way (one per cascaded asset).
- **WARN** — recoverable problems, such as attempting to create a duplicate organization,
  brand, or asset name; referencing an organization/brand/asset that doesn't exist; an
  invalid asset payload (out-of-range color values, wrong file kind); or a confirmation
  prompt that couldn't be shown.
- **ERROR** — non-recoverable problems, such as being unable to determine your OS login
  username (needed to set an owner), or being unable to read a `--file` path.

By default, only `WARN` and `ERROR` logs are shown — everyday successful commands produce no
log output at all. To see more detail (for example, to inspect the exact before/after state
of every change), set the `BRANDA_LOG_LEVEL` environment variable:

```bash
BRANDA_LOG_LEVEL=INFO branda-cli org create "Acme"
# [INFO] org create succeeded: previous=none new={id=..., displayName="Acme", owner="jdoe"}
```

Valid values (from least to most severe): `DEBUG`, `INFO`, `WARN`, `ERROR`.

## Environment variables

| Variable | Effect |
| --- | --- |
| `BRANDA_LOG_LEVEL` | Minimum log level written to stderr: `DEBUG`, `INFO`, `WARN` (default), `ERROR` |
| `BRANDA_PAGER` | `off` disables paging of long listings, same as `--no-pager` (see [Paging](./output.md#paging)) |
| `HOME` | Determines the data directory: `$HOME/Library/Application Support/Branda/` |
| `USER` | Your login name, recorded as the owner of everything you create |
