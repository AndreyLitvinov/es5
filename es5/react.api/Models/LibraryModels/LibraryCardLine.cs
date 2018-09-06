using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.LibraryModels
{
    // создаем основу для этой штуки из сессии? или просто отдельный статус? не понятно пока, статусом наверное будет не красиво!
    // нужно отдельно наверное, да
    public class LibraryCardLine : BaseModel
    {
        //[BindNever]
        //public int LibraryCardLineID { get; set; }

        [BindNever]
        public LibraryCard Card { get; set; }

        [BindNever]
        public Book Book { get; set; }
        
        public int Count { get; set; }

        public LibraryCartLineStatus Status { get; set; }
    }


}
