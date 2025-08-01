function MovieCard({ movie }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '12px',
      width: '180px',
      textAlign: 'center',
      margin: '8px'
    }}>
      <img 
        src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'} 
        alt={movie.Title} 
        style={{ width: '150px', height: '220px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3 style={{ fontSize: '1rem', margin: '8px 0 4px' }}>{movie.Title}</h3>
      <p style={{ color: '#666', margin: 0 }}>{movie.Year}</p>
    </div>
  );
}

export default MovieCard;
