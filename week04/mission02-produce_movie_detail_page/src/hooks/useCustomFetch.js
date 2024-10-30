import { useEffect, useState } from "react";
import {axiosInstance} from "../apis/axios-instance";

// const {data, isLoading, isError} = useCustomFetch('url');

const useCustomFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(url, {
                    headers: {
                      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                    }
                });
                // setData(response);
                setData(response.data);
                // useCustomFetch에서 setData(response);하고, PopularPage에서 <ShowMovies movies={movies}/>하고, ShowMovies에서 {movies.data?.results.map(movie =>
                // useCustomFetch에서 setData(response.data);하고, PopularPage에서 <ShowMovies movies={movies.results}/>하고, ShowMovies에서 {movies?.map(movie =>
                // useCustomFetch에서 setData(response.data);하고, PopularPage에서 <ShowMovies movies={movies}/>하고, ShowMovies에서 {movies?.results?.map(movie =>
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return {data, isLoading, isError}

    // useEffect(() => {
    //     const getMovies = async () => {
    //         try {
    //             const data = await axiosInstance.get(url);
    //             setData(data); // 응답에서 results 가져오기
    //         } catch (error) {
    //             console.error("Failed to fetch movies:", error);
    //         }
    //     };
    //     getMovies();
    // }, []);
}

export default useCustomFetch;