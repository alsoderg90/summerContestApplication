using app.Models;

namespace app.Data
{
    public class MemberDto
    {

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Nationality { get; set; }
        public string? FlagUrl { get; set; }

        public static MemberDto FromMember(Member member)
        {
            return new MemberDto()
            {
                Id = member.Id,
                Name = member.Name,
                Nationality = member.Nationality,
                FlagUrl = member.FlagUrl,
            };
        }
    }
}
