import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieList.css';
const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div className="movie-item" key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Poster !== 'N/A' && (
                <img
                  src={movie.Poster}
                  alt="Poster"
                  className="movie-list-img"
                />
              )}

              <h3 className="movie-list-title">{movie.Title}</h3>
            </Link>
            <p>({movie.Year})</p>
          </div>
        ))
      ) : (
        <div>No movies to display</div>
      )}
    </div>
  );
};

export default MovieList;
