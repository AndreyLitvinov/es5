using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.api.Models.LibraryModels;

namespace react.api.Repository
{
    public interface ILibrarianService
    {

        IQueryable GetOrders();

        Task RemoveLine(long lineId);

        Task UpdateCount(long lineId, int count);

        Task GiveLine(long lineId);
        
        Task GiveAllLines(long userId);

    }
}
