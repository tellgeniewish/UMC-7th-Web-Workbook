// src/pages/party.jsx
import React from 'react'
import styled from "styled-components";
import {MOVIES} from '../mocks/movies';

const Party = () => {
    // const movie = MOVIES.results.find(movie => movie.title === "메가로돈 2");
    const randomIndex = Math.floor(Math.random() * MOVIES.results.length);
    const movie = MOVIES.results[randomIndex];

  return (
    <PartyWrapper>
        <Banner backdrop={movie.backdrop_path}>파티 타임 즐기자!</Banner>
        호스트: 미정 | 참여인원: 1명        
        <MovieParty>
            <h1>{movie.title}</h1>
            평균: {movie.vote_average} | 투표 인원: {movie.vote_count}명<br/>
            {movie.release_date ? movie.release_date.split('-')[0] : 'None'}<br/>
            <h2>{movie.tagline}</h2>
            <p>{movie.overview}</p>
        </MovieParty>
    </PartyWrapper>
  )
}

export default Party

const PartyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Banner = styled.div`
    // width: 50%;
    height: 300px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 20px;

    background-color: green;
    font-size: 1.5rem;
    font-weight: bold;

    overflow: hidden;
    background-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
        url(${(props) => `https://image.tmdb.org/t/p/w500${props.backdrop}`});
    background-size: cover;
    // background-position: center;
    border-radius: 10px;
`

const MovieParty = styled.div`
// width: 40%;
    margin-top: 10px;
    // background-color: pink;
    // height: 300px;
`