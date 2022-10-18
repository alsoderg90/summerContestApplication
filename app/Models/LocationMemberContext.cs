using Microsoft.EntityFrameworkCore;

namespace app.Models
{
    public class LocationMemberContext : DbContext
    {
        public LocationMemberContext(DbContextOptions<LocationMemberContext> options) : base(options)
        {
        }
        public DbSet<LocationMember> LocationMembers { get; set; } = null!;
        public DbSet<Checkpoint> Checkpoints { get; set; } = null!;
        public DbSet<Member> Members { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LocationMember>()
                .HasOne(Point => Point.Location)
                .WithMany(Location => Location.Points)
                .HasForeignKey(Point => Point.LocationId);
            modelBuilder.Entity<LocationMember>()
                .HasOne(Point => Point.Member)
                .WithMany(Member => Member.Points)
                .HasForeignKey(Point => Point.MemberId);
        }
    }
}
