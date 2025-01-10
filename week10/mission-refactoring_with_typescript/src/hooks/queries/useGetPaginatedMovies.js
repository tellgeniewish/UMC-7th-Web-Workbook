// src/hooks/queries/useGetPaginatedMovies.js
// import React from 'react'
import { useState } from 'react';
import { axiosInstance } from "../../apis/axios-instance";
import { useQuery } from "@tanstack/react-query";

const fetchMovies = async (category, page) => {
    const response = await axiosInstance.get(`/movie/${category}?page=${page}`);
    return response.data;
};

const useGetPaginatedMovies = ({category}) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const {
        data: movies,
        isLoading, isError,
        isPending, isFetching,
    } = useQuery({
        queryFn: () => fetchMovies(category, currentPage),
        queryKey: [category, currentPage],
        keepPreviousData: true, // 이전 페이지 데이터를 유지하여 로딩 상태를 부드럽게 처리
        staleTime: 1000 * 10,
    });

    const PrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1)); // prev - 1과 1 중 더 큰 값을 반환
    const NextPage = () => setCurrentPage((prev) => prev + 1);

  return {
        currentPage,
        movies,
        isLoading, isError, isPending, isFetching, 
        PrevPage, NextPage,
        hasPrevPage: currentPage > 1, // 이전 페이지 여부,
        hasNextPage: movies?.total_pages && currentPage < movies.total_pages, // 다음 페이지 여부
    }
}

export default useGetPaginatedMovies