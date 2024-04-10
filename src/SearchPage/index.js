import "./index.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchTerm } = useParams();
  const apiKey = "81288ed684424c09eb37dd0e15a998d1";
  const baseUrl = "https://api.themoviedb.org/3/search/movie";

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${baseUrl}?api_key=${apiKey}&query=${searchTerm}`
        );
        setSearchResults(response.data.results);
      } catch (error) {
        setError(error);
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  const handleError = () => {
    if (error) {
      return (
        <div className="search-loading">
          <p>Error fetching search results: {error.message}</p>
        </div>
      );
    }

    if (!searchTerm) {
      return (
        <div className="search-loading">
          <p>Enter a search term to find movies.</p>
        </div>
      );
    }

    if (!searchResults.length) {
      return (
        <div className="search-loading">
          <p> No results found for "{searchTerm}".</p>
        </div>
      );
    }
  };

  console.log(searchResults, searchTerm);
  return (
    <div className="search-container">
      <h1>Search Results for "{searchTerm}"</h1>
      {isLoading ? (
        <div className="search-loading">
          <p>Searching...</p>
        </div>
      ) : (
        <div className="search-results">
          {handleError()}
          {searchResults.map((movie) => (
            <div key={movie.id} className="search-result-item">
              <Link to={`/movie/${movie.id}`}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              </Link>
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
