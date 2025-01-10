// src/pages/up-coming.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import {axiosInstance} from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";
import { useQuery } from "@tanstack/react-query";
import SearchMovieList from '../Movie/search-movie-list';
import {useGetMovies} from '../hooks/queries/useGetMovies'
import * as S from '../pages/search/search.style'
import CardListSkeleton from "../components/Skeleton/card-list-skeleton"

const UpComingPage = () => {
    //const {data: movies, isLoading, isError} = useCustomFetch(`/movie/upcoming`);//?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`);
    // const { data: movies, isLoading, isError } = useQuery({
    //     queryKey: ['upcomingMovies'], // 쿼리 키: 동일한 키로 캐싱 및 재요청 관리
    //     queryFn: async () => {
    //         // queryFn: axiosInstance를 사용하여 API 호출
    //         const response = await axiosInstance.get(`/movie/upcoming`);
    //         return response.data; // API 데이터 반환
    //     },
    //     staleTime: 1000 * 60, // 데이터가 갱신되지 않아도 되는 시간(1분)
    // });
    // console.log(movies);
    const {data: movies, isPending, isError} = useQuery({
        queryFn: () => useGetMovies({category: 'upcoming', pageParam: 1}),
        queryKey: ['movies', 'upcoming'],
        cacheTime: 10000,
        staleTime: 1000 * 10,
    })

    if (isPending) {
       //return <div><h1 style={{color:'white'}}>upcoming 로딩 중입니다...</h1></div>
       return (
            <S.MovieGridContainer>
                <CardListSkeleton number={20}/>
            </S.MovieGridContainer>
        )
    }

    if (isError) {
        return <div><h1 style={{color:'white'}}>upcoming 에러 발생</h1></div>
    }

    return (
        <>
            <ShowMovies movies={movies?.results}/>
        </>
    );
};

export default UpComingPage;