// src/utils/validate.js

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

// values: {email: '', password: ''}
function validateUser(values) {
    const errors = {
        email: '',
        password: '',
    }

    if (emailPattern.test(values.email) === false) {
        errors.email = '올바른 이메일 형식이 아닙니다. 다시 확인해주세요!'
    }

    if (values.password.length < 8 || 16 < values.password.length) {
        errors.password = '비밀번호는 8 ~ 16자 사이로 입력해주세요!'
    }

    return errors;
}

function validateLogin(values) {
    return validateUser(values);
}

export {validateLogin}