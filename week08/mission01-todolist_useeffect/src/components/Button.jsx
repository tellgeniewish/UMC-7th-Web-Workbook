// src/components/Button.jsx
import styled from "styled-components";

const Button = ({onClick, text, isDisabled, type = "button"}) => {
    return (
        <Btn className='button' onClick={onClick} disabled={isDisabled} type={type}>
            {text}
        </Btn>
    )
}
            
export default Button

const Btn = styled.button`
    min-width: 90px;
    height: fit-content;
    background-color: #EFEFEF;
    border-radius: 10px;
    padding: 5px 10px;
    text-align: center;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;