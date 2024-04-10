import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";

const UpComing = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [totalPages, setPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [more, setHasMore] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      console.log(more);
      const apiKey = "81288ed684424c09eb37dd0e15a998d1";
      const baseUrl = "https://api.themoviedb.org/3/movie/upcoming";
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}?api_key=${apiKey}&language=en-US&page=${more}`
        );
        const data = await response.json();
        setLoading(false);
        setPages(data);
        setPopularMovies(data.results);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchPopularMovies();
  }, [more]);

  const onIncrement = () => {
    if (more < totalPages.total_pages) {
      setHasMore(more + 1);
    }
  };

  const onDecrement = () => {
    if (more > 1) setHasMore(more - 1);
  };

  const fetchMovieData = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <h1>Fetching Movie Data...</h1>
        </div>
      );
    }
    if (error) {
      return (
        <div className="loading">
          <h1>Oops! Something Went Wrong</h1>
          <p>Try Again</p>
        </div>
      );
    }
    return (
      <ul className="movies-ul-container">
        {popularMovies.map((items) => {
          console.log(items.id);
          return (
            <li key={items.id}>
              <Link to={`/movie/${items.id}`}>
                <img
                  className="image"
                  src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`}
                  alt={items.title}
                />
              </Link>
              <h3>{items.title}</h3>
              <p>Rating: {items.vote_average.toFixed(1)}</p>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="home-page">
      <h1>UpComing Movies</h1>
      {fetchMovieData()}
      <p>Discover your next favorite movie.</p>
      <div className="button-div">
        <button onClick={onIncrement}>+</button>
        <span> {more}</span>
        <button onClick={onDecrement}>-</button>
      </div>
    </div>
  );
};

export default UpComing;
