using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.api.Models.LibraryModels;

namespace react.api.Repository
{
    public interface IBasketService
    {

        Task AddItem(Book book, int quantity);

        Task RemoveLine(long lineId);

        Task UpdateCount(long lineId, int count);

        Task Clear();

        Task Order();

        IEnumerable<LibraryCardLine> Lines{ get; }
    }
}
