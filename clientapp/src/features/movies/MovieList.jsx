import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from './MovieSlice';
import MovieCard from '../../components/MovieCard';

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
