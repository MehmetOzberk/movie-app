using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using MovieApp.Models;

namespace MovieApp.Controllers 
{
    [ApiController] 
    [Route("api/[controller]")] 
    public class MoviesController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _tmdbApiKey;
        private readonly ILogger<MoviesController> _logger;
        private const string TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

        public MoviesController(HttpClient httpClient, IConfiguration config, ILogger<MoviesController> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _tmdbApiKey = config["Tmdb:ApiKey"] ?? throw new ArgumentNullException("Tmdb:ApiKey configuration is missing");
        }

        [HttpGet("popular")]
        public async Task<ActionResult<MovieSearchResponse>> GetPopularMovies()
        {
            try
            {
                var url = $"https://api.themoviedb.org/3/movie/popular?api_key={_tmdbApiKey}&language=en-US&page=1";

                var response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("TMDB API error: {StatusCode} {Content}", 
                        response.StatusCode, 
                        await response.Content.ReadAsStringAsync());
                    return StatusCode((int)response.StatusCode, "Error fetching popular movies from TMDB");
                }

                var jsonString = await response.Content.ReadAsStringAsync();
                var tmdbResponse = JsonSerializer.Deserialize<TmdbMovieResponse>(jsonString);

                if (tmdbResponse == null)
                {
                    return BadRequest("Invalid response from TMDB");
                }

                var searchResponse = new MovieSearchResponse
                {
                    Search = tmdbResponse.Results?.Select(movie => new MovieSearchResult
                    {
                        Title = movie.Title,
                        Year = movie.ReleaseDate?.Split('-')?[0] ?? "N/A",
                        Poster = !string.IsNullOrEmpty(movie.PosterPath) 
                            ? TMDB_IMAGE_BASE_URL + movie.PosterPath 
                            : "https://via.placeholder.com/300x450?text=No+Poster",
                        imdbID = movie.Id.ToString()
                    })?.ToList() ?? new List<MovieSearchResult>()
                };

                return Ok(searchResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing popular movies request");
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<MovieSearchResponse>> GetMovies([FromQuery] string search)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(search))
                {
                    return BadRequest("Search term is required");
                }

                var url = $"https://api.themoviedb.org/3/search/movie?api_key={_tmdbApiKey}&language=en-US&query={search}";

                var response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("TMDB API error: {StatusCode} {Content}", 
                        response.StatusCode, 
                        await response.Content.ReadAsStringAsync());
                    return StatusCode((int)response.StatusCode, "Error fetching movies from TMDB");
                }

                var jsonString = await response.Content.ReadAsStringAsync();
                var tmdbResponse = JsonSerializer.Deserialize<TmdbMovieResponse>(jsonString);

                if (tmdbResponse == null)
                {
                    return BadRequest("Invalid response from TMDB");
                }

                
                var searchResponse = new MovieSearchResponse
                {
                    Search = tmdbResponse.Results?.Select(movie => new MovieSearchResult
                    {
                        Title = movie.Title,
                        Year = movie.ReleaseDate?.Split('-')?[0] ?? "N/A",
                        Poster = !string.IsNullOrEmpty(movie.PosterPath) 
                            ? TMDB_IMAGE_BASE_URL + movie.PosterPath 
                            : "https://via.placeholder.com/300x450?text=No+Poster",
                        imdbID = movie.Id.ToString()
                    })?.ToList() ?? new List<MovieSearchResult>()
                };

                if (!searchResponse.Search.Any())
                {
                    return NotFound(new { message = "No movies found", Search = new List<MovieSearchResult>() });
                }

                return Ok(searchResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing movie search request");
                return StatusCode(500, "An error occurred while processing your request");
            }
        }
    }
}