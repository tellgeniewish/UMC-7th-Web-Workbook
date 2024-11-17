// src/pages/login.jsx
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const LoginPage = () => {
    const schema = yup.object().shape({
        email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required(),
        password: yup.string().min(8, '비밀번호는 8~16자 사이로 입력해주세요!').max(16, '비밀번호는 8~16자 사이로 입력해주세요!').required(),
    })

    const {register, handleSubmit, formState: {errors, isValid}, trigger} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange', // 실시간 검증을 위해 'onChange'로 설정
    });

    const { handleLogin } = useContext(AuthContext);
    console.log("handleLogin=", handleLogin);

    const navigate = useNavigate();
    const onSubmit = async(data) => {
        console.log('login 폼 데이터 제출')        
        console.log("data=", data);
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data);
            const { accessToken, refreshToken } = response.data;

            // 사용자 정보와 토큰을 localStorage에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const userData = { email: data.email };
            //localStorage.setItem('user', JSON.stringify(userData));

            handleLogin(userData); // 로그인 후 AuthContext에 로그인 상태 저장
            //handleLogin(accessToken, refreshToken);

            navigate('/');
        } catch (error) {
            if (error.response) {
                console.error('로그인 실패:', error.response.data);
            } else {
                console.error('네트워크 오류:', error.message);
            }
        }
    }

    return (
        <LoginWrapper>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <LoginInput type={'email'} {...register("email")} onBlur={() => trigger("email")}/>
                <p style={{color: 'red'}}>{errors.email?.message}</p>
                <LoginInput type={'password'} {...register("password")} onBlur={() => trigger("password")}/>
                <p style={{color: 'red'}}>{errors.password?.message}</p>
                {/* <input type={'submit'}/> */}
                <LoginBtn type="submit" disabled={!isValid}>로그인</LoginBtn>
            </form>
        </LoginWrapper>
    );
};

export default LoginPage;

const LoginWrapper = styled.div`
    text-align: center;
`;

const LoginInput = styled.input`
    width: 500px;
    height: 30px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
`;

const LoginBtn = styled.button`
    width: 520px;
    height: 45px;
    color: white;
    background-color: ${({ disabled }) => (disabled ? 'gray' : 'deeppink')};

    font-size: 1.2rem;
    text-decoration: none;
    &:hover {
        color: #646cffaa;
    }
`