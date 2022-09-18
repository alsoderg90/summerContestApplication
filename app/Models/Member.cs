using System;
using System.Collections.Generic;

namespace app.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Nationality { get; set; }
        public string? FlagUrl { get; set; }
    }
}
