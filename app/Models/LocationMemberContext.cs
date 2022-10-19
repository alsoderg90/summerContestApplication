using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace app.Models
{
    public class LocationMemberContext : DbContext
    {
        public LocationMemberContext(DbContextOptions<LocationMemberContext> options) : base(options)
        {
        }
        public DbSet<LocationMember> LocationMembers { get; set; } = null!;
        public DbSet<Location> Checkpoints { get; set; } = null!;
        public DbSet<Member> Members { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LocationMember>()
                .HasKey(Lm => Lm.Id);
            modelBuilder.Entity<LocationMember>()
                .HasOne(Lm => Lm.Location)
                .WithMany(Location => Location.Points)
                .HasForeignKey(Point => Point.LocationId);
            modelBuilder.Entity<LocationMember>()
                .HasOne(Lm => Lm.Member)
                .WithMany(Member => Member.Points)
                .HasForeignKey(Lm => Lm.MemberId);
        }
    }
}
