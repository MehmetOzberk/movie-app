import { useState } from 'react';
import MovieList from '../features/movies/MovieList';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.search.value;
    setSearchTerm(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="search" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>

      <MovieList searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
