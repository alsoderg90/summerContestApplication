using app.Repositories;
using app.Models;

namespace app.Services
{
    public class TeamService
    {
        private readonly TeamRepository _teamRepository;

        public TeamService(TeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        public async Task<List<Team>> GetAll()
        {
            return await _teamRepository.GetAll();
        }

        public async Task<Team> GetById(int id)
        {
            return await _teamRepository.GetById(id);
        }

        public async Task<Team> Create(Team team)
        {
            return await _teamRepository.Create(team);
        }

        public async Task<Team> Update(int id, Team team)
        {
            return await _teamRepository.Update(id, team);
        }

        public async Task<Team> Delete(int id)
        {
            return await _teamRepository.Remove(id);
        }
    }
}
