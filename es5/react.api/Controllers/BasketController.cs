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
using Microsoft.AspNetCore.Authorization;

namespace react.api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "User, Admin, Librarian")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private IRepository<Book> repoBook;
        private IMapper mapper;
        private Basket basket;

        public BasketController(IRepository<Book> repos, Basket basketService, IMapper mapper)
        {
            repoBook = repos;
            this.mapper = mapper;
            basket = basketService;
        }

        // GET api/basket
        [HttpGet]
        public ActionResult<BasketViewModel> Get()
        {
            return mapper
                .Map<Basket, BasketViewModel>(basket);
        }

        // GET api/basket/addbooktocard/
        [HttpGet]
        [Route("Add/{bookid}")]
        public ActionResult<BasketViewModel> Add(long bookId)
        {
            var book = repoBook.Get(bookId);
            if (book != null)
            {
                basket.AddItem(book, 1);
            }

            return mapper
                .Map<Basket, BasketViewModel>(basket);
        }
    }
}