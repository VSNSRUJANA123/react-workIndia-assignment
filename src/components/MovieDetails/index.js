import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "81288ed684424c09eb37dd0e15a998d1";
  const baseUrl = "https://api.themoviedb.org/3/movie/";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const detailsResponse = await axios.get(
          `${baseUrl}${id}?api_key=${apiKey}&language=en-US`
        );
        const castResponse = await axios.get(
          `${baseUrl}${id}/credits?api_key=${apiKey}&language=en-US`
        );

        setMovieDetails(detailsResponse.data);
        setCast(castResponse.data.cast.slice(0, 6));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-loading">
        <p>Error fetching movie details: {error.message}</p>
      </div>
    );
  }

  if (!movieDetails) {
    return <p>Movie not found.</p>;
  }

  const { title, overview, poster_path, vote_average, release_date, runtime } =
    movieDetails;

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <img src={imageUrl} alt={title} />
        <div className="info">
          <h2>{title}</h2>
          <p>Runtime: {runtime}</p>
          <p>Release Date: {release_date}</p>
          <p>Average Rating: {vote_average.toFixed(1)}</p>
          <p>{overview}</p>
        </div>
      </div>
      <h3>Cast</h3>
      <ul className="cast-list">
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;
