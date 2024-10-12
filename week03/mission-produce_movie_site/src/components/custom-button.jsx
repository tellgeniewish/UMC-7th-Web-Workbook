import styled from "styled-components";

const CustomButton = () => {
    return (
        <>
            <FirstStyledSweetPotato color={'pink'}>
                커스텀 고구마 버튼
            </FirstStyledSweetPotato>
            <FirstStyledSweetPotato color={'red'}>
                고구마
            </FirstStyledSweetPotato>
            <FirstStyledSweetPotato>
                고구마
            </FirstStyledSweetPotato>
        </>
    );
};

export default CustomButton;

const FirstStyledSweetPotato = styled.button`
    background-color: ${props => props.color || 'lightblue'};
    border: none;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    color: white;
    &:hover {
		// 밑줄을 부여한다.
		text-decoration: underline;
	}
`