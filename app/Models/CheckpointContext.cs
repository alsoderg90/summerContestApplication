using app.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace app.Models
{
    public class CheckpointContext : DbContext
    {

        public CheckpointContext(DbContextOptions<CheckpointContext> options) : base(options)
        {
        }
        public DbSet<Checkpoint> Checkpoints { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Checkpoint>()
                .HasKey(m => m.Id);
        }
    }
}




//        {
//  "address": "Vuorikatu 12",
//  "lat": "62.24394765",
//  "lon": "25.699767340807732",
//  "name": "asd"
//}
