import styled from "styled-components";
import { useState } from 'react';
import useForm from "../hooks/use-form.js"
import { validateLogin } from '../utils/validate.js';

const LoginPage = () => {
    // const [values, setValues] = useState({
    //     email: '',
    //     password: '',
    // })
    // const [touched, setTouched] = useState({
    //     email: false,
    //     password: false
    // })
    // console.log(touched);
    // const [errors, setErrors] = useState({
    //     email: false,
    //     password: false
    // })

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // const handleChangeEmail = (e) => {
    //     setEmail(e.target.value)
    // }

    // console.log(email, password)

    // value: 값들, input change 값 e.target.value
    // const handleChangeInput = (name, value) => {
    //     setValues({
    //         ...values,
    //         [name]: value
    //     });
    // }
    // const handleBlur = (name) => {
    //     setTouched({
    //         ...touched,
    //         [name]: true
    //     })
    // }

    const login = useForm({
        initialValue: {
            email: '',
            password: '',
        },
        validate: validateLogin
    })
    console.log(login.getTextInputProps)

    const handlePressLogin = () => {
        console.log(login.values.email, login.values.password)
    }

    return (
        // <Container>
        //     <input
        //         onBlur={() => handleBlur('email')}
        //         value={values.email}
        //         onChange={(e) => handleChangeInput('email', e.target.value)}/>
        //     <h1 style={{color: 'red'}}>에러가 발생했습니다.</h1>
        //     {/* <input value={email} onChange={handleChangeEmail}/>
        //     <input value={password} onChange={(e) => setPassword(e.target.value)}/> */}
        //     <input
        //         onBlur={() => handleBlur('password')}
        //         value={values.password}
        //         onChange={(e) => handleChangeInput('password', e.target.value)}/>
        // </Container>
        <Container>
            <Input error={login.touched.email && login.errors.email} type={'email'} placeholder={'이메일을 입력해주세요!'} {...login.getTextInputProps('email')}/>
            {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>}
            <Input error={login.touched.password && login.errors.password} type={'email'} placeholder={'비밀번호를 입력해주세요!'} {...login.getTextInputProps('password')}/>
            {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>}
            
            <button onClick={handlePressLogin}>로그인</button>
        </Container>
    );
};

export default LoginPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 8px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;

    border: ${props => props.error? '4px solid red' : '1px solid #ccc'};

    &:focus {
        border-color: #007bff
    }
`;

const ErrorText = styled.h1`
    color: red;
    font-size: 12px;
`;