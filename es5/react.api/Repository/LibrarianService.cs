using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using react.api.Models;
using react.api.Models.LibraryModels;

namespace react.api.Repository
{
    public class LibrarianService: ILibrarianService
    {
        private readonly AppDbContext context;
        private IUserService userService;

        public LibrarianService(AppDbContext context,
        IUserService userService){

            this.context = context;
            this.userService = userService;
        }

        public async Task RemoveLine(long lineId){
            
           var removeLine =  context.LibraryCardLines
                                            .Include(lineItem => lineItem.Book)
                                            
                                            .FirstOrDefault(lineItem => lineItem.Id == lineId && lineItem.Status == LibraryCartLineStatus.BookOnOrder);            
            if(removeLine != null){
                context.LibraryCardLines.Remove(removeLine);
                await context.SaveChangesAsync();        
            }else{
                throw new ArgumentException($"Не найдена строка заказа с идентификатором - ${lineId}");
            }
        }

        public async Task UpdateCount(long lineId, int count)
        {
            var updateLine =  context.LibraryCardLines
                                            .Include(lineItem => lineItem.Book)
                                            
                                            .FirstOrDefault(lineItem => lineItem.Id == lineId && lineItem.Status == LibraryCartLineStatus.BookOnOrder);            
            if(updateLine != null){
                updateLine.Count = count;
                await context.SaveChangesAsync();        
            }else{
                throw new ArgumentException($"Не найдена строка заказа с идентификатором - ${lineId}");
            }
        }

        public IQueryable<Reader> GetOrders()
        {
            return context
            .LibraryCards

            .Include(card => card.Books)
            .Include(card => card.Reader)
            
            .Where(card => card.Books
                            .Any(bookLine => bookLine.Status == LibraryCartLineStatus.BookOnOrder))
            .Select(card => card.Reader);
        }

        public async Task GiveLine(long lineId)
        {
            var lineForUpdate = await context.LibraryCardLines.FirstOrDefaultAsync(line => line.Id == lineId);
            if(lineForUpdate != null && lineForUpdate.Status == LibraryCartLineStatus.BookOnOrder)
            {
                lineForUpdate.Status = LibraryCartLineStatus.BookOnHand;
                await context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"Не найдена строка корзины с идентификатором - ${lineId}");
            }
        }

        public async Task GiveAllLines(long userId)
        {
            var user = await userService.GetUserAsync(userId);

            var reader = await context.Readers
                .Include(readerItem => readerItem.User)
                .Include(readerItem => readerItem.Cards)
                    .ThenInclude(cardItem => cardItem.Books)
                .FirstOrDefaultAsync(readerItem => readerItem.User != null && readerItem.User.Id == userId);

            foreach(var line in reader
                                    .Cards
                                    .SelectMany(card => card.Books.Where(line => line.Status == LibraryCartLineStatus.BookOnOrder)))
            {
                line.Status = LibraryCartLineStatus.BookOnHand;
            }

            await context.SaveChangesAsync();
        }

        public async Task<List<LibraryCardLine>> GetOrder(long userId)
        {
            var user = await userService.GetUserAsync(userId);

            var reader = await context.Readers
                .Include(readerItem => readerItem.User)
                .Include(readerItem => readerItem.Cards)
                    .ThenInclude(cardItem => cardItem.Books)
                    .ThenInclude(lineItem => lineItem.Book)
                .FirstOrDefaultAsync(readerItem => readerItem.User != null && readerItem.User.Id == userId);

                return reader
                    .Cards
                    .SelectMany(card => card.Books.Where(line => line.Status == LibraryCartLineStatus.BookOnOrder))
                    .ToList();
        }
    }
}
