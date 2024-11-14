// src/pages/up-coming.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import {axiosInstance} from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";

const UpComingPage = () => {
    const {data: movies, isLoading, isError} = useCustomFetch(`/movie/upcoming`);//?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`);
    console.log(movies);

    if (isLoading) {
       return <div><h1 style={{color:'white'}}>upcoming 로딩 중입니다...</h1></div>
    }
    if (isError) {
        return <div><h1 style={{color:'white'}}>upcoming 에러 발생</h1></div>
    }

    return (
        <ShowMovies movies={movies?.results}/>
    );
};

export default UpComingPage;