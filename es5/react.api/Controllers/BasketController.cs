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
        private IBasketRepository basketService;

        public BasketController(IRepository<Book> repos, IBasketRepository basketService, IMapper mapper)
        {
            repoBook = repos;
            this.mapper = mapper;
            this.basketService = basketService;
        }

        // GET api/basket
        [HttpGet]
        public ActionResult<BasketViewModel> Get()
        {
            return mapper
                .Map<IBasketRepository, BasketViewModel>(basketService);
        }

        // GET api/basket/addbooktocard/
        [HttpGet]
        [Route("Add/{bookid}")]
        public async Task<ActionResult<BasketViewModel>> Add(long bookId)
        {
            var book = repoBook.Get(bookId);
            if (book != null)
            {
                await basketService.AddItem(book, 1);
            }

            return mapper
                .Map<IBasketRepository, BasketViewModel>(basketService);
        }


        // GET api/basket/items
        [HttpGet]
        [Route("Items")]
        public ActionResult<List<BasketLineViewModel>> Items()
        {
            return mapper
                .Map<List<LibraryCardLine>, List<BasketLineViewModel>>(basketService.Lines.ToList());
        }

        // GET api/basket/update/15/14
        [HttpPost]
        [Route("Update")]
        public async Task<ActionResult<long>> Update([FromBody]BasketLineViewModel line)
        {
            await basketService.UpdateCount(line.Id, line.Count);
            return line.Id;
        }


        // GET api/basket/remove/15
        [HttpPost]
        [Route("Remove")]
        public async Task<ActionResult<long>> Remove([FromBody]BasketLineViewModel line)
        {
            await basketService.RemoveLine(line.Id);
            return line.Id;
        }

        // GET api/basket/order
        [HttpGet]
        [Route("Order")]
        public async Task<ActionResult<bool>> Order()
        {
            await basketService.Order();
            return true;
        }
    }
}