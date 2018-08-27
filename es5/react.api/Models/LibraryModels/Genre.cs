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
        //[BindNever]
        //public int GenreID { get; set; }

        [Required(ErrorMessage = "Please enter a name genre")]
        public string Name { get; set; }

        [BindNever]
        public ICollection<Book> Books { get; set; }
    }
}
