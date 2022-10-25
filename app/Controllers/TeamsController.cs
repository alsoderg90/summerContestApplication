using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app.Models;
using app.Services;
using AutoMapper.Execution;
using app.Extensions;
using System.Diagnostics.Metrics;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly TeamService _teamService;

        public TeamsController(TeamService teamService)
        {
            _teamService = teamService;
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeams()
        {
            var teams = await _teamService.GetAll();
            if (teams == null) return NotFound();
            return Ok(teams);
        }

        // GET: api/Teams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            var teams = await _teamService.GetById(id);

            if (teams == null)
            {
                return NotFound();
            }

            return Ok(teams);
        }

        // PUT: api/Teams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeam(int id, Team team)
        {
            if (id != team.Id)
            {
                return BadRequest();
            }

            var updatedTeam = await _teamService.Update(id, team);
            if (updatedTeam != null)
            {
                NotFound();
            }
            return Ok(updatedTeam);
        }

        // POST: api/Teams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Team>> PostTeam(Team team)
        {
            if (ModelState.IsValid)
            {
                var createdTeam = await _teamService.Create(team);
                return Ok(createdTeam);
            }
            var errors = ModelState.GetErrors;
            return BadRequest(new { errors });
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteTeam(int id)
        {
            var team = await _teamService.Delete(id);
            if (team == null)
            {
                return NotFound();
            }

            return Ok(team.Id);
        }
    }
}
