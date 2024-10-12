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

const RootLayoutWrapper = styled.nav`
    height: 100vh;
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    flex-direction: column;    
`;

const ContentLayout = styled.nav`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 60px);
    flex-grow: 1;
    padding: 50px 0 0 0;
`;

const SidebarWrapper = styled.nav`
    width: 150px;
    min-width: 150px;  /* 고정 너비를 설정하여 줄어들지 않도록 함 */
    background-color: #131517;
`;

const MainContent = styled.nav`
    min-width: 100%-150px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0px;
    margin: 20px 10px;
`;