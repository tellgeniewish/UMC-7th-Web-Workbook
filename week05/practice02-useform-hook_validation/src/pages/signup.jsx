import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const SignUpPage = () => {
    // const schema = yup.object().shape({
    //     email: yup.string().email().required(),
    //     password: yup.string().min(8).max(16).required(),
    // })
    const schema = yup.object().shape({
        email: yup.string().email().required('이메일을 반드시 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required(),
    })

    // const {register, handleSubmit} = useForm(); // 적용 안됨
    // const {register, handleSubmit} = useForm({ // 에러 메시지는 안 뜬다
    //     resolver: yupResolver(schema)
    // });
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출')
        console.log(data);
    }

    return (
        // <h2>회원가입 페이지</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type={'email'} {...register("email")}/>
            // register 한 이름에 맞게 연결해주세요!
            <p style={{color: 'red'}}>{errors.email?.message}</p>
            <input type={'password'} {...register("password")}/>
            <p style={{color: 'red'}}>{errors.password?.message}</p>
            <input type={'submit'}/>
        </form>
    );
};

export default SignUpPage;