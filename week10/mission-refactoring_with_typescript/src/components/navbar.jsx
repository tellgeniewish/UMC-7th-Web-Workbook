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
        <Party><Link to="/party">파티 타임!</Link></Party>
      </NavLeft>      
      {user ? (
        <>
          <NavRight>          
            <Subscribe><Link to="/subscribe">구독 중...</Link></Subscribe>
            <Hello>{user.email ? user.email.split()[0] : '이메일을 다시 확인하세요.'}님 반갑습니다.</Hello>
            <Logout onClick={handleLogout}>로그아웃</Logout>        
          </NavRight>
        </>
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
  // flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  background-color: #131517;
  color: deeppink;
  font-size: 1.5rem;
  padding: 10px 20px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Party = styled.div`
  margin-left: 50px;
  // background-color: yellow;
  color: white;
  font-size: 1.2rem;
  &:hover {
    color: #646cffaa;
  }
`

const Subscribe = styled.div`
  margin-right: 100px;
  color: white;
  font-size: 1.2rem;
  &:hover {
    color: #646cffaa;
  }
`

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