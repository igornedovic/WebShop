using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;

namespace Data.Interfaces
{
    public interface IUserService
    {
        User GetUser(int userId);
        Task<User> Login(string username, string password);
        Task<bool> AddUser(User user);
        bool UpdateUser(int userId, User user);
    }
}