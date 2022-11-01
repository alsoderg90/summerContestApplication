using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Repositories
{
    public class UserRepository
    {
        private readonly DatabaseContext _context;
        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }
        public async Task<List<User>> GetAll()
        {
            var users = await _context.Users
                    .ToListAsync();

            return users;
        }

        public async Task<User> GetByEmail(string email)
        {
            var users = await _context.Users.ToListAsync();
            var user = users.FirstOrDefault(x => x.Email == email);
            if (user == null) return null;
            return user;
        }
    }
}
