import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, clearMovies } from './MovieSlice';
import MovieCard from '../../components/MovieCard';
import './MovieList.css'; 
function MovieList({ searchTerm }) {
  const { movies, loading, error } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchTerm) {
      dispatch(fetchMovies(''));
      return;
    }

    dispatch(fetchMovies(searchTerm));
  }, [searchTerm, dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const title = searchTerm ? `Search Results for "${searchTerm}"` : 'Popular Movies';

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>
        {title}
      </h2>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID || movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;