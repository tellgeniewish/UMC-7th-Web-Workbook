import { useEffect, useState } from "react";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import {axiosInstance} from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";

const NowPlayingPage = () => {
    const {data: movies, isLoading, isError} = useCustomFetch(`/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`);
    console.log(movies);

    if (isLoading) {
       return <div><h1 style={{color:'white'}}>now_playing 로딩 중입니다...</h1></div>
    }
    if (isError) {
        return <div><h1 style={{color:'white'}}>now_playing 에러 발생</h1></div>
    }

    // const [movies, setMovies] = useState([]);
    
    // useEffect(() => {
    //     const getMovies = async () => {
    //         try {
    //             const movies = await axiosInstance.get(
    //                 `/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`
    //             );
    //             console.log(movies.data);
    //             setMovies(movies); // 응답에서 results 가져오기
    //         } catch (error) {
    //             console.error("Failed to fetch movies:", error);
    //         }
    //     };
    //     getMovies();
    // }, []);

    return (
        // <ShowMovies movies={movies}/>
        <ShowMovies movies={movies?.results}/>
    );
};

export default NowPlayingPage;