using app.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace app.Models
{
    public class LocationContext : DbContext
    {

        public LocationContext(DbContextOptions<LocationContext> options) : base(options)
        {
        }
        public DbSet<Location> Checkpoints { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .HasKey(l => l.Id);
            modelBuilder.Entity<Location>()
                .HasMany(l => l.Points);
        }
    }
}




//        {
//  "address": "Vuorikatu 12",
//  "lat": "62.24394765",
//  "lon": "25.699767340807732",
//  "name": "asd"
//}
