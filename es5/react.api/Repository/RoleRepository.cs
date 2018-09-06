using System;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using react.api.Models;
using react.api.Models.IdentityModels;
using System.Text;
using System.Threading.Tasks;

namespace react.api.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext context;
        string errorMessage = string.Empty;

        public RoleRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task<AppRole> CreateAsync(AppRole role)
        {
            // находим пользователя
            if (context.Roles.Any(x => x.Name == role.Name))
                throw new Exception("Role '" + role.Name + "' is already taken");

            context.Roles.Add(role);    
            await context.SaveChangesAsync();

            return role;
        }

        public Task DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateAsync(AppRole user)
        {
            throw new NotImplementedException();
        }

        public Task<AppRole> FindByNameAsync(string name)
        {
            // находим пользователя
            return context.Roles.SingleOrDefaultAsync(x => x.Name == name);
        }
    }
}