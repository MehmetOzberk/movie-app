import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard';

function MovieList({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      setMovies([]);
      setErrorMessage('');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    axios.get(`/api/movies/search`, { params: { search: searchTerm } })
      .then(response => {
        const data = response.data; // assuming backend returns parsed JSON object

        if (!data.Search || data.Search.length === 0) {
          setMovies([]);
          setErrorMessage('No movies found for your search.');
        } else {
          setMovies(data.Search);
          setErrorMessage('');
        }
      })
      .catch(err => {
        console.error("API error:", err);
        setErrorMessage('Something went wrong. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  if (loading) return <p>Loading...</p>;

  if (errorMessage) return <p style={{ color: 'red' }}>{errorMessage}</p>;

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
