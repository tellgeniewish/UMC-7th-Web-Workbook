// src/pages/home.jsx
import {MOVIES} from '../mocks/movies';
import ShowMovies from "../components/ShowMovies";
import styled from 'styled-components';
import SearchMovieList from '../Movie/search-movie-list';

const HomePage = () => {
    return (
        //<h2>Home Page 야호~!</h2>
        <HomeContainer>
            <ShowMovies movies={MOVIES?.results}/>
            <SearchMovieList/>
        </HomeContainer>
    );
};

export default HomePage;

const HomeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5px;
    background-color: #000;
    gap: 10px;
`;