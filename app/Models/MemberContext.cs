using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace app.Models
{
    public class MemberContext : DbContext
    {
        public MemberContext(DbContextOptions<MemberContext> options) : base(options)
        { 
        }

        public DbSet<Member> Members { get; set; } = null!;
    }
}
