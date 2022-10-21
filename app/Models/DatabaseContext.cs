using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities.IO;
using System.Drawing;

namespace app.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
        public DbSet<Location> Locations { get; set; } = null!;
        public DbSet<Member> Members { get; set; } = null!;
        public DbSet<Team> Teams { get; set; } = null!;
        public DbSet<Point> Points { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .HasKey(l => l.Id);
            modelBuilder.Entity<Member>()
                .HasKey(m => m.Id);
            modelBuilder.Entity<Member>()
                .HasOne(m => m.Team)
                .WithMany(t => t.Members);
            modelBuilder.Entity<Point>()
                .HasKey(Lm => new { Lm.MemberId, Lm.LocationId});
            modelBuilder.Entity<Point>()
                .HasOne(Lm => Lm.Location)
                .WithMany(Location => Location.Points)
                .HasForeignKey(Point => Point.LocationId);
            modelBuilder.Entity<Point>()
                .HasOne(Lm => Lm.Member)
                .WithMany(Member => Member.Points)
                .HasForeignKey(Lm => Lm.MemberId);
            //base.OnModelCreating(modelBuilder);
        }
    }
}
