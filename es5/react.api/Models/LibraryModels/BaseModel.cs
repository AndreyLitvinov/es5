using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.Models.LibraryModels
{
    public class BaseModel
    {
        [BindNever]
        public Int64 Id { get; set; }
    }
}
