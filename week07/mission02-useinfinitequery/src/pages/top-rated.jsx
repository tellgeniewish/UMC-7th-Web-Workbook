// src/pages/top-rated.jsx
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
import { useInView } from "react-intersection-observer";
import ShowOneMovie from "../components/ShowOneMovie";
import ClipLoader from "react-spinners/ClipLoader";
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfiniteMovies";

const TopRankPage = () => {
    //const {data: movies, isLoading, isError} = useCustomFetch(`/movie/top_rated`);//?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`);
    // const { data: movies, isLoading, isError } = useQuery({
    //     queryKey: ['topRatedMovies'], // 쿼리 키: 동일한 키로 캐싱 및 재요청 관리
    //     queryFn: async () => {
    //         // queryFn: axiosInstance를 사용하여 API 호출
    //         const response = await axiosInstance.get(`/movie/top_rated`);
    //         return response.data; // API 데이터 반환
    //     },
    //     staleTime: 1000 * 60, // 데이터가 갱신되지 않아도 되는 시간(1분)
    // });
    // console.log(movies);
    // const {data: movies, isPending, isError} = useQuery({
    //     queryFn: () => useGetMovies({category: 'top_rated', pageParam: 1}),
    //     queryKey: ['movies', 'top_rated'],
    //     cacheTime: 10000,
    //     staleTime: 1000 * 10,
    // })

    const {
        data: movies,
        isLoading, 
        isFetching, 
        hasNextPage, 
        isPending, 
        fetchNextPage, 
        isFetchingNextPage, 
        error, isError
    } = useGetInfiniteMovies('top_rated')
    console.log("movies=", movies);
    const {ref, inView} = useInView({
        threshold: 0,
        // delay: 0,
    })

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, !isFetching, hasNextPage, fetchNextPage]);

    if (isPending) {
       //return <div><h1 style={{color:'white'}}>top_rated 로딩 중입니다...</h1></div>
       return (
            <S.MovieGridContainer>
                <CardListSkeleton number={20}/>
            </S.MovieGridContainer>
        )
    }
    if (isError) {
        return <div><h1 style={{color:'white'}}>top_rated 에러 발생</h1></div>
    }

    const AllMovies = movies?.pages
                            ?.map(page => page.results)
                            ?.flat() || [];
    
    return (
        <>
            <ShowMovies movies={AllMovies}/>
            {isFetching && <CardListSkeleton number={20}/>}
            <div style={{
                // backgroundColor: 'pink',
                // width: '100px',
                // height: '100px',
                marginTop: '50px',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            }} ref={ref}>
                {/* <h1>지니</h1> */}
                {isFetching && <ClipLoader color={'deeppink'}/>}
            </div>
            {/* <ShowMovies movies={movies?.results}/> */}
            <SearchMovieList/>
        </>
    );
};

export default TopRankPage;