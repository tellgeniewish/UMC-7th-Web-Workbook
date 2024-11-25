// src/apis/axios-instance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    // params: {
    //     api_key: import.meta.env.VITE_TMDB_TOKEN,
    //     language: 'ko-KR',
    // },
})

export default axiosInstance