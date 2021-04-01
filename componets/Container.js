import styled from "styled-components";

const Wrapper = styled.ul`
  display: flex;
  text-align: center;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  font-size: 0.8rem;
  font-weight: 100;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

function Container({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default Container;
