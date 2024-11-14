// src/components/ShowMovies.jsx
import styled from "styled-components";
import OneMovie from './ShowOneMovie';
import { Link } from 'react-router-dom';

const ShowMovies = ({movies}) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w500";
    return (
        <>
            {/* <S.CardList>
                // Optional Chaining 활용
                {movies.data?.results.map((movie) => (
                    <Card key={movie.id} movie={movie}/>
                ))}
            </S.CardList> */}
            <MovieContainer>
                {/* {movies.data?.results.map(movie =>  */}
                {movies?.map(movie => 
                    (
                        <StyledLink key={movie.id} to={`/movies/${movie.id}`}>                            
                            <OneMovie 
                                key={movie.id} 
                                movie={movie} 
                                imageBaseUrl={imageBaseUrl} 
                                posterSize={posterSize} 
                            />
                            {/* // <MovieStyle key={movie.id}>
                            //     <img 
                            //         src={`${imageBaseUrl}${posterSize}${movie.poster_path}`} 
                            //         alt={movie.original_title} 
                            //     />
                            //     <div>{movie.title}</div>
                            //     <sup>{movie.release_date}</sup>
                            // </MovieStyle> */}
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