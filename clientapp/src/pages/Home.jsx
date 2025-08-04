import { useState } from 'react';
import MovieList from '../features/movies/MovieList';
import Header from '../components/Header';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <MovieList searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
