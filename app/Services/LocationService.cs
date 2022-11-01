using app.Models;
using app.Repositories;

namespace app.Services
{
    public class LocationService
    {
        private readonly LocationRepository _locationRepository;

        public LocationService(LocationRepository locationRepository) 
        {
            _locationRepository = locationRepository;
        }

        public async Task<List<Location>> GetAll()
        {
           return await _locationRepository.GetAll();
        }

        public async Task<Location> GetById(int id)
        {
            return await _locationRepository.GetById(id);
        }
         
        public async Task<Location> Create(Location location)
        {
            return await _locationRepository.Create(location);
        }

        public async Task<Location> Delete(int id) 
        {
            return await _locationRepository.Remove(id);
        }

        public async Task<Location> Update(int id, Location location)
        {
            return await _locationRepository.Update(id, location);
        }
    }

    


}
