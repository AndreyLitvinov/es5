using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.LibraryModels
{
    public class Book : BaseModel
    {
        public string Name { get; set; }
        public int Year { get; set; }
        public string Annotation { get; set; }
        public int Count { get; set; }
        public Genre Genre { get; set; }
    }
}
