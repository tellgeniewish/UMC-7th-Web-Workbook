// src/components/ShowOneMovie.tsx
import React from "react";
import styled from "styled-components";

interface MovieType {
    poster_path: string;
    original_title: string;
    title: string;
    release_date: string;
}

interface ShowOneMovieProps {
    movie: MovieType;
    imageBaseUrl?: string;
    posterSize?: string;
}

// const ShowOneMovie = ({ movie, imageBaseUrl="https://image.tmdb.org/t/p/", posterSize="w500" }) => {
const ShowOneMovie: React.FC<ShowOneMovieProps> = ({ movie, imageBaseUrl = "https://image.tmdb.org/t/p/", posterSize = "w500" }) => {
    return (
        <MovieStyle>
            <img 
                src={`${imageBaseUrl}${posterSize}${movie.poster_path}`} 
                alt={movie.original_title} 
            />
            <div>{movie.title}</div>
            <sup>{movie.release_date}</sup>
        </MovieStyle>
    );
};

export default ShowOneMovie;

const MovieStyle = styled.div`
    position: relative;
    flex-wrap: wrap;
    width: 160px;    
  
    border-radius: 10px;
    overflow: hidden;

    img {
        width: 100%;
        height: 150px;
        transition: opacity 0.3s;
        display: block;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        
        opacity: 0;
        transition: opacity 0.3s;
    }

    &:hover::after {
        opacity: 0.5; /* 원하는 불투명도 설정 */
    }
`