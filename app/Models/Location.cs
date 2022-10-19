namespace app.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string? Lat { get; set; }
        public string? Lon { get; set; }
        public string? Address { get; set; }
        public string? Title { get; set; }
        public List<LocationMember>? Points {get; set; }
    }
}
