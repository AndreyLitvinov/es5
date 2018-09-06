using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.api.Models.IdentityModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using react.api.Models;
using react.api.Repository;

namespace react.api.DatabaseUpdators
{
    public class RoleUpdator : IDatabaseUpdator
    {
        public async Task Update(IServiceScope scope, AppDbContext context)
        {
            var services = scope.ServiceProvider;
            var userManager = services.GetRequiredService<IUserRepository>();
            var rolesManager = services.GetRequiredService<IRoleRepository>();

            string username = "admin";
            string password = "BGTnhyMJU100";

            foreach (var role in DefaultRoles.AllRoles)
            {
                if (await rolesManager.FindByNameAsync(role) == null)
                {
                    await rolesManager.CreateAsync(new AppRole(role));
                }
            }
           
            if (await userManager.FindByUsernameAsync(username) == null)
            {
                var admin = new AppUser { Username = username };

                var user = await userManager.CreateAsync(admin, password);
                if (user != null)
                {
                    await userManager.AddToRoleAsync(admin, DefaultRoles.Admin);
                }
            }
        }
    }
}
