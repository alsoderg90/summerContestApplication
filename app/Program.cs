using Microsoft.EntityFrameworkCore;
using app.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<MemberContext>(opt =>
    opt.UseInMemoryDatabase("MemberList"));
builder.Services.AddDbContext<LocationContext>(opt =>
    opt.UseInMemoryDatabase("CheckpointList"));
builder.Services.AddDbContext<LocationMemberContext>(opt =>
    opt.UseInMemoryDatabase("LocationMemberList"));

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
