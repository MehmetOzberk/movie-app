using Microsoft.AspNetCore.Mvc;
public class MoviesController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly string _omdbApiKey;

    public MoviesController(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _omdbApiKey = config["Omdb:ApiKey"];  // Get from appsettings.json
    }

    [HttpGet]
    public async Task<IActionResult> GetMovies([FromQuery] string search)
    {
        if (string.IsNullOrWhiteSpace(search))
            return BadRequest("Search query is required.");

        var response = await _httpClient.GetAsync($"https://www.omdbapi.com/?apikey={_omdbApiKey}&s={search}");
        var json = await response.Content.ReadAsStringAsync();
        return Content(json, "application/json");
    }
}
