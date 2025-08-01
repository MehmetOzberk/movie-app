using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace MovieApp.Controllers 
{
    [ApiController] 
    [Route("api/[controller]")] 
    public class MoviesController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _omdbApiKey;

        public MoviesController(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _omdbApiKey = config["Omdb:ApiKey"]!;  
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetMovies([FromQuery] string search)
        {
            if (string.IsNullOrWhiteSpace(search))
                return BadRequest("Search query is required.");

            var response = await _httpClient.GetAsync($"https://www.omdbapi.com/?apikey={_omdbApiKey}&s={search}");
            var jsonString = await response.Content.ReadAsStringAsync();
            var jsonObj = JsonSerializer.Deserialize<object>(jsonString);
            return Ok(jsonObj);
        }
    }
}