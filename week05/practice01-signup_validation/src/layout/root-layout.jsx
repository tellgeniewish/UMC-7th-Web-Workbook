import {Outlet} from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar.jsx";
import SideBar from "../components/sidebar.jsx";

const RootLayout = () => {
    return (
        <RootLayoutWrapper>
            <Navbar/>
            <ContentLayout>
                <SideBar />
                <MainContent>
                    <Outlet />
                </MainContent>
            </ContentLayout>
        </RootLayoutWrapper>
    );
};

export default RootLayout;

const RootLayoutWrapper = styled.div`
    // margin: -2rem; /* 부모의 padding 2rem을 무효화 */
    
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
`;

const ContentLayout = styled.div`
    display: flex;
    flex-grow: 1;
`;

const MainContent = styled.div`
    flex: 1;
    text-align: left;
    padding: 20px;

    background-color: black;
`;