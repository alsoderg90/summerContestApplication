using Microsoft.EntityFrameworkCore;
using app.Models;
using System.Text.Json.Serialization;
using app.Services;
using app.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<DatabaseContext>(opt =>
    opt.UseInMemoryDatabase("DatabaseContext"));

//Services
builder.Services.AddTransient<LocationService, LocationService>();
builder.Services.AddTransient<MemberService, MemberService>();
builder.Services.AddTransient<PointService, PointService>();
builder.Services.AddTransient<TeamService, TeamService>();

//Repositories
builder.Services.AddTransient<LocationRepository, LocationRepository>();
builder.Services.AddTransient<MemberRepository, MemberRepository>();
builder.Services.AddTransient<TeamRepository, TeamRepository>();
builder.Services.AddTransient<PointsRepository, PointsRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllers();

app.MapFallbackToFile("index.html");;

app.Run();
