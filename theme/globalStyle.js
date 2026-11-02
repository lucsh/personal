import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    color-scheme: dark;
    --background: #181a17;
    --text: #e9e9df;
    --muted: #a2a698;
    --line: #363a31;
    --accent: #EA4256;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: var(--background);
    color: var(--text);
    font-family: Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
  }
  ::selection { background: var(--accent); color: var(--background); }
  a { color: inherit; text-decoration: none; transition: color 150ms ease, background 150ms ease; }
  a:hover { color: var(--accent); }
  a:focus-visible { outline: 2px solid var(--accent); outline-offset: 6px; }
  .skip-link { position: absolute; top: -100px; left: 24px; padding: 12px 20px; z-index: 10; background: var(--text); color: var(--background); }
  .skip-link:focus { top: 12px; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; } }
`;
