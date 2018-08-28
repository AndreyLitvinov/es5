using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.Models.IdentityModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Library.Models.DatabaseUpdators
{
    public class RoleUpdator : IDatabaseUpdator
    {
        public async Task Update(IServiceScope scope, AppDbContext context)
        {
            var services = scope.ServiceProvider;
            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            var rolesManager = services.GetRequiredService<RoleManager<AppRole>>();

            string adminEmail = "a.litvinov@qpdev.ru";
            string password = "BGTnhyMJU100";

            foreach (var role in DefaultRoles.AllRoles)
            {
                if (await rolesManager.FindByNameAsync(role) == null)
                {
                    await rolesManager.CreateAsync(new AppRole(role));
                }
            }
           
            if (await userManager.FindByNameAsync(adminEmail) == null)
            {
                var admin = new AppUser { Email = adminEmail, UserName = adminEmail };
                IdentityResult result = await userManager.CreateAsync(admin, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, DefaultRoles.Admin);
                }
            }
        }
    }
}
