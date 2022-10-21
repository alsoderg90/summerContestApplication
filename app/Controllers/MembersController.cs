﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app.Models;
using app.Extensions;
using app.Services;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly MemberService _memberService;

        public MembersController(MemberService memberService)
        {
            _memberService = memberService;
        }

        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<Member>> Index()
        {
            var members = await _memberService.GetAll();
            if (members == null) return NotFound();
            return Ok(members);
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(int id)
        {
            var member = await _memberService.GetById(id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // PUT: api/Members/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Member>> PutMember(int id, Member member)
        {
            if (id != member.Id)
            {
                return BadRequest();
            }

            var updatedMember = await _memberService.Update(id, member);
            if (updatedMember != null)
            {
                NotFound();
            }
            return Ok(updatedMember);
        }

        // POST: api/Members
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Member>> Create([FromBody] Member member)
        {
            if (ModelState.IsValid)
            {
                var createdMember = await _memberService.Create(member);
                return Ok(createdMember);
            }
            var errors = ModelState.GetErrors;
            return BadRequest(new { errors });
        }

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMember(int id)
        {
            var member = await _memberService.Delete(id);
            if (member == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
