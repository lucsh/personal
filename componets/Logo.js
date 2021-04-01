import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 100%;
  svg {
    margin: auto;
    width: 128px;
    height: 146px;
  }
`;

function Logo(props) {
  return (
    <Container>
      <svg
        className="logo"
        viewBox="0 0 115 130"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          className="polygon_left"
          points="57.9,65.2 57.9,122.3 57.5,122.5 7.5,93.8 7.5,36.2 "
        />

        <polygon
          className="polygon_right"
          points="107.5,36.2 107.5,93.8 57.9,122.3 57.9,65.2 "
        />

        <polygon
          className="polygon_top"
          points="107.5,36.2 57.9,65.2 7.5,36.2 57.5,7.5 "
        />

        <path
          fill="none"
          stroke-width="1"
          className="backpath"
          d="M107.5,36.2l-49.6,29l-50.4-29v57.5l50,28.8l50-28.8V36.2l-50-28.8l-50,28.8"
        ></path>

        <path
          fill="none"
          stroke-width="5"
          className="path"
          stroke-linecap="butt"
          stroke-linejoin="round"
          stroke-miterlimit="1"
          d="M107.5,36.2l-49.6,29l-50.4-29v57.5l50,28.8l50-28.8V36.2l-50-28.8l-50,28.8"
        ></path>
      </svg>
    </Container>
  );
}

export default Logo;
