using Microsoft.AspNetCore.Mvc;
using app.Models;
using app.Services;
using app.Extensions;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointsController : ControllerBase
    {
        private readonly PointService _pointService;

        public PointsController(PointService locationMemberService)
        {
            _pointService = locationMemberService;
        }

        // GET: api/LocationMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Point>>> GetLocationMembers()
        {
            var locationsMembers = await _pointService.GetAll();
            //List<LocationDto> locationsDto = Mapper.Map<List<Location>, List<LocationDto>>(locations);
            if (locationsMembers == null) return NotFound();
            return Ok(locationsMembers);
        }

        // GET: api/LocationMembers/5/5
        [HttpGet("{LocationId}/MemberId")]
        public async Task<ActionResult<Point>> GetLocationMember(int LocationId, int MemberId)
        {
            var locationMember = await _pointService.GetById(LocationId, MemberId);

            if (locationMember == null)
            {
                return NotFound();
            }

            return locationMember;
        }

        // PUT: api/LocationMembers/5/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{LocationId}/MemberId")]
        public async Task<IActionResult> PutLocationMember(int LocationId, int MemberId, Point locationMember)
        {
            if (LocationId != locationMember.LocationId || MemberId != locationMember.MemberId)
            {
                return BadRequest();
            }

            var updatedLocation = await _pointService.Update(LocationId, MemberId, locationMember);
            if (updatedLocation != null)
            {
                NotFound();
            }
            return Ok(updatedLocation);
        }

        // POST: api/LocationMembers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Point>> PostLocationMember(Point locationMember)
        {
            // TODO: CHECK
            if (ModelState.IsValid)
            {
                if (locationMember.Points != null)
                {
                    var createdLocation = await _pointService.Create(locationMember);
                    return Ok(createdLocation);
                }
            }

            var errors = ModelState.GetErrors;
            return BadRequest(new { errors });
        }

        // DELETE: api/LocationMembers/5/5
        [HttpPut("{LocationId}/MemberId")]
        public async Task<IActionResult> DeleteLocationMember(int LocationId, int MemberId)
        {
            var checkpoint = await _pointService.Delete(LocationId, MemberId);
            if (checkpoint == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
