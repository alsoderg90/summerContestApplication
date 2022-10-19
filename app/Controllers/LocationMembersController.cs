using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app.Models;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationMembersController : ControllerBase
    {
        private readonly LocationMemberContext _context;

        public LocationMembersController(LocationMemberContext context)
        {
            _context = context;
        }

        // GET: api/LocationMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationMember>>> GetLocationMembers()
        {
            return await _context.LocationMembers.ToListAsync();
        }

        // GET: api/LocationMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationMember>> GetLocationMember(int id)
        {
            var locationMember = await _context.LocationMembers.FindAsync(id);

            if (locationMember == null)
            {
                return NotFound();
            }

            return locationMember;
        }

        // PUT: api/LocationMembers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocationMember(int id, LocationMember locationMember)
        {
            if (id != locationMember.Id)
            {
                return BadRequest();
            }

            _context.Entry(locationMember).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationMemberExists(id))
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

        // POST: api/LocationMembers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LocationMember>> PostLocationMember(LocationMember locationMember)
        {
            _context.LocationMembers.Add(locationMember);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocationMember", new { id = locationMember.Id }, locationMember);
        }

        // DELETE: api/LocationMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocationMember(int id)
        {
            var locationMember = await _context.LocationMembers.FindAsync(id);
            if (locationMember == null)
            {
                return NotFound();
            }

            _context.LocationMembers.Remove(locationMember);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocationMemberExists(int id)
        {
            return _context.LocationMembers.Any(e => e.Id == id);
        }
    }
}
