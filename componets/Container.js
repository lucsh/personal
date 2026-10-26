import styled from "styled-components";

export default styled.div`
  width: min(1440px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
  display: flex;
  flex-direction: column;
`;
