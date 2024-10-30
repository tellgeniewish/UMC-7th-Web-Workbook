import {Outlet} from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar.jsx";
import SideBar from "../components/sidebar.jsx";

const RootLayout = () => {
    return (
        <>
            <RootLayoutWrapper>
                <Navbar/>
                <ContentLayout>
                    <SidebarWrapper>
                        <SideBar />
                    </SidebarWrapper>
                    <MainContent>
                        <Outlet />
                    </MainContent>
                </ContentLayout>
            </RootLayoutWrapper>
        </>
    );
};

export default RootLayout;

const RootLayoutWrapper = styled.div`
    height: 100vh;
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const ContentLayout = styled.nav`
    min-height: fit-content;
    background-color: black;
    display: flex;
    flex-direction: row;
    height: calc(100vh - 60px);
    flex-grow: 1;
    padding: 60px 0 0 0;
`;

const SidebarWrapper = styled.nav`
    width: 150px;
    min-width: 150px;  /* 고정 너비를 설정하여 줄어들지 않도록 함 */
    background-color: #131517;

    position: fixed; /* 화면에 고정 */
    height: 100vh; /* 사이드바가 화면 전체를 덮도록 높이 설정 */
    left: 0; /* 화면 왼쪽에 위치 */
    z-index: 100; /* 다른 요소들 위에 위치하게 하기 위해 z-index 설정 */
`;

const MainContent = styled.nav`
    position: fixed; /* 화면에 고정 */
    min-height: calc(100vh - 60px); /* 최소 높이를 설정 */

    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px 10px 0 180px;
    
    background-color: black;
    // overflow: auto; /* 스크롤 가능하게 설정 */
`;