import { useEffect, useState } from "react";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";

const PopularPage = () => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const getMovies = async () => {
            try {
            const movies = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=5f7231c3c882ecedc18f8c66452592ca&language=ko-KR&page=1`, {
                    // headers: {
                    //     Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}` // 환경 변수 사용
                    // }
                }
            );
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

export default PopularPage;