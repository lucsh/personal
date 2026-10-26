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
