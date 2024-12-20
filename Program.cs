using LemonadeStand.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(Program));

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("LemonadeStand.Config/appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables()
    .Build();

builder.Services.AddDbContext<LemonadeContext>(options =>
    options.UseNpgsql(config.GetConnectionString("lemonade")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            var frontendurl = config["Frontend:Url"];
            Console.WriteLine(frontendurl);
            builder.WithOrigins(frontendurl)
            .WithOrigins("Frontend:Https")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
} 
app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseRouting();

if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowSpecificOrigins");

}

app.UseAuthorization();

app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Products}/{action=GetProducts}"
);

app.Run();
