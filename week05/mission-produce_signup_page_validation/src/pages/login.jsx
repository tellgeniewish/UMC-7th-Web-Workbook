import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import styled from "styled-components";

const LoginPage = () => {
    // const schema = yup.object().shape({
    //     email: yup.string().email().required(),
    //     password: yup.string().min(8).max(16).required(),
    // })
    const schema = yup.object().shape({
        email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required(),
        password: yup.string().min(8, '비밀번호는 8~16자 사이로 입력해주세요!').max(16, '비밀번호는 8~16자 사이로 입력해주세요!').required(),
    })

    const {register, handleSubmit, formState: {errors, isValid}, trigger} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange', // 실시간 검증을 위해 'onChange'로 설정
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출')
        console.log(data);
    }

    return (
        <LoginWrapper>
            {/* <h2>로그인 페이지</h2> */}
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