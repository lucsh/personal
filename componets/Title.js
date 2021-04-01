import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;
const WhoAmI = styled.div`
  h1 {
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    font-weight: 100;
  }
  h2 {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    font-weight: 100;
  }
`;

function Title(props) {
  return (
    <Container>
      <Logo />
      <WhoAmI>
        <h1>Lucas Del Pozzi</h1>
        <h2>Software Developer</h2>
      </WhoAmI>
    </Container>
  );
}

export default Title;
