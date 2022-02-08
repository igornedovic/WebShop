using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Helpers;
using Data.Entities;
using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{

    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly AppSettings  _appSettings;
        public UserController(IUserService userService, AppSettings appSettings)
        {
            _userService = userService;
            _appSettings = appSettings;
        }

        [HttpGet]
        public string Get()
        {
            return "Odobren pristup";
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            if (await _userService.AddUser(user)) return Ok(user);
            return NotFound();
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(AuthenticationRequest request)
        {
            var user = await _userService.Login(request.Username, request.Password);

            if (user == null) return Unauthorized("Invalid credentials");

            var tokenString = CreateToken(user);
            AuthenticationResponse response = CreateResponse(tokenString, user);
            return Ok(response);
        }

        private string CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

        private AuthenticationResponse CreateResponse(string tokenString, User user)
        {
            AuthenticationResponse response = new AuthenticationResponse();
            response.Email = user.Email;
            response.Id = user.UserId;
            response.Token = tokenString;
            response.Username = user.Username;
            response.Password = user.Password;
            response.IsAdmin = user.IsAdmin;
            response.FirstName = user.FirstName;
            response.LastName = user.LastName;
            response.Phone = user.Phone;
            response.Image = user.Image;
            return response;
        }
    }
}