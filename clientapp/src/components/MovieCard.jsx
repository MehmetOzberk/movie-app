import { useState } from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  console.log('MovieCard received movie:', movie);
  
  const title = movie.Title || movie.title || 'No Title';
  const year = movie.Year || movie.year || 'N/A';
  const poster = movie.Poster || movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster';
  
  console.log('Resolved values:', { title, year, poster });

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img 
          className="movie-poster" 
          src={poster} 
          alt={title}
          onError={(e) => {
            console.log('Image load error for:', poster);
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
          }}
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'favorite' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? '#e74c3c' : 'none'}
            stroke={isFavorite ? '#e74c3c' : '#fff'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="movie-info">
        <div className="movie-title">{title}</div>
        <div className="movie-year">{year}</div>
      </div>
    </div>
  );
}

export default MovieCard;
