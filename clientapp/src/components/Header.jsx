import React, { useState } from 'react';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header>
      <h1 ><a href="Home.jsx">Movie App</a> | <a href="Home.jsx">Favorites</a></h1>
      <form onSubmit={handleSubmit} style={{ marginLeft: 'auto' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ fontcolor: '#black', backgroundColor: '#EEEEEE', border: 'none', borderRadius: '4px', marginLeft: '8px', padding: '6px 12px' }}>
          Search
        </button>
      </form>
    </header>
  );
}

export default Header;
