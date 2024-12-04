// src/components/Footer.jsx
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3>University MakeUs Challenge</h3>
        </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.nav`
  // width: 100%;
  background-color: #5852FE;
  display: flex;
  justify-content: center;
  color: white;
`