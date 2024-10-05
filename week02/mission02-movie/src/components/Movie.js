import {MOVIES} from '../mocks/movies';

const Movie = () => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w500";
    return (
        <div className='container'>
            {MOVIES.results.map(movie => (
                <div key={movie.id} className='movieStyle'>
                    <img 
                        src={`${imageBaseUrl}${posterSize}${movie.poster_path}`} 
                        alt={movie.original_title} 
                    />
                    <div className='touch'/>
                </div>
            ))}
        </div>
    )
}
         
export default Movie