using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.LibraryModels
{
    public class LibraryCard : BaseModel
    {
        [BindNever]
        public Reader Reader { get; set; }

        [BindNever]
        public ICollection<LibraryCardLine> Books { get; set; }
    }
}
