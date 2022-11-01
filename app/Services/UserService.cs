using app.Repositories;
using app.Models;

namespace app.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);
            if (user == null) return null;
            return user.Result;
        }
    }
}

