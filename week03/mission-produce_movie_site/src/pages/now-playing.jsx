import { useEffect, useState } from "react";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const NowPlayingPage = () => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const getMovies = async () => {
            try {
            const movies = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`, {
                    // headers: {
                    //     Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}` // 환경 변수 사용
                    // }
                }
            );
            console.log(movies.data);
            setMovies(movies); // 응답에서 results 가져오기
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };
        getMovies();
    }, []);

    return (
        <ShowMovies movies={movies}/>
    );
};

export default NowPlayingPage;
