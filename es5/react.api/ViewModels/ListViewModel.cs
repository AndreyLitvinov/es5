using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.ViewModels
{
    public class ListViewModel
    {
        public IEnumerable<BaseViewModel> Items { get; set; }
        public int Count { get; set; }
    }
}
