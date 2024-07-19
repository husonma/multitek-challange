import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../contexts/MovieContext';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const { movies, selectedMovie, setSelectedMovie } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const movie = movies.find((movie) => movie.imdbID === id);
    if (movie) {
      setSelectedMovie(movie);
      setLoading(false);
    } else {
      setError('Movie not found');
      setLoading(false);
    }
  }, [id, movies, setSelectedMovie]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="div-movie-detail">
      {selectedMovie && (
        <div className="movie-detail">
          <img
            src={selectedMovie.Poster}
            alt="Poster"
            className="movie-detail-img"
          />
          <div className="movie-detail-column">
            <h2>{selectedMovie.Title}</h2>
            <p>{selectedMovie.Plot}</p>
            <p>
              <strong>Year: </strong>
              {selectedMovie.Year}
            </p>
            <p>
              <strong>Genre: </strong>
              {selectedMovie.Genre}
            </p>
            <p>
              <strong>Director(s): </strong>
              {selectedMovie.Director}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
