// src/hooks/queries/useGetMovies.js
import { axiosInstance } from "../../apis/axios-instance";
import React from 'react'

const useGetMovies = async ({category, pageParam}) => {
    const {data} = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`);
    console.log(category, pageParam);
    console.log('데이터 받아오는 중..');
    return data;
}

export {useGetMovies}