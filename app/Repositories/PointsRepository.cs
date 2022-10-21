using app.Models;
using AutoMapper.Execution;
using Microsoft.EntityFrameworkCore;

namespace app.Repositories
{
    public class PointsRepository
    {
        private readonly DatabaseContext _context;
        public PointsRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Point>> GetAll()
        {
            var locationMembers = await _context.Points
                .Include(lm => lm.Points)
                .Include(lm => lm.Location)
                .ToListAsync();

            return locationMembers;
        }

        public async Task<Point> GetById(int locationId, int memberId)
        {
            var locationMember = await _context.Points.FindAsync(locationId, memberId);
            return locationMember;
        }

        public async Task<Point> Create(Point locationMember)
        {
            _context.Points.Add(locationMember);
            await _context.SaveChangesAsync();
            return locationMember;
        }
        public async Task<Point> Update(int locationId, int memberId, Point locationMember)
        {
            _context.Entry(locationMember).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!LocationExists(locationId, memberId))
                {
                    return null;
                }
                else
                {
                    throw new Exception(ex.Message);
                }
            }
            return locationMember;
        }

        public async Task<Point> Remove(int locationId, int memberId)
        {
            var locationMember = await _context.Points.FindAsync(locationId, memberId);
            if (locationMember == null)
            {
                return null;
            }

            _context.Points.Remove(locationMember);
            await _context.SaveChangesAsync();

            return locationMember;
        }

        private bool LocationExists(int locationId, int memberId)
        {
            return _context.Points.Any(lm => lm.LocationId == locationId && lm.MemberId == memberId);
        }

        private bool LocationsExists()
        {
            return _context.Points.Count() != 0;
        }
    }
}

