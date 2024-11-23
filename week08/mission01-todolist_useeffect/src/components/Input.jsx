// src/components/Input.jsx
import styled from "styled-components";

const Input = ({value, onChange, placeholder}) => {
    return (
        <>
            <Ipt type="text" value={value} onChange={onChange} placeholder={placeholder}/>
            {/* <button onClick={() => addTodo()} text='할 일 등록'>ㅎㅇ</button> */}
        </>
    )
}
            
export default Input

const Ipt = styled.input`
    height: 30px;
    border-radius: 10px;
`;