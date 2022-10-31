using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using System.Security.Policy;

namespace app.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Member
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Nationality { get; set; }
        public string? FlagUrl { get; set; }
        public List<Point>? Points { get; set; }
        public int? TeamId { get; set; } = null!;
        public Team? Team { get; set; } = null!;
    }
}
