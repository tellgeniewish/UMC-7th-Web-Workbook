// src/pages/search.jsx
// import styled from "styled-components";
// import {MOVIES} from '../../mocks/movies';
// import ShowMovies from "../../components/ShowMovies";
import * as S from './search.style'
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// import useCustomFetch from "../../hooks/useCustomFetch";
// import OneMovie from '../../components/ShowOneMovie';
// import { Link } from 'react-router-dom';
import SearchMovieList from '../../Movie/search-movie-list';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value)
    }
    const navigate = useNavigate()

    console.log(searchValue, '검색결과값')

    const [searchParams, 
        // setSearchParams
    ] = useSearchParams({
        mq: ''
    })
    const mq = searchParams.get('mq')
    console.log("mq=", mq)
    console.log(mq === searchValue)

    const handleSearchMovie = () => {
        if (mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`) // 백틱으로 적어야 함
        console.log("hi")
    }

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
        }
    }

    // const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    // const {data: movies, isLoading, isError} = useCustomFetch(url);
    // console.log("movies=", movies);

    return (
        <>
            <S.SearchContainer>
                {/* <h2>검색페이지 야호~!</h2> */}
                {/* <S.Search> */}
                    <input placeholder="영화 제목을 입력해주세요..."
                            value={searchValue}
                            onChange={onChangeSearchValue}
                            onKeyDown={handleSearchMovieWithKeyboard}></input>
                    {/* <button onClick={() => console.log('클릭')}>검색</button> */}
                    <button onClick={handleSearchMovie}>검색</button>
                {/* </S.Search> */}
                {/* <ShowMovies movies={MOVIES?.results}/> */}
            </S.SearchContainer>
            {/* <S.MovieGridContainer>
                {movies?.results?.map((movie) => (
                    <OneMovie key={movie.id} movie={movie}/>
                ))}
                //<ShowMovies movies={movies?.results}/>
            </S.MovieGridContainer> */}
            {/* <SearchMovieList searchValue={searchValue}/> */}
            <SearchMovieList/>
        </>
    );
};

export default SearchPage;

// const SearchWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
// `

// const Search = styled.div`
//     display: flex;
//     flex-direction: row;
//     margin-bottom: 20px;
// `

// const SearchBtnInput = styled.input`
//     width: 80%;
//     height: 50px;

//     font-size: 1.2rem;

//     border-radius: 5px 0 0 5px;
//     border: none;
//     outline: none; // 포커스 상태에서 표시
//     margin-left: 5px;
// `

// const SearchBtn = styled.button`
//     background-color: deeppink;
//     color: white;
//     width: fit-content;
    
//     border-radius: 0 5px 5px 0;
//     cursor: pointer;
// `