import { useEffect, useRef } from "react";
import styled from "styled-components";

const Surface = styled.div`
  position: relative;
  touch-action: pan-y;
  canvas { position: absolute; inset: 0; width: 100%; height: 100%; image-rendering: pixelated; }
  img { transition: none; }
`;

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const FACES = [
  { normal: [0, 1, 0], corners: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]] },
  { normal: [0, 0, 1], corners: [[-1, 1, 1], [1, 1, 1], [1, -1, 1], [-1, -1, 1]] },
  { normal: [1, 0, 0], corners: [[1, 1, 1], [1, 1, -1], [1, -1, -1], [1, -1, 1]] },
];
const clamp = (value) => Math.max(-1, Math.min(1, value));

// Isometric camera coordinates, followed by a small tilt toward the pointer.
function rotate([x, y, z], pitch, yaw) {
  const a = (x - z) / Math.sqrt(2);
  const b = (x + z - 2 * y) / Math.sqrt(6);
  const c = (x + y + z) / Math.sqrt(3);
  const u = a * Math.cos(yaw) + c * Math.sin(yaw);
  const v = c * Math.cos(yaw) - a * Math.sin(yaw);
  return [u, b * Math.cos(pitch) - v * Math.sin(pitch), b * Math.sin(pitch) + v * Math.cos(pitch)];
}

export default function DitherCube() {
  const surface = useRef(null);
  const canvas = useRef(null);
  const fallback = useRef(null);

  useEffect(() => {
    const element = surface.current;
    const context = canvas.current.getContext("2d");
    const buffer = document.createElement("canvas");
    buffer.width = 280;
    buffer.height = 290;
    const paint = buffer.getContext("2d", { willReadFrequently: true });
    if (!context || !paint) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let lastTime = 0;
    let touchId = null;

    function draw(x, y) {
      const pitch = -y * .14;
      const yaw = x * .18;
      paint.clearRect(0, 0, 280, 290);

      // A soft ground shadow is dithered along with the three lit faces.
      paint.save();
      paint.translate(140 - x * 8, 270 - y * 2);
      paint.scale(1, .16);
      const shadow = paint.createRadialGradient(0, 0, 5, 0, 0, 95);
      shadow.addColorStop(0, "rgba(170,170,170,.28)");
      shadow.addColorStop(1, "rgba(0,0,0,0)");
      paint.fillStyle = shadow;
      paint.fillRect(-95, -95, 190, 190);
      paint.restore();

      FACES.forEach(({ normal, corners }) => {
        const n = rotate(normal, pitch, yaw);
        const light = Math.max(0, -.45 * n[0] - .65 * n[1] + .7 * n[2]);
        const brightness = Math.min(1, .22 + .74 * light);
        const center = corners.reduce((sum, p) => sum.map((v, i) => v + p[i] / 4), [0, 0, 0]);
        const points = corners.map(p => {
          const inset = p.map((v, i) => center[i] + (v - center[i]) * .965);
          const [a, b, c] = rotate(inset, pitch, yaw);
          const perspective = 1 + c * .025;
          return [140 + a * 68 * perspective, 145 + b * 68 * perspective];
        });
        paint.beginPath();
        points.forEach(([a, b], i) => i ? paint.lineTo(a, b) : paint.moveTo(a, b));
        paint.closePath();
        const gradient = paint.createLinearGradient(60 + x * 20, 30, 210, 270);
        const tone = Math.round(brightness * 255);
        gradient.addColorStop(0, `rgb(${tone},${tone},${tone})`);
        gradient.addColorStop(1, `rgb(${tone * .65},${tone * .65},${tone * .65})`);
        paint.fillStyle = gradient;
        paint.fill();
      });

      const pixels = paint.getImageData(0, 0, 280, 290);
      for (let py = 0; py < 290; py++) {
        for (let px = 0; px < 280; px++) {
          const i = (py * 280 + px) * 4;
          const brightness = pixels.data[i] / 255 * pixels.data[i + 3] / 255;
          const on = brightness > (BAYER[(py % 4) * 4 + px % 4] + .5) / 16;
          pixels.data[i] = 222;
          pixels.data[i + 1] = 222;
          pixels.data[i + 2] = 211;
          pixels.data[i + 3] = on ? 255 : 0;
        }
      }
      context.putImageData(pixels, 0, 0);
    }

    function animate(time) {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      const ease = 1 - Math.exp(-elapsed / 140);
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      const settled = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < .001;
      if (settled) { currentX = targetX; currentY = targetY; }
      draw(currentX, currentY);
      frame = settled ? 0 : requestAnimationFrame(animate);
      if (settled) lastTime = 0;
    }

    function schedule(x, y) {
      targetX = preference.matches ? 0 : x;
      targetY = preference.matches ? 0 : y;
      if (!frame) frame = requestAnimationFrame(animate);
    }

    function move(event) {
      if (preference.matches) return;
      if (event.pointerType === "touch") {
        if (event.pointerId !== touchId) return;
        const rect = element.getBoundingClientRect();
        schedule(clamp((event.clientX - rect.left) / rect.width * 2 - 1), clamp((event.clientY - rect.top) / rect.height * 2 - 1));
      } else {
        schedule(clamp(event.clientX / window.innerWidth * 2 - 1), clamp(event.clientY / window.innerHeight * 2 - 1));
      }
    }
    function down(event) {
      if (event.pointerType !== "touch" || preference.matches) return;
      touchId = event.pointerId;
      move(event);
    }
    function reset() { touchId = null; schedule(0, 0); }
    function motionChanged() {
      if (preference.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = currentX = currentY = targetX = targetY = 0;
        draw(0, 0);
      }
    }
    function visibilityChanged() { if (document.hidden) reset(); }

    draw(0, 0);
    fallback.current.style.visibility = "hidden";
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", reset);
    window.addEventListener("pointercancel", reset);
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibilityChanged);
    element.addEventListener("pointerdown", down, { passive: true });
    preference.addEventListener("change", motionChanged);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", reset);
      window.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibilityChanged);
      element.removeEventListener("pointerdown", down);
      preference.removeEventListener("change", motionChanged);
    };
  }, []);

  return (
    <Surface className="art" ref={surface}>
      <img ref={fallback} src="/dither-cube.svg" width="560" height="580" alt="" />
      <canvas ref={canvas} width="280" height="290" aria-hidden="true" />
    </Surface>
  );
}
