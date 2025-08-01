const MovieCard = ({ movie }) => (
  <div className="p-4 border rounded shadow">
    <img src={movie.Poster} alt={movie.Title} />
    <h3>{movie.Title}</h3>
    <p>{movie.Year}</p>
  </div>
);

export default MovieCard;
