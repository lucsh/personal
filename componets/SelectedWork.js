import styled from "styled-components";

const Work = styled.section`
  border-top: 1px solid var(--line);
  padding: 36px 0 48px;
  h2 { margin: 0 0 28px; font-size: 11px; font-weight: 400; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); }
  .projects { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px; }
  h3 { margin: 0 0 12px; font-size: 18px; font-weight: 400; letter-spacing: -.5px; }
  p { margin: 0; max-width: 58ch; color: var(--muted); font-size: 12px; line-height: 1.9; }
  .number { display: block; margin-bottom: 16px; font-size: 10px; color: var(--accent); }
  .now { border-top: 1px solid var(--line); margin-top: 36px; padding-top: 28px; display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 20px; }
  .now h2 { margin: 0; padding-top: 4px; }
  @media (max-width: 600px) {
    .projects { grid-template-columns: minmax(0, 1fr); gap: 28px; }
    .now { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  }
`;

export default function SelectedWork() {
  return (
    <Work aria-labelledby="selected-work">
      <h2 id="selected-work">Selected work</h2>
      <div className="projects">
        <article>
          <span className="number" aria-hidden="true">01 / Product engineering</span>
          <h3>MAX</h3>
          <p>Work on reporting, customer workflows, and reliability.</p>
        </article>
        <article>
          <span className="number" aria-hidden="true">02 / Engineering leadership</span>
          <h3>Helping engineers grow</h3>
          <p>Coaching engineers into Senior and Engineering Manager roles, with collaboration across five time zones.</p>
        </article>
      </div>
      <aside className="now" aria-labelledby="now-heading">
        <h2 id="now-heading">Now / Madrid</h2>
        <p>Principal &amp; Domain Lead, Agentic Engineering at SecurityScorecard. Exploring agent workflows and their place in everyday engineering.</p>
      </aside>
    </Work>
  );
}
