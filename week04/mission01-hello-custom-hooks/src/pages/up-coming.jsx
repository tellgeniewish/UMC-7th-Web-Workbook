import { useEffect, useState } from "react";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import {axiosInstance} from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";

const UpComingPage = () => {
    const {data: movies, isLoading, isError} = useCustomFetch(`/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`);
    console.log(movies);

    if (isLoading) {
       return <div><h1 style={{color:'white'}}>upcoming 로딩 중입니다...</h1></div>
    }
    if (isError) {
        return <div><h1 style={{color:'white'}}>upcoming 에러 발생</h1></div>
    }

    // const [movies, setMovies] = useState([]);
    
    // useEffect(() => {
    //     const getMovies = async () => {
    //         try {
    //             const movies = await axiosInstance.get(
    //                 `/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`
    //             );
    //             setMovies(movies);
    //         } catch (error) {
    //             console.error("Failed to fetch movies:", error);
    //         }
    //     };
    //     getMovies();
    // }, []);

    return (
        <ShowMovies movies={movies}/>
    );
};

export default UpComingPage;