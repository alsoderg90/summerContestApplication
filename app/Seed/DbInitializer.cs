using Microsoft.EntityFrameworkCore;
using app.Models;

namespace app.Seed
{
    public class DbInitializer
    {
        private readonly ModelBuilder modelBuilder;

        public DbInitializer(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void SeedMembers()
        {
            List<Member> members = new List<Member>
            {
                new Member {Name = "John Doe", Id = 1, Nationality = "Finland"},
                new Member {Name = "Jane Doe", Id = 2, Nationality = "Sweden"}
            };
            modelBuilder.Entity<Member>()
                .HasData(members);
        }
    }
}
