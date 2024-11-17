// src/components/navbar.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);

  console.log("user=", user);
  return (
    <NavBarContainer>
      <NavLeft>
        <Link to="/">JINCHA</Link>
      </NavLeft>
      {user ? (
        <NavRight>
          <Hello>{user.email.split()[0]}님 반갑습니다.</Hello>
          <Logout onClick={handleLogout}>로그아웃</Logout>        
        </NavRight>
      ) : (
        <NavRight>
          <Link to="/login">로그인</Link>
          <NavSign>
              <Link to="/signup">회원가입</Link>
          </NavSign>
        </NavRight>
      )}
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

const Hello = styled.div`
  font-size: 1.2rem;
  margin-right: 10px;
`;

const Logout = styled.button`
  background-color: #131517;
  color: white;
  font-size: 1.2rem;

  width: fit-content;
  margin-right: 20px;
`;