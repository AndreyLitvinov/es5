using react.api.Models.IdentityModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.LibraryModels
{
    public class Reader : BaseModel
    {
        public string FirstName { get; set; }
        
        [BindNever]
        public AppUser User { get; set; }
    }
}
