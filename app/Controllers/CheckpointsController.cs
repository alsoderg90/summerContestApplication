using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app.Models;
using app.Data;
using app.Extensions;
using ExpressMapper;
using ExpressMapper.Extensions;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckpointsController : ControllerBase
    {
        private readonly LocationContext _context;
        private readonly MemberContext _memberContext;
        private readonly LocationMemberContext _locationMemberContext;

        public CheckpointsController(LocationContext context, MemberContext memberContext, LocationMemberContext locationMemberContext)
        {
            _context = context;
            _memberContext = memberContext;
            _locationMemberContext = locationMemberContext;
        }

        // GET: api/Checkpoints
        [HttpGet]
        public async Task<ActionResult<List<LocationDto>>> GetCheckpoints()
        {
            var queryResult = await _context.Checkpoints
                .Include(b => b.Points)
                .ToListAsync();

            foreach(var qr in queryResult)
            {   if (qr.Points != null)
                foreach (var points in qr.Points)
                    {   
                        
                        Member member = await _memberContext.Members.FindAsync(points.MemberId);
                        points.Member = member;
                    };

            };
            List<LocationDto> locationDto = Mapper.Map<List<Location>, List<LocationDto>>(queryResult);

            return locationDto;
        }

        // GET: api/Checkpoints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetCheckpoint(int id)
        {
            var checkpoint = await _context.Checkpoints.FindAsync(id);

            if (checkpoint == null)
            {
                return NotFound();
            }

            return checkpoint;
        }

        // PUT: api/Checkpoints/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCheckpoint(int id, Location checkpoint)
        {
 
            if (id != checkpoint.Id)
            {
                return BadRequest();
            }

            _context.Entry(checkpoint).State = EntityState.Modified;  
            
            foreach(var points in checkpoint.Points)
            {
                await _locationMemberContext.AddAsync(points);
                var member = await _memberContext.Members.FindAsync(points.MemberId);
                points.Member = member;
                var location = await _context.Checkpoints.FindAsync(points.LocationId);
                points.Location = location;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CheckpointExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Checkpoints
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Location>> Create([FromBody] Location checkpoint)
        {
            if (ModelState.IsValid)
            {   
                if (checkpoint.Points != null)
                foreach (var points in checkpoint.Points)
                {
                    var member = await _memberContext.Members.FindAsync(points.MemberId);
                    _context.Attach(member);

                }
                _context.Checkpoints.Add(checkpoint);                
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCheckpoint", new { id = checkpoint.Id }, checkpoint);
            }
            var errors = ModelState.GetErrors;
            return BadRequest(new { errors });

        }

        // DELETE: api/Checkpoints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCheckpoint(int id)
        {
            var checkpoint = await _context.Checkpoints.FindAsync(id);
            if (checkpoint == null)
            {
                return NotFound();
            }

            _context.Checkpoints.Remove(checkpoint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CheckpointExists(int id)
        {
            return _context.Checkpoints.Any(e => e.Id == id);
        }

        private bool CheckpointsExists()
        {
            return _context.Checkpoints.Count() != 0;
        }
    }
}
