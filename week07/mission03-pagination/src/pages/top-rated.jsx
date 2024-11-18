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
import useGetPaginatedMovies from "../hooks/queries/useGetPaginatedMovies";
import styled from "styled-components";

const TopRankPage = () => {
    //const {data: movies, isLoading, isError} = useCustomFetch(`/movie/top_rated`);//?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`);
    // console.log(movies);
    // const {data: movies, isPending, isError} = useQuery({
    //     queryFn: () => useGetMovies({category: 'top_rated', pageParam: 1}),
    //     queryKey: ['movies', 'top_rated'],
    //     cacheTime: 10000,
    //     staleTime: 1000 * 10,
    // })

    // const {
    //     data: movies,
    //     isLoading, 
    //     isFetching, 
    //     hasNextPage, 
    //     isPending, 
    //     fetchNextPage, 
    //     isFetchingNextPage, 
    //     error, isError
    // } = useGetInfiniteMovies('top_rated')
    // console.log("movies=", movies);
    // const {ref, inView} = useInView({
    //     threshold: 0,
    //     // delay: 0,
    // })

    // useEffect(() => {
    //     if (inView) {
    //         !isFetching && hasNextPage && fetchNextPage();
    //     }
    // }, [inView, !isFetching, hasNextPage, fetchNextPage]);

    const {
        currentPage,
        movies,
        isLoading, isError, isPending, isFetching,
        PrevPage, NextPage,
        hasPrevPage, hasNextPage
    } = useGetPaginatedMovies({category: 'top_rated'})
    console.log("movies=", movies);

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

    // const AllMovies = movies?.pages
    //                         ?.map(page => page.results)
    //                         ?.flat() || [];
    
    return (
        <>
            {/* <ShowMovies movies={AllMovies}/> */}
            {/* {isFetching && <CardListSkeleton number={20}/>} */}
            {/* <div style={{ */}
                {/* marginTop: '50px', */}
                {/* display: 'flex', */}
                {/* justifyContent: 'center', */}
                {/* width: '100%', */}
            {/* }} ref={ref}> */}
                {/* <h1>지니</h1> */}
                {/* {isFetching && <ClipLoader color={'deeppink'}/>} */}
            {/* </div> */}
            <ShowMovies movies={movies?.results}/>
            <SearchMovieList/>
            <PaginationContainer>
                <PageBtn onClick={PrevPage} disabled={currentPage === 1}>이전</PageBtn>
                <CurrentPage>{currentPage}페이지</CurrentPage>
                <PageBtn onClick={NextPage} disabled={!movies || currentPage === movies.total_pages}>다음</PageBtn>
            </PaginationContainer>
        </>
    );
};

export default TopRankPage;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed; // 화면에 고정
    left: 50%;
    bottom: 50px; // 화면 하단에서 100px 위에 고정
`

const PageBtn = styled.button`
    width: 80px;
    height: 50px;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : 'deeppink')};
    color: white;
`

const CurrentPage = styled.div`
    width: 70px;
    color: white;
    font-size: 1.2rem;
    margin: 10px;
`