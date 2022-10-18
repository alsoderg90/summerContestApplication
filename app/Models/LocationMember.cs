using Microsoft.CodeAnalysis;

namespace app.Models
{
    public class LocationMember
    {   
        public int Id { get; set; }
        public int LocationId { get; set; }
        public Checkpoint? Location { get; set; }
        public int MemberId { get; set; }
        public Member? Member { get; set; }
        public int Points { get; set; }
    }
}
