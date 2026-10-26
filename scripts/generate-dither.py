"""Generate the original cube mark with deterministic 4×4 Bayer dithering."""
from pathlib import Path
import math

BAYER = ((0, 8, 2, 10), (12, 4, 14, 6), (3, 11, 1, 9), (15, 7, 13, 5))
faces = [([(280, 66), (472, 177), (280, 288), (88, 177)], .83),
         ([(88, 194), (272, 301), (272, 516), (88, 408)], .49),
         ([(288, 301), (472, 194), (472, 408), (288, 516)], .25)]

def inside(x, y, points):
    signs = []
    for i, (ax, ay) in enumerate(points):
        bx, by = points[(i + 1) % len(points)]
        signs.append((bx - ax) * (y - ay) - (by - ay) * (x - ax))
    return all(s >= 0 for s in signs) or all(s <= 0 for s in signs)

pixels = []
for y in range(0, 580, 2):
    for x in range(0, 560, 2):
        threshold = (BAYER[(y // 2) % 4][(x // 2) % 4] + .5) / 16
        density = 0
        for points, light in faces:
            if inside(x, y, points):
                density = light - .22 * (y / 580) + .14 * math.sin(x / 110 + y / 140)
                break
        if density > threshold:
            pixels.append(f'M{x} {y}h2v2h-2z')
svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 580"><path fill="#deded3" d="' + ''.join(pixels) + '"/></svg>\n'
Path('public/dither-cube.svg').write_text(svg)
