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
                .ToListAsync();

            return locations;
        }

        public async Task<Location> GetById(int id)
        {
            var location = await _context.Locations.FindAsync(id);
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
        public async Task<Location> Update(int id, Location location)
        {
            _context.Entry(location).State = EntityState.Modified;

            //foreach (var points in checkpoint.Points)
            //{
            //    await _context.AddAsync(points);
            //    var member = await _context.Members.FindAsync(points.MemberId);
            //    points.Member = member;
            //    var location = await _context.Locations.FindAsync(points.LocationId);
            //    points.Location = location;
            //}

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!LocationExists(id))
                {
                    return null;
                }
                else
                {
                    throw new Exception(ex.Message);
                }
            }
            return location;
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

