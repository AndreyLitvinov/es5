using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace react.Models.LibraryModels
{
    public class Genre : BaseModel
    {
        public string Name { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}
