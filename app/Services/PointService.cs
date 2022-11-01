using app.Models;
using app.Repositories;

namespace app.Services
{
    public class PointService
    {
        private readonly PointsRepository _pointRepository;

        public PointService(PointsRepository locationMemberRepository) 
        {
            _pointRepository = locationMemberRepository;
        }

        public async Task<List<Point>> GetAll()
        {
           return await _pointRepository.GetAll();
        }

        public async Task<Point> GetById(int locationId, int memberId)
        {
            return await _pointRepository.GetById(locationId, memberId);
        }
         
        public async Task<Point> Create(Point point)
        {
            return await _pointRepository.Create(point);
        }

        public async Task<Point> Delete(int locationId, int memberId)
        {
            return await _pointRepository.Remove(locationId, memberId);
        }

        public async Task<Point> Update(int locationId, int memberId, Point point)
        {
            return await _pointRepository.Update(locationId, memberId, point);
        }
    }

    


}
