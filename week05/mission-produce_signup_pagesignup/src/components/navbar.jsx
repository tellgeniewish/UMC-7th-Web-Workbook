// navbar.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <NavBarContainer>
      <NavLeft>
        <Link to="/">JINCHA</Link>
      </NavLeft>
      <NavRight>
        <Link to="/login">로그인</Link>
        <NavSign>
            <Link to="/signup">회원가입</Link>
        </NavSign>
      </NavRight>
    </NavBarContainer>
  );
};

export default Navbar;

const NavBarContainer = styled.div`
  height: 60px;
  background-color: #131517;
  padding: 7px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLeft = styled.div`
  background-color: #131517;
  color: deeppink;
  font-size: 1.5rem;
  padding: 10px 20px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  a {
    color: white;
    font-size: 1.2rem;
    text-decoration: none;

    &:hover {
      color: #646cffaa;
    }
  }
`;

const NavSign = styled.button`
    background-color: deeppink;
    width: fit-content;
    margin-left: 20px;
    margin-right: 20px;
`