

using app.Models;

namespace app.Data
{
    public class LocationDto
    {
        public int Id { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public string Address { get; set; }
        public string Title { get; set; }
        public List<LocationMemberDto>? Points { get; set; }
    }
}