

using app.Models;

namespace app.Data
{
    public class LocationDto
    {
        public LocationDto(int id, string lat, string lon, string address, string title)
        {
            Id = id;
            Lat = lat;
            Lon = lon;
            Address = address;
            Title = title;
        }

        public int Id { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public string Address { get; set; }
        public string Title { get; set; }
        //public List<LocationMember>? Points { get; set; }
    }
}