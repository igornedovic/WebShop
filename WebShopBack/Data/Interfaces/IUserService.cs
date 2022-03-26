using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;

namespace Data.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUser(int userId);
        Task<User> Login(string username, string password);
        Task<bool> AddUser(User user);
        Task<bool> UpdateUser(int userId, User user);
    }
}