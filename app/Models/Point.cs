using Microsoft.CodeAnalysis;

namespace app.Models
{
    public class Point
    {   
        public int? LocationId { get; set; }
        public Location? Location { get; set; }
        public int? MemberId { get; set; }
        public Member? Member { get; set; }
        public int Points { get; set; }
    }
}
