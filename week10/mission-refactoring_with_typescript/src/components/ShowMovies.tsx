// src/components/ShowMovies.tsx
import React from "react";
import styled from "styled-components";
import OneMovie from './ShowOneMovie';
import { Link } from 'react-router-dom';

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    original_title: string;
    release_date: string;
}

interface ShowMoviesProps {
    movies: Movie[]; // movies는 Movie 객체 배열
}

// const ShowMovies = ({movies}) => {
const ShowMovies: React.FC<ShowMoviesProps> = ({ movies }) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w500";
    return (
        <>
            <MovieContainer>
                {/* {movies.data?.results.map(movie =>  */}
                {movies?.map((movie, index) => 
                    (
                        <StyledLink key={`${movie.id}-${index}`} to={`/movies/${movie.id}`}>                            
                            <OneMovie 
                                // key={movie.id} 
                                movie={movie} 
                                imageBaseUrl={imageBaseUrl} 
                                posterSize={posterSize} 
                            />
                        </StyledLink>
                    ))
                }
            </MovieContainer>
        </>
    )
}         
export default ShowMovies

const MovieContainer = styled.div`
    width: 100%;

    display: flex;
    justify-content: flex-start;
    // align-items: flex-start;
    
    flex-wrap: wrap;
    // align-content: flex-start;

    padding: 5px;
    gap: 10px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;