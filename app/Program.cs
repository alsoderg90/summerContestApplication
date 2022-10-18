using Microsoft.EntityFrameworkCore;
using app.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<MemberContext>(opt =>
    opt.UseInMemoryDatabase("MemberList"));
builder.Services.AddDbContext<CheckpointContext>(opt =>
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
