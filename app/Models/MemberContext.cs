using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace app.Models
{
    public class MemberContext : DbContext
    {
        List<Member> members = new List<Member>
        {
            new Member {Name = "John Doe", Id = 1, Nationality = "Finland"},
            new Member {Name = "Jane Doe", Id = 2, Nationality = "Sweden"}
        };
        public MemberContext(DbContextOptions<MemberContext> options) : base(options)
        { 
        }

        public DbSet<Member> Members { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>()
                .HasKey(m => m.Id);
        }
    }
}
