# luc.sh

Lucas Del Pozzi’s personal homepage, built with Next.js and styled-components.

## Development

Install the exact dependencies with `yarn install --frozen-lockfile`, then run
`yarn dev`. `yarn build` creates the static site in `out/`.
Development assets use `.next-dev/`, separate from production's `.next/`, so
building the site does not interrupt an active local preview.

The existing lockfile uses Next.js 10 and requires a compatible legacy Node
runtime (verified with Node 14.21.3). It does not build on Node 25. A framework
upgrade is separate from this visual refresh.

## Design

The responsive homepage preserves the original profile and contact links. The
cube uses Bayer dithering with gently interpolated 3D rotation and face lighting.
It follows the desktop pointer and responds to touch on the illustration, while
preserving vertical scrolling. Reduced-motion preferences disable the movement.
Animation frames stop once the cube settles. A static SVG remains as a fallback
without JavaScript; regenerate it with `python3 scripts/generate-dither.py`.

Colors are defined in `theme/globalStyle.js`. Page sections live in `componets/`.

## Unlisted Hostinger preview

Run `node scripts/build-preview.js` with the compatible build runtime to export
an isolated preview into `.preview/site/`. Its random base path is stored in
`.preview/release.json` and reused for subsequent preview builds. Both are
ignored by Git. Upload the contents only into the matching subfolder of the
verified `luc.sh` document root; do not sync them into the homepage directory.

The preview includes `noindex` metadata, an `.htaccess` with `X-Robots-Tag`,
no-store caching, disabled directory listings, and a no-referrer policy. It also
contains an explicit `robots.txt`, but search engines consult the domain-root
robots file, so the metadata/header are the effective indexing controls.
The preview is unlisted, not password-protected. A normal build without
`NEXT_PUBLIC_SITE_BASE_PATH` remains suitable for the production domain root.

## Production release

Use Node `14.21.3` (`.nvmrc`) and Yarn `1.22.22` (`.yarn-version`), with
`yarn install --frozen-lockfile`. Next.js is pinned to the tested `10.1.2` release.
Build with `node scripts/build-release.js`; this uses an isolated build directory
and rejects preview paths or noindex metadata in the exported HTML.

Set `PERSONAL_DEPLOY_HOST`, `PERSONAL_DEPLOY_USER`, `PERSONAL_DEPLOY_PORT`,
`PERSONAL_DEPLOY_KEY`, and `PERSONAL_DEPLOY_PATH` in your shell. The destination
is restricted to the verified `/home/bornar/luc.sh` document root.

Run `bash scripts/deploy-hostinger.sh --dry-run` to review uploads. From a clean,
committed checkout, `bash scripts/deploy-hostinger.sh --deploy` backs up the
existing site files, stages the export outside the web root, uploads assets,
then replaces HTML using rename. It preserves unrelated files and old hashed
assets and never uses `--delete` on the document root.

The command prints the release directory under `/home/bornar/site-releases/luc-sh/`
and records it in ignored `.release/latest-remote.txt`. Each release includes a
`rollback.sh`, `previous-site.tar.gz`, the source commit, and a checksummed new
artifact. Run that release's `rollback.sh` over SSH to restore the previous site.
