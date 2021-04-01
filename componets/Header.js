import styled from "styled-components";

const LinkList = styled.ul`
    list-style: none;
    font-size: 0.8rem;
    font-weight: 100;
    margin-bottom: auto;
    padding: 0;
  `;

const Link = styled.li`
    display: inline;
    margin: 20px;

a:before {
    content: '>_';
    margin-left: 0px;
    margin-right: 5px;
  }
`;

function Header() {


  return (
    <LinkList>
      <Link>
        <a href="https://twitter.com/closerluc">twitter</a>
      </Link>

      <Link>
        <a href="mailto:contact@luc.sh">contact@luc.sh</a>
      </Link>

      <Link>
        <a href="https://github.com/lucsh">github</a>
      </Link>

        <Link>
            <a href="https://www.linkedin.com/in/lucasdp/">linkedin</a>
        </Link>
    </LinkList>
  );
}

export default Header;
