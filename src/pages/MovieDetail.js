import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="div-movie-detail">
      {movie && (
        <div className="movie-detail">
          <img src={movie.Poster} alt="Poster" className="movie-detail-img" />
          <div className="movie-detail-column">
            <h2>{movie.Title}</h2>
            <p>{movie.Plot}</p>
            <p>
              <strong>Year: </strong>
              {movie.Year}
            </p>
            <p>
              <strong>Genre: </strong>
              {movie.Genre}
            </p>
            <p>
              <strong>Director(s): </strong>
              {movie.Director}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
