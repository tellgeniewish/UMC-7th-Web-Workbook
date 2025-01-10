// src/pages/signup.jsx
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import styled from "styled-components";
//import { MovieContext } from '../context/AuthContext';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from '@tanstack/react-query';

const SignUpPage = () => {
    const schema = yup.object().shape({
        email: yup.string().required('이메일을 반드시 입력해주세요.')
                            .email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!')
                            .matches(/\./, '이메일에는 점(.)을 포함해야 합니다.'), // 이메일에 점(.)을 포함하도록 요구
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required(),
        passwordCheck: yup.string()
                                .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.') // 비밀번호 일치 여부 확인
                                .required('비밀번호 검증 또한 필수 입력요소입니다.').min(8).max(16, '비밀번호는 16자 이하여야 합니다.'),
    })

    const {register, handleSubmit, formState: {errors, isValid}, trigger} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange', // 실시간 검증을 위해 'onChange'로 설정
    });

    const navigate = useNavigate();
    const onSubmit = async(data) => {
    //const onSubmit = (data) => {
        console.log('signup 폼 데이터 제출: data=', data);

        // try {
        //     const response = await axios.post('http://localhost:3000/auth/register', data, {
        //         headers: { 'Content-Type': 'application/json' },
        //     });

        //     navigate('/login');
        // } catch (error) {
        //     console.error('회원가입 오류:', error);
        //     alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        // }
        mutation.mutate(data);
    }
    const mutation = useMutation({
        mutationFn: (data) => 
            axios.post('http://localhost:3000/auth/register', data, {
                headers: { 'Content-Type': 'application/json' },
            }),
        onSuccess: () => {
            navigate('/login'); // 성공 시 로그인 페이지로 리다이렉트
        },
        onError: (error) => {
            console.error('회원가입 오류:', error); // 실패 시 에러 로그 출력
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        },
    });

    return (
        <SignUpWrapper>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SignUpInput type={'email'} placeholder='이메일을 입력해주세요!' {...register("email")} onBlur={() => trigger("email")}/>
                {/* register 한 이름에 맞게 연결해주세요! */}
                <p style={{color: 'red'}}>{errors.email?.message}</p>
                <SignUpInput type={'password'} placeholder='비밀번호를 입력해주세요!' {...register("password")} onBlur={() => trigger("password")}/>
                <p style={{color: 'red'}}>{errors.password?.message}</p>
                <SignUpInput type={'password'} placeholder='비밀번호를 다시 입력해주세요!' {...register("passwordCheck")} onBlur={() => trigger("passwordCheck")}/>
                <p style={{color: 'red'}}>{errors.passwordCheck?.message}</p>
                {/* <input type={'submit'}/> */}
                <LoginBtn type="submit" disabled={!isValid}>제출</LoginBtn>
            </form>
        </SignUpWrapper>
    );
};

export default SignUpPage;

const SignUpWrapper = styled.div`
    text-align: center;
`;

const SignUpInput = styled.input`
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