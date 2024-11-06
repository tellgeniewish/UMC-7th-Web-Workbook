import styled from "styled-components";
import { Link } from 'react-router-dom';
import nowPlayingImage from '../image/now-playing.png';
import popularImage from '../image/popular.png';
import topRatedImage from '../image/top-rated.png';
import upComingImage from '../image/up-coming.png';

const MoviesPage = () => {
    return (
        <>
            <h2>카테고리</h2>
            <MovieRootLayout>
                <MovieContent><Link to="/now-playing"><img src={nowPlayingImage} alt='now-playing'/></Link></MovieContent>
                <MovieContent><Link to="/popular"><img src={popularImage} alt='popular'/></Link></MovieContent>
                <MovieContent><Link to="/top-rated"><img src={topRatedImage} alt='top-rated'/></Link></MovieContent>
                <MovieContent><Link to="/up-coming"><img src={upComingImage} alt='up-coming'/></Link></MovieContent>
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