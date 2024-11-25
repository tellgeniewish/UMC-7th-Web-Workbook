// // src/apis/api.js
// import axios from 'axios';

// // axios 인스턴스를 생성하여 API 요청의 기본 설정을 관리
// const api = axios.create({
//     baseURL: 'http://localhost:3000', // 백엔드 서버 URL(// 모든 요청의 기본 URL을 설정하여 반복적인 코드 작성을 줄임)
// });

// // 요청 인터셉터로 accessToken 만료 시 처리(API 호출 후 응답을 처리하거나, 요청이 실패할 때 작업을 수행)
// api.interceptors.response.use(
//     response => response,  // 응답이 성공적일 경우 그대로 반환
//     async error => { // 오류 발생 시 처리 로직
//         const originalRequest = error.config; // 실패한 원래 요청 객체를 저장
        
//         // 401 Unauthorized 오류 발생 시 토큰 만료 가능성 확인
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; // originalRequest에 _retry 속성을 추가하여 중복 요청 방지
//             // 💖💖💖 refreshToken을 활용(로컬 스토리지에서 가져와)하여 토큰 재발급을 시도
//             const refreshToken = localStorage.getItem('refreshToken'); // localStorage에서 refreshToken을 가져와
            
//             // refreshToken이 없으면 로그아웃 처리
//             if (!refreshToken) {
//                 localStorage.clear(); // 모든 localStorage 데이터 삭제
//                 window.location.href = '/login'; // 로그인 페이지로 이동
//                 return Promise.reject(error); // 오류 반환하여 요청 중단
//             }

//             try {
//                 // ⭐⭐⭐ Axios Interceptor를 통해 refreshToken을 활용한 accessToken 재발급 로직을 구현
//                 // refreshToken을 사용하여 새로운 accessToken을 발급받기 위해 API 요청
//                 const response = await axios.post('/auth/token/access', null, {
//                     headers: { Authorization: `Bearer ${refreshToken}` } // refreshToken을 헤더에 포함
//                 });

//                 // 새롭게 발급받은 accessToken을 localStorage에 저장
//                 const { accessToken } = response.data;
//                 localStorage.setItem('accessToken', accessToken);

//                 // ☁️☁️☁️ 재발급된 accessToken을 사용하여 원래 요청을 재시도
//                 originalRequest.headers.Authorization = `Bearer ${accessToken}`; // 원래 요청에 새로운 accessToken을 추가하여 재요청
//                 return api(originalRequest); // 수정된 요청으로 다시 호출하여 API 요청 재시도
//             } catch (refreshError) {
//                 // 토큰 재발급 요청에 실패한 경우: localStorage를 비우고 로그아웃 처리
//                 localStorage.clear();
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError); // 재발급 실패 오류 반환
//             }
//         }
//         return Promise.reject(error); // ❗ 401 이외의 오류는 그대로 반환
//     }
// );

// export default api;