using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.Models.LibraryModels;
using react.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IRepository<Book> repoBook;

        public BooksController(IRepository<Book> repos)
        {
            repoBook = repos;
        }

        // GET api/books
        [HttpGet]
        public ActionResult<IEnumerable<Book>> Get()
        {
            return repoBook
                .GetAll()
                .ToList();
        }
    }
}