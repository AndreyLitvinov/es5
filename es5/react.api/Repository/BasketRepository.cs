using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using react.api.Models;
using react.api.Models.LibraryModels;

namespace react.api.Repository
{
    public class BasketRepository: IBasketRepository
    {
        private readonly AppDbContext context;
        private IUserService userService;

        public BasketRepository(AppDbContext context,
        IUserService userService){

            this.context = context;
            this.userService = userService;
        }

        public async Task AddItem(Book book, int quantity)
        {
            // получить читателя, если нет создать, создать для него карточку если нет и в карточку добавить запись
            var user = await userService.GetCurrentUserAsync();
            var reader = user.Reader;
            
            if(user.Reader == null)
            {
                reader = new Reader{User = user};
                context.Readers.Add(reader);
                
            }

            var cardReader = await context.LibraryCards
                                            .Include(card => card.Books)
                                            .Include(card => card.Reader)
                                            .FirstOrDefaultAsync(card => card.Reader != null && card.Reader.Id == reader.Id);

            if(cardReader == null) {
                cardReader = new LibraryCard{Reader = reader};
                context.LibraryCards.Add(cardReader);
            }

            var cardLine = cardReader.Books?.FirstOrDefault(cardBook => cardBook.Id == book.Id);
            if (cardLine == null)
            {
                context.LibraryCardLines.Add(new LibraryCardLine
                {
                    Book = book,
                    Card = cardReader,
                    Count = quantity,
                    Status = LibraryCartLineStatus.BookOnBasket
                });
            }
            else
            {
                cardLine.Count += quantity;
            }

            await context.SaveChangesAsync();
        }

        public async Task RemoveLine(long lineId){
            var user = await userService.GetCurrentUserAsync();
            var reader = user.Reader;
            var card =  context.LibraryCards
                                            .Include(cardItem => cardItem.Books)
                                                .ThenInclude(line => line.Book)
                                            .Include(cardItem => cardItem.Reader)
                                            .FirstOrDefault(cardItem => cardItem.Reader != null && cardItem.Reader.Id == reader.Id);

            var removeLine = card?.Books?.FirstOrDefault(line => line.Id == lineId);

            context.LibraryCardLines.Remove(removeLine);
            await context.SaveChangesAsync();
        }

        public async Task Clear(){
            var user = await userService.GetCurrentUserAsync();
            var reader = user.Reader;
            var card =  context.LibraryCards
                                            .Include(cardItem => cardItem.Books)
                                            .Include(cardItem => cardItem.Reader)
                                            .FirstOrDefault(cardItem => cardItem.Reader != null && cardItem.Reader.Id == reader.Id);
            context.LibraryCardLines.RemoveRange(card.Books);
            await context.SaveChangesAsync();
        }

        public async Task UpdateCount(long lineId, int count)
        {
            // todo: userService.GetCurrentUser(); можно бы вынести 
            var user = await userService.GetCurrentUserAsync();
            var reader = user.Reader;
            var card =  context.LibraryCards
                                            .Include(cardItem => cardItem.Books)
                                            .Include(cardItem => cardItem.Reader)
                                            .FirstOrDefault(cardItem => cardItem.Reader != null && cardItem.Reader.Id == reader.Id);
            
            var updateLine = card?.Books?.FirstOrDefault(line => line.Id == lineId);
            updateLine.Count = count;
            await context.SaveChangesAsync();        
        }

        public IEnumerable<LibraryCardLine> Lines { get {
            var user = userService.GetCurrentUser();
            var reader = user.Reader;
                                return context.LibraryCards
                                            .Include(card => card.Books)
                                                .ThenInclude(bookLine => bookLine.Book)
                                                .ThenInclude(book => book.Genre)
                                            .Include(card => card.Reader)
                                            .FirstOrDefault(card => card.Reader != null && card.Reader.Id == reader.Id)
                                            ?.Books
                                            .ToList();
            }
        }
    }
}
