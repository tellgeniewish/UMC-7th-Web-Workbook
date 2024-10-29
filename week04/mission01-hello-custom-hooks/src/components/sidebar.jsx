// navbar.jsx
import {Link} from "react-router-dom";
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

const Sidebar = () => {
    return (
        <SidebarContainer>
            <DivSearch>
                <StyledFaSearch><FaSearch/></StyledFaSearch>
                <StyledLink to='/search'>찾기</StyledLink>
            </DivSearch>
            <DivMovie>
                <StyledMdMovie><MdMovie/></StyledMdMovie>
                <StyledLink to='/movies'>영화</StyledLink>
            </DivMovie>
        </SidebarContainer>
    );
};

export default Sidebar;

// 스타일링된 아이콘 컴포넌트 생성
const StyledFaSearch = styled(FaSearch)`
  margin-right: 8px;  /* 아이콘과 텍스트 사이의 간격 */
`;

const StyledMdMovie = styled(MdMovie)`
  margin-right: 8px;  /* 아이콘과 텍스트 사이의 간격 */
`;

const DivSearch = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const DivMovie = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

// Link 컴포넌트를 스타일링
const StyledLink = styled(Link)`
  color: white;         /* 텍스트 색상 흰색으로 설정 */
  text-decoration: none; /* 기본 밑줄 제거 */
  
  &:hover {
    color: #646cffaa;   /* 마우스 오버 시 색상 변경 */
  }
`;
const SidebarContainer = styled.div`
  position: fixed;
`;