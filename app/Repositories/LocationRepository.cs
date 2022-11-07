using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Repositories
{
    public class LocationRepository
    {
        private readonly DatabaseContext _context;
        public LocationRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Location>> GetAll()
        {
            var locations = await _context.Locations
                .Include(l => l.Points)
                .ThenInclude(p => p.Member)
                .ThenInclude(m => m.Team)
                .ToListAsync();

            return locations;
        }

        public async Task<Location> GetById(int id)
        {
            var location = await _context.Locations
                .FindAsync(id);
            return location;
        }

        public async Task<Location> Create(Location location)
        {
            foreach (var points in location.Points)
            {
                var member = await _context.Members.FindAsync(points.MemberId);
                _context.Attach(member);

            }
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();
            return location;
        }
        /// https://stackoverflow.com/questions/27176014/how-to-add-update-child-entities-when-updating-a-parent-entity-in-ef
        public async Task<Location> Update(int id, Location location)
        {
            var existingLocation = _context.Locations
                .Where(l => l.Id == id)
                .Include(l => l.Points)
                .ThenInclude(p => p.Member)
                .SingleOrDefault();

            if (existingLocation != null)
            {
                _context.Entry(existingLocation).CurrentValues.SetValues(location);

                foreach (var existingChild in existingLocation.Points.ToList())
                {
                    if (!location.Points.Any(p => p.LocationId == existingChild.LocationId && p.MemberId == existingChild.MemberId))
                        _context.Points.Remove(existingChild);
                }

                foreach (var child in location.Points)
                {
                    var existingChild = existingLocation.Points
                        .Where(p => p.LocationId == child.LocationId && p.MemberId == child.MemberId && p.LocationId != default(int))
                        .SingleOrDefault();
                    
                    if (existingChild != null)
                    {
                        _context.Entry(existingChild).CurrentValues.SetValues(child);
                    }
                    else
                    {
                        var member = _context.Members.Where(m => m.Id == child.MemberId).SingleOrDefault();
                        var newChild = new Point
                        {
                            Location = location,
                            LocationId = child.LocationId,
                            Member = member,
                            MemberId = child.MemberId,
                            Points = child.Points
                        };
                        existingLocation.Points.Add(newChild);
                    }
                }
                _context.SaveChanges();
            }
            return existingLocation;
        }

        public async Task<Location> Remove(int id)
        {
            var checkpoint = await _context.Locations
                .Include(l => l.Points)
                .FirstOrDefaultAsync(l => l.Id == id);
            if (checkpoint == null)
            {
                return null;
            }

            _context.Locations.Remove(checkpoint);
            await _context.SaveChangesAsync();

            return checkpoint;
        }

        private bool LocationExists(int id)
        {
            return _context.Locations.Any(e => e.Id == id);
        }

        private bool LocationsExists()
        {
            return _context.Locations.Count() != 0;
        }
    }
}

