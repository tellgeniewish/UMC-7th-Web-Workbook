import { useParams } from 'react-router-dom';
import useCustomFetch from "../hooks/useCustomFetch";
import styled from "styled-components";

const imageBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w500";

const MovieDetails = () => {
    const { movieId } = useParams();

    const {data: movie, isLoading, isError} = useCustomFetch(`/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR&page=1`);
    console.log(movie);

    const {data: credits} = useCustomFetch(`/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_TOKEN}&language=ko-KR`);

    if (isLoading) {
        return <div><h1 style={{color:'white'}}>MovieDetails 로딩 중입니다...</h1></div>
    }
    if (isError) {
        return <div><h1 style={{color:'white'}}>MovieDetails 에러 발생</h1></div>
    }

    return (
        <MovieDetailContainer>
            <PosterContainer backdrop={movie.backdrop_path}>         
                {/* <img 
                    src={`${imageBaseUrl}${posterSize}${movie.poster_path}`} 
                    alt={movie.original_title} 
                /> */}
                <DetailInfoContent>
                    <h1>{movie.title}</h1>
                    평균: {movie.vote_average}<br/>
                    {movie.release_date ? movie.release_date.split('-')[0] : 'None'}<br/>
                    {movie.runtime}분<br/>
                    <h2>{movie.tagline}</h2>
                    <p>{movie.overview}</p>
                </DetailInfoContent>
            </PosterContainer>
            <CastInfo>
                <h1>감독/출연</h1>
                <CastList crew={credits.crew} cast={credits.cast} />                
            </CastInfo>
        </MovieDetailContainer>
    );
};

const CastList = ({ crew = [], cast = [] }) => {
    // 감독 정보만 필터링하여 배열 생성
    const directors = crew.filter(person => person.job === 'Director');
    // 감독과 출연진을 결합
    const combinedCrewAndCast = [...directors, ...cast];

    // combinedCrewAndCast가 존재하고 배열인지 확인
    if (combinedCrewAndCast.length === 0) {
        return null; // 모든 정보가 없을 경우 렌더링하지 않음
    }
    
    return (
        <CastContainer>
            {combinedCrewAndCast.map((member) => (
                <CastMember key={member.id}>
                    {member.profile_path ? (
                        <ProfileImage
                            src={`${imageBaseUrl}w200${member.profile_path}`}
                            alt={member.name}
                        />
                    ):(<PlaceholderImage/>)}
                        <strong>{member.name}</strong><br/>
                        {member.job || member.character} {/* 역할 표시: 감독 또는 출연진 역할 */}
                </CastMember>
            ))}
        </CastContainer>
    );
};

export default MovieDetails;

const MovieDetailContainer = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: black; /* 화면 전체 배경색 설정 */
`;

const PosterContainer = styled.div`
    height: 50%;
    // width: 100%;
    position: relative;
    overflow: hidden; /* 포스터 영역을 넘지 않도록 설정 */
    border-radius: 10px;

    background-image: url(${(props) => `https://image.tmdb.org/t/p/w500${props.backdrop}`});
    background-size: cover;
    background-position: center;
`;


const DetailInfoContent = styled.div`
    max-width: 70%;

    // position: absolute; /* 절대 위치 설정 */
    // top: 0; /* 상단에 위치 */
    // left: 0; /* 좌측에 위치 */
    // z-index: 1; /* 포스터 위에 위치 */
    
    color: white;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)); /* 그라데이션 배경 */
    padding: 10px; /* 포스터 안에서 보이도록 패딩 추가 */   
    box-sizing: border-box; /* 패딩이 크기에 포함되도록 설정 */ 
    
    h1 {
        font-size: 2rem; /* 기본 글자 크기 */
    }

    p {
        font-size: 1rem; /* 기본 본문 글자 크기 */
    }

    @media (max-width: 800px) {
        h1 {
            font-size: 1.5rem; /* 작은 화면에서 글자 크기 조절 */
        }

        p {
            font-size: 0.875rem; /* 작은 화면에서 본문 글자 크기 조절 */
        }
    }

    @media (max-width: 60px) {
        h1 {
            font-size: 1.2rem; /* 더 작은 화면에서 글자 크기 조절 */
        }

        p {
            font-size: 0.75rem; /* 더 작은 화면에서 본문 글자 크기 조절 */
        }
    }
`;

const CastInfo = styled.div`
    height: 50%;
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const CastContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    background-color: black;
`;

const CastMember = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 10%; /* 한 줄에 10명씩 표시 */
    align-items: center;
    margin: 15px;
`;

const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid white;
    object-fit: cover; /* 비율 유지 */
`;

const PlaceholderImage = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: gray;
`;