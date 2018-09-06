using react.api.Models.LibraryModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.IdentityModels
{
    public class AppUserRole
    {
        public long UserId { get; set; }
        public AppUser User { get; set; }
        public long RoleId { get; set; }
        public AppRole Role { get; set; }
    }
}
