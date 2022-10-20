using app.Models;

namespace app.Data
{
    public class LocationMemberDto
    {
        public int Id { get; set; }
        public int? LocationId { get; set; }
        public int? MemberId { get; set; }
        public MemberDto? Member { get; set; }
        public int Points { get; set; }
    }
}
