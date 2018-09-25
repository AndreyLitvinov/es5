using System;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using react.api.Models;
using react.api.Models.IdentityModels;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace react.api.Repository
{
    public class UserService : IUserService
    {
        private readonly AppDbContext context;
        private readonly IRoleRepository roleService;

        private readonly IHttpContextAccessor httpContext;
        string errorMessage = string.Empty;

        public long CurrentUserId => Int64.Parse(httpContext.HttpContext.User?.FindFirst(ClaimTypes.Name)?.Value);

        public UserService(AppDbContext context, IRoleRepository roleService, IHttpContextAccessor httpContext)
        {
            this.context = context;
            this.roleService = roleService;
            this.httpContext = httpContext;
        }
        public async Task<AppUser> AuthenticateAsync(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = await context.Users
                .Include(x => x.Reader)
                .Include(x => x.UserRoles)
                    .ThenInclude(x => x.Role)
                .SingleOrDefaultAsync(x => x.Username == username);

            // существует ли пользователь с таким именем
            if (user == null)
                return null;

            // проверяем пароль пользователя
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // если все хорошо, вернем пользователя
            return user;
        }

        public async Task<AppUser> CreateAsync(AppUser user, string password)
        {
            // проверяем пароль
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            // находим пользователя
            if (context.Users.Any(x => x.Username == user.Username))
                throw new Exception("Username '" + user.Username + "' is already taken");

            byte[] passwordHash, passwordSalt;
            // создаем хеш пароля
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            context.Users.Add(user);    
            await context.SaveChangesAsync();

            return user;
        }

        public Task DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateAsync(AppUser user, string password = null)
        {
            throw new System.NotImplementedException();
        }

        public Task<AppUser> FindByUsernameAsync(string username)
        {
            // находим пользователя
            return context.Users.SingleOrDefaultAsync(x => x.Username == username);
        }

        public async Task AddToRoleAsync(AppUser user, string role)
        {
            var appRole = await roleService.FindByNameAsync(role);
            var userRole = new AppUserRole{
                RoleId = appRole.Id,
                UserId = user.Id
            };

            await context.AppUserRoles.AddAsync(userRole);
            await context.SaveChangesAsync();
        }
        
        public Task<AppUser> GetCurrentUserAsync()
        {
            return context.Users
                .Include(user => user.Reader)
                //.ThenInclude(reader => reader)
                .FirstOrDefaultAsync(user => user.Id == CurrentUserId);
        }

        public AppUser GetCurrentUser()
        {
            return context.Users
                .Include(user => user.Reader)
                //.ThenInclude(reader => reader)
                .FirstOrDefault(user => user.Id == CurrentUserId);
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public Task<AppUser> GetUserAsync(long userId)
        {
            return context.Users
                .Include(user => user.Reader)
                //.ThenInclude(reader => reader)
                .FirstOrDefaultAsync(user => user.Id == userId);
        }
    }
}