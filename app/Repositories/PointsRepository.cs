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
            var points = await _context.Points
                .Include(p => p.Member)
                .Include(p => p.Location)
                .ToListAsync();

            return points;
        }

        public async Task<Point> GetById(int locationId, int memberId)
        {
            var point = await _context.Points.FindAsync(locationId, memberId);
            return point;
        }

        public async Task<Point> Create(Point point)
        {
            _context.Points.Add(point);
            await _context.SaveChangesAsync();
            return point;
        }
        public async Task<Point> Update(int locationId, int memberId, Point point)
        {
            _context.Entry(point).State = EntityState.Modified;

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
            return point;
        }

        public async Task<Point> Remove(int locationId, int memberId)
        {
            var point = await _context.Points.FindAsync(locationId, memberId);
            if (point == null)
            {
                return null;
            }

            _context.Points.Remove(point);
            await _context.SaveChangesAsync();

            return point;
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

