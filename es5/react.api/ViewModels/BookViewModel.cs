using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.ViewModels
{
    public class BookViewModel
    {
        public Int64 Id { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public string Annotation { get; set; }
        public int Count { get; set; }
        public Int64? GenreId { get; set; }
    }
}
