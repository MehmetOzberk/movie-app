using System.Text.Json.Serialization;

namespace MovieApp.Models
{
    public class TmdbMovieResponse
    {
        public int Page { get; set; }
        [JsonPropertyName("results")]
        public List<MovieResult> Results { get; set; } = new();
        [JsonPropertyName("total_pages")]
        public int TotalPages { get; set; }
        [JsonPropertyName("total_results")]
        public int TotalResults { get; set; }
    }

    public class MovieResult
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;
        [JsonPropertyName("poster_path")]
        public string? PosterPath { get; set; }
        [JsonPropertyName("release_date")]
        public string? ReleaseDate { get; set; }
        [JsonPropertyName("overview")]
        public string Overview { get; set; } = string.Empty;
    }

    public class MovieSearchResponse
    {
        [JsonPropertyName("Search")]
        public List<MovieSearchResult> Search { get; set; } = new();
    }

    public class MovieSearchResult
    {
        [JsonPropertyName("Title")]
        public string Title { get; set; } = string.Empty;
        [JsonPropertyName("Year")]
        public string Year { get; set; } = string.Empty;
        [JsonPropertyName("Poster")]
        public string Poster { get; set; } = string.Empty;
        [JsonPropertyName("imdbID")]
        public string imdbID { get; set; } = string.Empty;
    }
}
