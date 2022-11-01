using EntityFramework.Exceptions.MySQL;
using Microsoft.EntityFrameworkCore;

namespace app.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseExceptionProcessor();
        }
        public DbSet<Location> Locations { get; set; } = null!;
        public DbSet<Member> Members { get; set; } = null!;
        public DbSet<Team> Teams { get; set; } = null!;
        public DbSet<Point> Points { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);
            modelBuilder.Entity<Location>()
                .HasKey(l => l.Id);
            modelBuilder.Entity<Member>()
                .HasKey(m => m.Id);
            modelBuilder.Entity<Member>()
                .HasIndex(m => m.Name)
                .IsUnique();
            modelBuilder.Entity<Member>()
                .HasOne(m => m.Team)
                .WithMany(t => t.Members)
                .IsRequired(false);
            modelBuilder.Entity<Location>()
                .HasMany(l => l.Points)
                .WithOne(p => p.Location)
                .OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<Team>()
                .HasMany(t => t.Members)
                .WithOne(m => m.Team)
                .IsRequired(false);
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
