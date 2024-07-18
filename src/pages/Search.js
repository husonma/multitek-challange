import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';
import MovieList from '../components/MovieList';
import '../styles/Search.css';

const initialQueries = ['avengers', 'batman', 'arthur', 'iron', 'e']; // Queries to fetch a diverse list of movies

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]); // Store all movies here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
        setAllMovies(combinedMovies); // Store the complete list of movies
        setMovies(combinedMovies.slice(0, 20)); // Display the first 20 movies
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialMovies();
  }, []);

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) {
      setError('Please enter a valid search query.');
      return;
    }

    setLoading(true);
    setError(null);

    // Filter the movies based on the search query
    const filteredMovies = allMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMovies(filteredMovies);
    setPreviousSearches((prev) => [...new Set([searchQuery, ...prev])]);
    setLoading(false);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setQuery('');
    setError(null);
    // Display the first 20 movies from the initial fetch
    setMovies(allMovies.slice(0, 20));
  };

  const handleDeleteSearch = (search, event) => {
    event.stopPropagation(); // Stop the event from propagating to the parent elements
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
      {loading && <div className="loading-overlay"></div>}
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
