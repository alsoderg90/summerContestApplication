using Microsoft.EntityFrameworkCore;
using app.Models;
using System.Text.Json.Serialization;
using app.Services;
using app.Repositories;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

DotNetEnv.Env.Load();
var connectionString = Environment.GetEnvironmentVariable("ConnectionString");
var secretKey = Environment.GetEnvironmentVariable("SecretKey");
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<DatabaseContext>(opt =>
    {
        opt.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    });

builder.Services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });
    
//builder.Services.AddDbContext<DatabaseContext>(opt =>
//    opt.UseInMemoryDatabase("DatabaseContext"));

//Services
builder.Services.AddTransient<LocationService, LocationService>();
builder.Services.AddTransient<MemberService, MemberService>();
builder.Services.AddTransient<PointService, PointService>();
builder.Services.AddTransient<TeamService, TeamService>();
builder.Services.AddTransient<UserService, UserService>();


//Repositories
builder.Services.AddTransient<LocationRepository, LocationRepository>();
builder.Services.AddTransient<MemberRepository, MemberRepository>();
builder.Services.AddTransient<TeamRepository, TeamRepository>();
builder.Services.AddTransient<PointsRepository, PointsRepository>();
builder.Services.AddTransient<UserRepository, UserRepository>();

builder.Services.AddSingleton<AuthService>(new AuthService(secretKey));

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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("index.html");;

app.Run();
