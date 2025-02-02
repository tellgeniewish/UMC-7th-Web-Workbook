// src/pages/home.tsx
import React from 'react';
import {MOVIES} from '../mocks/movies';
import ShowMovies from "../components/ShowMovies";
import styled from 'styled-components';

// const HomePage = () => {
const HomePage: React.FC = () => {
    return (
        //<h2>Home Page 야호~!</h2>
        <HomeContainer>
            <ShowMovies movies={MOVIES?.results}/>
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