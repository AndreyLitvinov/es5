using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.ViewModels
{
    public class BasketLineViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int Count { get; set; }
        
        public int MaxCount { get; set; }
    }
}
