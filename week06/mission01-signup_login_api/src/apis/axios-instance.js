// src/apis/axios-instance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MOVIE_API_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_TOKEN,
        language: 'ko-KR',
    },
    // headers: {
    //     Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    // },
})

export {axiosInstance}