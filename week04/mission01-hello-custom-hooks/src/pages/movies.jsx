import styled from "styled-components";
import { Link } from 'react-router-dom';

const MoviesPage = () => {
    return (
        <>
            <h2>카테고리</h2>
            <MovieRootLayout>
                <MovieContent><Link to="/now-playing"><img src="/image/now-playing.png" alt='now-playing'/></Link></MovieContent>
                <MovieContent><Link to="/popular"><img src="/image/popular.png" alt='popular'/></Link></MovieContent>
                <MovieContent><Link to="/top-rated"><img src="/image/top-rated.png" alt='top-rated'/></Link></MovieContent>
                <MovieContent><Link to="/up-coming"><img src="/image/up-coming.png" alt='up-coming'/></Link></MovieContent>
            </MovieRootLayout>
        </>        
    );
};

export default MoviesPage;

const MovieRootLayout = styled.div`
    display:flex;
    justify-content: space-evenly;
    flex-wrap: wrap; /* 화면 크기가 줄어들 때 버튼이 다음 줄로 이동하도록 함 */
`

const MovieContent = styled.button`
    background-color: black;
    flex: 1;
    margin: 10px;
    padding: 10px;
`