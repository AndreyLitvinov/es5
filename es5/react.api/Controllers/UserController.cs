using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.api.Models.LibraryModels;
using react.api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using react.api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace react.api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService userService;
        private AppSettings appSettings;
        private IMapper mapper;

        public UserController(IUserService userService, IOptions<AppSettings> appSettings)
        {
            this.userService = userService;
            this.appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<UserViewModel>> Authenticate([FromBody]UserLoginModel login)
        {
            var user = await userService.AuthenticateAsync(login.Username, login.Password);
            if(user ==  null)
                return BadRequest("Логин или пароль неверный!");

            var tokenHandler = new JwtSecurityTokenHandler();
            
            var key = Encoding.ASCII.GetBytes(appSettings.Key);
            var claims = new List<Claim> 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                };

            claims.AddRange(user.UserRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole.Role?.Name)));
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                
                Expires = DateTime.UtcNow.AddMinutes(appSettings.ExpiresMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new UserViewModel{
                Id = user.Id,
                Token = tokenString,
                FirstName = user.Reader?.FirstName,
                Role = user.UserRoles?.FirstOrDefault()?.Role?.Name
            };
        }
    }
}