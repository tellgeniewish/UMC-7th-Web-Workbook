// src/pages/subscribe.jsx
import React from 'react'
import styled from "styled-components";
import {MOVIES} from '../mocks/movies';
import { Link } from 'react-router-dom';

const Subscribe = () => {
    const subscribeMovies = MOVIES.results.slice(0, 10);

    return (
        <SubscribeWrapper>
          {subscribeMovies.map((movie) => (
              <MovieCard key={movie.id} to={`/movies/${movie.id}`}>
              <Poster 
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                  alt={movie.title} 
              />
              <Title>{movie.title}</Title>
              </MovieCard>
          ))}
        </SubscribeWrapper>
    )
}

export default Subscribe

const SubscribeWrapper = styled.div`
    display: flex;
    gap: 20px; /* 영화 카드 간 간격 */
    // justify-content: center;
    padding: 20px;
    flex-wrap: wrap;
`;

const MovieCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  cursor: pointer;
//   text-decoration: none;
`;

const Poster = styled.img`
  width: 200px;
  height: 100px;
  object-fit: cover; /* 이미지를 비율에 맞게 채우기 */
  border-radius: 10px;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 0.8rem;
  text-align: center;
`;