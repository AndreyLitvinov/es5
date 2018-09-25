using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.ViewModels
{
    public class OrderViewModel: BaseViewModel
    {
        public long UserId { get; set; }
        public string Title { get; set; }
    }
}
