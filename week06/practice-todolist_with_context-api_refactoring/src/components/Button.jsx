import styled from "styled-components";

const Button = ({onClick, text}) => {
    return (
        <Btn className='button' onClick={onClick}>
            {text}
        </Btn>
    )
}
            
export default Button

const Btn = styled.div`
    height: fit-content;
    margin-top: 12px;
    background-color: gainsboro;
    border-radius: 10px;
    padding: 5px;
`;