import React from 'react';
import MovieSearch from '../features/movies/MovieSearch';
import MovieList from '../features/movies/MovieList';

const Home = () => {
  return (
    <main className="p-4">
      <MovieSearch />
      <MovieList />
    </main>
  );
};

export default Home;
