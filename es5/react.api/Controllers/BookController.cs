using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.Models.LibraryModels;
using react.Models.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using react.api.ViewModels;
using System.Threading;

namespace react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IRepository<Book> repoBook;
        private IMapper mapper;

        public BooksController(IRepository<Book> repos, IMapper mapper)
        {
            repoBook = repos;
            this.mapper = mapper;
        }

        // GET api/books
        [HttpGet]
        public ActionResult<IEnumerable<BookViewModel>> Get()
        {
            Thread.Sleep(1000);
            return repoBook
                .GetAll()
                .Include(book => book.Genre)
                .Select(book => mapper.Map<Book, BookViewModel>(book))
                .ToList();
        }

        // GET api/books
        [HttpGet]
        // books/page/sizepage/genreid/
        [Route("api/books/page/pagesize/genreId")]
        public ActionResult<IEnumerable<BookViewModel>> Get(int page, int pagesize, long genreId)
        {
            Thread.Sleep(1000);
            return repoBook
                .GetAll()
                .Include(book => book.Genre)
                .Where(book => book.Genre != null && book.Genre.Id == genreId)
                .Skip(page * pagesize)
                .Take(pagesize)
                .Select(book => mapper.Map<Book, BookViewModel>(book))
                .ToList();
        }
    }
}