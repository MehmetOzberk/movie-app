var builder = WebApplication.CreateBuilder(args);

// Validate TMDB API key at startup
var tmdbApiKey = builder.Configuration["Tmdb:ApiKey"];
if (string.IsNullOrEmpty(tmdbApiKey))
{
    throw new InvalidOperationException("TMDB API key is not configured. Please add it to appsettings.json or environment variables.");
}

builder.Services.AddHttpClient();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null; 
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
