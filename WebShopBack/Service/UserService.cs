using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Interfaces;
using Data.Models;

namespace Service
{
    public class UserService : IUserService
    {
        private User _admin = new User
        {
            Username = "admin",
            Password = "admin",
            IsAdmin = true
        };
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task<bool> AddUser(User user)
        {
            try
            {
                if (UserExists(user.Username)) return false; // Korisinik vec postoji pa vracamo false
                _context.Add(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private bool UserExists(string username)
        {
            return _context.Users.Any(user => user.Username == username);
        }

        public IEnumerable<User> GetUser(int userId)
        {
            throw new NotImplementedException();
        }

        public User Login(string username, string password)
        {
            throw new NotImplementedException();
        }

        public bool UpdateUser(int userId, User user)
        {
            throw new NotImplementedException();
        }
    }
}