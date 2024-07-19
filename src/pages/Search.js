import React, { useState, useEffect, useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';
import { fetchMovies, fetchMovieDetails } from '../services/api';
import MovieList from '../components/MovieList';
import '../styles/Search.css';

const initialQueries = ['avengers', 'batman', 'guardian', 'john']; // Queries to fetch a diverse list of movies

const Search = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { movies, setMovies, allMovies, setAllMovies } =
    useContext(MovieContext);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        let combinedMovies = [];
        for (const query of initialQueries) {
          const data = await fetchMovies(query);
          if (data.Search) {
            combinedMovies = [...combinedMovies, ...data.Search];
          }
        }

        const movieDetailsPromises = combinedMovies.map((movie) =>
          fetchMovieDetails(movie.imdbID)
        );
        const movieDetails = await Promise.all(movieDetailsPromises);

        setAllMovies(movieDetails);
        setMovies(movieDetails.slice(0, 20));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchInitialMovies();
  }, [setAllMovies, setMovies]);

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) {
      setError('Please enter a valid search query.');
      return;
    }

    setError(null);
    const filteredMovies = allMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMovies(filteredMovies);
    setPreviousSearches((prev) => [...new Set([searchQuery, ...prev])]);
  };

  const handleClear = () => {
    setQuery('');
    setError(null);
    setMovies(allMovies);
  };

  const handleDeleteSearch = (search, event) => {
    event.stopPropagation();
    setPreviousSearches((prev) => prev.filter((item) => item !== search));
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className={`search ${loading ? 'blurred' : ''}`}>
        <h2>Search Movies</h2>
        <div className="search-bar" onBlur={handleBlur} tabIndex="0">
          <input
            type="text"
            placeholder="Search movie"
            value={query}
            onFocus={handleFocus}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={() => handleSearch()}>
            <img src={`${process.env.PUBLIC_URL}/search.png`} alt="Search" />
          </button>
          {showDropdown && previousSearches.length > 0 && (
            <ul className="dropdown">
              {previousSearches.map((search, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                  <button
                    className="delete-button"
                    onClick={(event) => handleDeleteSearch(search, event)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/delete.png`}
                      alt="Delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="div-buttons">
          <button className="button" onClick={handleClear}>
            Clear
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default Search;
