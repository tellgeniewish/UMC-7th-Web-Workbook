import styled from "styled-components";

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
                {movies.data?.results.map(movie => 
                    (<MovieStyle key={movie.id}>
                        <img 
                            src={`${imageBaseUrl}${posterSize}${movie.poster_path}`} 
                            alt={movie.original_title} 
                        />
                        <div>{movie.title}</div>
                        <sup>{movie.release_date}</sup>
                    </MovieStyle>))
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
    align-items: flex-start;
    
    flex-wrap: wrap;
    align-content: flex-start;

    gap: 10px;
`

const MovieStyle = styled.div`
    position: relative;
    flex: 0 0 calc(10% - 10px);
  
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
