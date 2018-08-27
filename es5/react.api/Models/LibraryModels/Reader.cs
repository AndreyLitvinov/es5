using Library.Models.IdentityModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.Models.LibraryModels
{
    public class Reader : BaseModel
    {
        //[BindNever]
        //public int ReaderID { get; set; }

        [BindNever]
        public AppUser User { get; set; }
    }
}
