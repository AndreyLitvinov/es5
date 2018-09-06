using Microsoft.AspNetCore.Identity;
using react.api.Models.LibraryModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.IdentityModels
{
    public class AppRole: BaseModel
    {
        public AppRole(){
        }

        public AppRole(string roleName){
            Name = roleName;
        }
        
        public string Name { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
