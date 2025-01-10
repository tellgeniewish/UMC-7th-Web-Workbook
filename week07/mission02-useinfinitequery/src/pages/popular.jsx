// src/pages/popular.jsx
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

const PopularPage = () => {
    //const {data: movies, isLoading, isError} = useCustomFetch(`/movie/popular`);
    // const { data: movies, isLoading, isError } = useQuery({
    //     queryKey: ['popularMovies'], // 쿼리 키: 동일한 키로 캐싱 및 재요청 관리
    //     queryFn: async () => {
    //         // queryFn: axiosInstance를 사용하여 API 호출
    //         const response = await axiosInstance.get(`/movie/popular`);
    //         return response.data; // API 데이터 반환
    //     },
    //     staleTime: 1000 * 60, // 데이터가 갱신되지 않아도 되는 시간(1분)
    // });
    // console.log(movies);
    // const {data: movies, isPending, isError} = useQuery({
    //     queryFn: () => useGetMovies({category: 'popular', pageParam: 1}),
    //     queryKey: ['movies', 'popular'],
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
    } = useGetInfiniteMovies('popular')
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
        //return <div><h1 style={{color:'white'}}>popular 로딩 중입니다...</h1></div>
        return (
            <S.MovieGridContainer>
                <CardListSkeleton number={20}/>
            </S.MovieGridContainer>
        )
    }
    if (isError) {
        return <div><h1 style={{color:'white'}}>popular 에러 발생</h1></div>
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
        </>
        
    );
};

export default PopularPage;