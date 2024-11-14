// src/Movie/search-movie-list.jsx
import OneMovie from '../components/ShowOneMovie';
import * as S from '../pages/search/search.style'
import useCustomFetch from "../hooks/useCustomFetch";
import { useSearchParams, useNavigate } from "react-router-dom";
import CardSkeleton from "../components/Skeleton/card-skeleton"
import CardListSkeleton from "../components/Skeleton/card-list-skeleton"

// const SearchMovieList = ({searchValue}) => {
const SearchMovieList = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    })
    const mq = searchParams.get('mq')
    
    // const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;
    const {data: movies, isLoading, isError} = useCustomFetch(url);
    console.log("movies=", movies);

    if (mq && movies?.results?.length === 0) {
        return (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <h1 style={{color: 'white'}}>해당하는 검색어 {mq}에 해당하는 데이터가 없습니다.</h1>
            </div>
        )
    }

    if (isLoading) {
        //return <div><h1 style={{color:'white'}}>search 로딩 중입니다...</h1></div>
        return (
            <S.MovieGridContainer>
                <CardListSkeleton number={20}/>
            </S.MovieGridContainer>
        )
    }
    if (isError) {
        return <div><h1 style={{color:'white'}}>search 에러 발생</h1></div>
    }

    return (
        <S.MovieGridContainer>
            {movies?.results?.map((movie) => (
                <OneMovie key={movie.id} movie={movie}/>
            ))}
            {/* <ShowMovies movies={movies?.results}/> */}
        </S.MovieGridContainer>
    );
};

export default SearchMovieList;