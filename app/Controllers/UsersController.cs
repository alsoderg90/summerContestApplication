using Microsoft.AspNetCore.Mvc;
using app.Models;
using app.Services;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //private readonly DatabaseContext _context;
        private readonly UserService _userService;
        private readonly AuthService _authService;
        public UsersController(UserService userService, AuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<string>> Login(User user)
        {
            var a = _userService.GetByEmail(user.Email);
            if (a == null)
            {
                return BadRequest("Wrong credentials");
            }
            var token = _authService.Authenticate(user.Password, a.Password, user.Email);
            if(token == null)
            {
                return BadRequest("Wrong credentials");
            }
            return Ok(token);
        }
    }
}
