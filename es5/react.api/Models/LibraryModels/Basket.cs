using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.Models.LibraryModels
{
    public class Basket
    {
        private List<LibraryCardLine> lineCollection = new List<LibraryCardLine>();

        public virtual void AddItem(Book book, int quantity)
        {
            var line = lineCollection
                .Where(p => p.Book.Id == book.Id)
                .FirstOrDefault();

            if (line == null)
            {
                lineCollection.Add(new LibraryCardLine
                {
                    Book = book,
                    Count = quantity
                });
            }
            else
            {
                line.Count += quantity;
            }
        }

        public virtual void RemoveLine(Book book) =>
            lineCollection.RemoveAll(l => l.Book.Id == book.Id);

        public virtual void Clear() => lineCollection.Clear();

        public virtual IEnumerable<LibraryCardLine> Lines => lineCollection;
    }
}
