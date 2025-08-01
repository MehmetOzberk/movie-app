import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from './MovieSlice';

const MovieSearch = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      dispatch(fetchMovies(searchText));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default MovieSearch;
