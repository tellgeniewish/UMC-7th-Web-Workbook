// src/pages/now-playing.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import {axiosInstance} from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";
import { useQuery } from "@tanstack/react-query";
import SearchMovieList from '../Movie/search-movie-list';
import {useGetMovies} from '../hooks/queries/useGetMovies'
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfiniteMovies";
import * as S from '../pages/search/search.style'
import CardListSkeleton from "../components/Skeleton/card-list-skeleton"

const NowPlayingPage = () => {
    // const {data: movies, isLoading, isError} = useCustomFetch(`/movie/now_playing`);//?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`);
    // const { data: movies, isLoading, isError } = useQuery({
    //     queryKey: ['nowPlayingMovies'], // 쿼리 키: 동일한 키로 캐싱 및 재요청 관리
    //     queryFn: async () => {
    //         // queryFn: axiosInstance를 사용하여 API 호출
    //         const response = await axiosInstance.get(`/movie/now_playing`);
    //         return response.data; // API 데이터 반환
    //     },
    //     staleTime: 1000 * 60, // 데이터가 갱신되지 않아도 되는 시간(1분)
    // });
    // console.log(movies);
    const {data: movies, isPending, isError} = useQuery({
        queryFn: () => useGetMovies({category: 'now_playing', pageParam: 1}),
        queryKey: ['movies', 'now_playing'],
        cacheTime: 10000,
        staleTime: 1000 * 10,
    })
    // console.log(data);

    // isPending: 데이터를 불러오는 중입니다. --> 데이터가 로딩 중일 때 isPending === true
    // isLoading: 데이터를 불러오는 중이거나, 재시도 중일 때 true가 됩니다.

    // const {data} = useGetInfiniteMovies('now_playing')
    // console.log("data=", data);

    if (isPending) {
       //return <div><h1 style={{color:'white'}}>now_playing 로딩 중입니다...</h1></div>
       return (
        <S.MovieGridContainer>
            <CardListSkeleton number={20}/>
        </S.MovieGridContainer>
    )
    }
    if (isError) {
        return <div><h1 style={{color:'white'}}>now_playing 에러 발생</h1></div>
    }

    return (
        <>
            <ShowMovies movies={movies?.results}/>
        </>
    );
};

export default NowPlayingPage;