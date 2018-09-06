using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.api.Models.LibraryModels;
using react.api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using react.api.ViewModels;
using System.Threading;

namespace react.api.Controllers
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
        public ActionResult<ListViewModel> Get()
        {
            Thread.Sleep(1000);
            var result =
               repoBook
                .GetAll()
                .Include(book => book.Genre)
                .Select(book => mapper.Map<Book, BookViewModel>(book))
                .ToList();  
            
            return new ListViewModel
            {
                Items = result,
                Count = result.Count
            };
        }

        // GET api/books
        [HttpGet]
        [Route("{page}/{pagesize}/{genreId}")]
        public ActionResult<ListViewModel> Get(int page, int pagesize, long genreId)
        {
            Thread.Sleep(1000);
            var result =
                repoBook
                .GetAll()
                .Include(book => book.Genre)
                .Where(book => book.Genre != null && book.Genre.Id == genreId || genreId == 0)
                .Select(book => mapper.Map<Book, BookViewModel>(book))
                .ToList();
            var pageResult = result
                .Skip((page - 1) * pagesize)
                .Take(pagesize)
                .ToList();

            return new ListViewModel
            {
                Items = pageResult,
                Count = result.Count
            };
        }
    }
}