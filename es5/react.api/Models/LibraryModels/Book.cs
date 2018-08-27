using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace react.Models.LibraryModels
{
    public class Book : BaseModel
    {
        //[BindNever]
        //public int BookID { get; set; }

        [Required(ErrorMessage = "Please enter a name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter a Year")]
        [Range(1000, 3000,
            ErrorMessage = "Please enter a value from 1000 to 1000")]
        public int Year { get; set; }

        public string Annotation { get; set; }

        public int Count { get; set; }

        public Genre Genre { get; set; }

       /* [BindNever]
        public ICollection<LibraryCardLine> LibraryCardLines { get; set; }
        */
    }
}
