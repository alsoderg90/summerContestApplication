using app.Models;
using AutoMapper.Execution;
using Microsoft.EntityFrameworkCore;

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
            var existingTeam = _context.Teams
                    .Where(t => t.Id == id)
                    .Include(t => t.Members)
                    .Single();

            if (existingTeam != null)
            {
                _context.Entry(existingTeam).CurrentValues.SetValues(team);

                foreach (var existingChild in existingTeam.Members.ToList())
                {
                    if (!team.Members.Any(m => m.Id == existingChild.Id))
                        existingChild.Team = null;
                        existingChild.TeamId = null;
                        _context.Update(existingChild);
                }

                foreach (var child in team.Members)
                {
                    child.TeamId = id;
                    child.Team = team;
                    var existingMember = _context.Members
                        .Where(m => m.Id == child.Id)
                        .Include(m => m.Points)
                        .Single();
                    _context.Update(existingMember);
                    _context.Entry(existingMember).CurrentValues.SetValues(child);
                }
                _context.SaveChanges();
            }
            return existingTeam;
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
