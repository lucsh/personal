import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  font-size: 0.9rem;
  font-weight: 100;
  margin-top: auto;
  p {
    vertical-align: middle;
  }
`;
const Copy = styled.p`
  font-size: 0.7rem;
  font-weight: 100;

`;

function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
      <p>+5492995713033</p>
      <p>
        Currently working for{" "}
        <a href="https://securityscorecard.com/">SecurityScorecard</a>
      </p>
      <Copy>
        &copy; {year} &#11042; This site is in github
        <a href="https://github.com/lucsh/personal">/personal</a>
      </Copy>
    </StyledFooter>
  );
}

export default Footer;
