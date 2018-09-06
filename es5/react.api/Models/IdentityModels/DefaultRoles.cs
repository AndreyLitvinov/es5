using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.IdentityModels
{
    public static class DefaultRoles
    {
        public const string Librarian = "Librarian";
        public const string User = "User";
        public const string Stockman = "Stockman";
        public const string Admin = "Admin";

        public static string[] AllRoles => new string[] { Librarian, User, Stockman, Admin };
    }
}
