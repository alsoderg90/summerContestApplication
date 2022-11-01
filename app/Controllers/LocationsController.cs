using Microsoft.AspNetCore.Mvc;
using app.Models;
using app.Extensions;
using app.Services;
using Microsoft.AspNetCore.Authorization;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly LocationService _locationService;
        public LocationsController(LocationService locationService)
        {
            _locationService = locationService;
        }

        // GET: api/Checkpoints
        [HttpGet]
        public async Task<ActionResult<List<Location>>> GetCheckpoints()
        {
            var locations = await _locationService.GetAll();
            //List<LocationDto> locationsDto = Mapper.Map<List<Location>, List<LocationDto>>(locations);
            if (locations == null) return NotFound();
            return Ok(locations);
        }

        // GET: api/Checkpoints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetCheckpoint(int id)
        {
            var location = await _locationService.GetById(id);

            if (location == null)
            {
                return NotFound();
            }

            return Ok(location);
        }

        // PUT: api/Checkpoints/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCheckpoint(int id, Location location)
        {
            var aa = await _locationService.GetById(id);
            if (aa == null)
            {
                return BadRequest();
            }

            var updatedLocation = await _locationService.Update(id, location);
            if (updatedLocation != null)
            {
                NotFound();
            }
            return Ok(updatedLocation);
        }

        // POST: api/Checkpoints
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Location>> Create([FromBody] Location location)
        {
            // TODO: CHECK
            if (ModelState.IsValid)
            {
                if (location.Points != null)
                {
                    var createdLocation = await _locationService.Create(location);
                    return Ok(createdLocation);
                }
            }

            var errors = ModelState.GetErrors;
            return BadRequest(new { errors });
        }

        // DELETE: api/Checkpoints/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteCheckpoint(int id)
        {
            var location = await _locationService.Delete(id);
            if (location == null)
            {
                return NotFound();
            }

            return Ok(location.Id);
        }
    }
}
