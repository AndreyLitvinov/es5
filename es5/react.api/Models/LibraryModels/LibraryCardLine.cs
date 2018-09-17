using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.LibraryModels
{
    public class LibraryCardLine : BaseModel
    {
        [BindNever]
        public LibraryCard Card { get; set; }

        [BindNever]
        public Book Book { get; set; }
        
        public int Count { get; set; }

        public LibraryCartLineStatus Status { get; set; }
    }


}
