using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.api.Models.LibraryModels;

namespace react.api.Repository
{
    public interface IBasketRepository
    {

        Task AddItem(Book book, int quantity);

        Task RemoveLine(Book book);
        Task UpdateCount(Book book, int count);

        Task Clear();

        IEnumerable<LibraryCardLine> Lines{ get; }
    }
}
