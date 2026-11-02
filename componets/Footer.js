import styled from "styled-components";

const Bottom = styled.footer`
  border-top: 1px solid var(--line);
  padding: 28px 0 24px;
  font-size: 11px;
  .links, .meta { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  nav { display: flex; flex-wrap: wrap; gap: 24px; }
  .meta { margin-top: 40px; color: var(--muted); font-size: 10px; }
  p { margin: 0; }
  @media (max-width: 600px) {
    .links { align-items: flex-start; flex-direction: column; }
    nav { gap: 20px; }
    .meta { gap: 16px; align-items: flex-start; flex-direction: column; margin-top: 32px; }
  }
`;

export default function Footer() {
  return (
    <Bottom>
      <div className="links">
        <nav aria-label="Social links">
          <a href="https://github.com/lucsh">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/lucasdp/">LinkedIn ↗</a>
          <a href="https://twitter.com/closerluc">Twitter ↗</a>
        </nav>
        <a href="mailto:contact@luc.sh">contact@luc.sh ↗</a>
      </div>
      <div className="meta">
        <p>© {new Date().getFullYear()} Lucas Del Pozzi</p>
        <a href="tel:+34650188204">+34 650 188 204</a>
        <a href="https://github.com/lucsh/personal">View source <span aria-hidden="true">↗</span></a>
      </div>
    </Bottom>
  );
}
