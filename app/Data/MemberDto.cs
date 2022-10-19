using app.Models;

namespace app.Data
{
    public class MemberDto
    {
        public class Member
        {
            public int Id { get; set; }
            public string? Name { get; set; }
            public string? Nationality { get; set; }
            public string? FlagUrl { get; set; }
        }
    }
}
