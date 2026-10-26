import styled from "styled-components";
import DitherCube from "./DitherCube";

const Hero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
  min-width: 0;
  > * { min-width: 0; }
  align-items: center;
  gap: 24px;
  flex: 1;
  padding: clamp(64px, 9vw, 130px) 0;
  .eyebrow { margin: 0 0 32px; color: var(--muted); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; }
  .eyebrow::before { content: ''; display: inline-block; width: 7px; height: 7px; background: var(--accent); margin-right: 12px; }
  h1 { font-family: Arial, Helvetica, sans-serif; font-size: clamp(68px, 7.6vw, 112px); line-height: .97; font-weight: 500; letter-spacing: -.075em; margin: 0; }
  h1 span { display: block; }
  .role { font-size: clamp(20px, 2.3vw, 30px); font-weight: 400; letter-spacing: -1.3px; margin: 28px 0 14px; }
  .intro { max-width: 42ch; font-size: 14px; line-height: 1.8; margin: 0 0 20px; color: var(--muted); }
  .intro a { color: var(--text); text-decoration: underline; text-underline-offset: 4px; }
  .contact { display: inline-flex; gap: 32px; align-items: center; padding: 16px 22px; background: var(--accent); color: var(--background); font-size: 12px; margin-top: 36px; border: 1px solid var(--accent); }
  .contact:hover { background: var(--text); border-color: var(--text); color: var(--background); }
  figure { position: relative; margin: 0; }
  .art { position: relative; background-image: radial-gradient(var(--line) .7px, transparent .7px); background-size: 16px 16px; }
  .art::before, .art::after { content: '+'; position: absolute; color: var(--muted); font-size: 18px; }
  .art::before { top: 0; left: 0; }
  .art::after { bottom: 0; right: 0; }
  img { display: block; width: 100%; height: auto; image-rendering: pixelated; }
  figcaption { display: flex; justify-content: space-between; gap: 16px; margin-top: 22px; color: var(--muted); font-size: 9px; letter-spacing: 1px; text-transform: uppercase; }
  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 56px;
    padding: 60px 0 48px;
    h1 { font-size: clamp(64px, 12vw, 92px); }
    figure { width: min(100%, 460px); justify-self: center; }
  }
`;

export default function Title() {
  return (
    <Hero aria-label="Introduction">
      <div>
        <p className="eyebrow">Personal space / luc.sh</p>
        <h1>Lucas<span>Del Pozzi<span style={{ display: 'inline', color: 'var(--accent)' }}>.</span></span></h1>
        <h2 className="role">Principal &amp; Domain Lead, Agentic Engineering</h2>
        <p className="intro">Building agent-driven engineering workflows and helping teams adopt them at <a href="https://securityscorecard.com/">SecurityScorecard</a>.</p>
        <a className="contact" href="mailto:contact@luc.sh">Get in touch <span aria-hidden="true">↗</span></a>
      </div>
      <figure aria-label="A dithered interpretation of my original cube logo">
        <DitherCube />
        <figcaption><span>001 / A different perspective</span><span>Ordered dither</span></figcaption>
      </figure>
    </Hero>
  );
}
