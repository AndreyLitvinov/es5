using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.api.Models.IdentityModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using react.api.Models;
using react.api.Repository;
using react.api.Models.LibraryModels;

namespace react.api.DatabaseUpdators
{
    public class RoleUpdator : IDatabaseUpdator
    {
        public async Task Update(IServiceScope scope, AppDbContext context)
        {
            var services = scope.ServiceProvider;
            var userManager = services.GetRequiredService<IUserService>();
            var rolesManager = services.GetRequiredService<IRoleRepository>();
            var readerService = services.GetRequiredService<IRepository<Reader>>();


            foreach (var role in DefaultRoles.AllRoles)
            {
                if (await rolesManager.FindByNameAsync(role) == null)
                {
                    await rolesManager.CreateAsync(new AppRole(role));
                }
            }

            string password = "BGTnhyMJU100";
            
            foreach (var role in DefaultRoles.AllRoles)
            {
                var username = role.ToLower();
                var user = await userManager.FindByUsernameAsync(username);
                if (user == null)
                {
                    var newUser = new AppUser { Username = username };
                    user = await userManager.CreateAsync(newUser, password);
                    if (user != null)
                    {
                        await userManager.AddToRoleAsync(user, role);
                    }
                }

                if(user.Reader ==  null)
                {
                    readerService.Insert(new Reader{User = user});
                }
            }
            
        }
    }
}
