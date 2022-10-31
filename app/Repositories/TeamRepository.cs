using app.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace app.Repositories
{
    public class TeamRepository
    {
        private readonly DatabaseContext _context;
        public TeamRepository(DatabaseContext context)
        {
            _context = context;
        }
        public async Task<List<Team>> GetAll()
        {
            var members = await _context.Teams
                    .Include(t => t.Members)
                    .ThenInclude(t => t.Points)
                    .ToListAsync();

            return members;
        }

        public async Task<Team> GetById(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            return team;
        }

        public async Task<Team> Create(Team team)
        {
            foreach(var member in team.Members)
            {
                _context.Attach(member);
            }
            _context.Teams.Add(team);
            await _context.SaveChangesAsync();
            return team;
        }

        public async Task<Team> Update(int id, Team team)
        {
            _context.Entry(team).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!TeamExists(id))
                {
                    return null;
                }
                else
                {
                    throw new Exception(ex.Message);
                }
            }
            return team;
        }

        public async Task<Team> Remove(int id)
        {
            var team = await _context.Teams
                .Include(t => t.Members)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (team == null)
            {
                return null;
            }

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();

            return team;
        }

        private bool TeamExists(int id)
        {
            return _context.Teams.Any(e => e.Id == id);
        }

        private bool TeamssExists()
        {
            return _context.Teams.Count() != 0;
        }
    }
}
