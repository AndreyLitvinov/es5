using react.api.Models.LibraryModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.IdentityModels
{
    public class AppUser: BaseModel
    {
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }
        public Reader Reader { get; set; }
    }
}
