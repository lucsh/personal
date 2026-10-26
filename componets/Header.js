import styled from "styled-components";

const Bar = styled.header`
  min-height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid var(--line);
  .wordmark { font-size: 24px; font-weight: 700; letter-spacing: -1.5px; }
  .wordmark span { color: var(--accent); }
  nav { display: flex; gap: clamp(18px, 3vw, 40px); }
  nav a { font-size: 12px; }
  @media (max-width: 480px) {
    min-height: 84px;
    nav { gap: 16px; }
    .github { display: none; }
  }
`;

export default function Header() {
  return (
    <Bar>
      <a className="wordmark" href="/" aria-label="Lucas Del Pozzi home">luc<span>.</span>sh</a>
      <nav aria-label="Main navigation">
        <a className="github" href="https://github.com/lucsh">GitHub <span aria-hidden="true">↗</span></a>
        <a href="mailto:contact@luc.sh">Let’s talk <span aria-hidden="true">↗</span></a>
      </nav>
    </Bar>
  );
}
