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
    [Authorize(Roles = "Admin, Librarian")]
    [ApiController]
    public class LibrarianController : ControllerBase
    {
        private ILibrarianService librarianService;
        private IMapper mapper;

        public LibrarianController(ILibrarianService service, IMapper mapper)
        {
            librarianService = service;
            this.mapper = mapper;   
        }

        // GET api/librarian/orders
        [HttpGet]
        [Route("Orders/{page}/{pagesize}")]
        public ActionResult<BasketViewModel> Orders(int page, int pagesize)
        {
            return mapper
                .Map<IBasketService, BasketViewModel>(librarianService.GetOrders());
        }

        // POST api/librarian/update/
        [HttpPost]
        [Route("Update")]
        public async Task<ActionResult<long>> Update([FromBody]BasketLineViewModel line)
        {
            await basketService.UpdateCount(line.Id, line.Count);
            return line.Id;
        }

        // POST api/librarian/remove/15
        [HttpPost]
        [Route("Remove")]
        public async Task<ActionResult<long>> Remove([FromBody]BasketLineViewModel line)
        {
            await basketService.RemoveLine(line.Id);
            return line.Id;
        }

        // POST api/librarian/GiveLine
        [HttpPost]
        [Route("GiveLine")]
        public async Task<ActionResult<bool>> GiveLine(long userId)
        {
            await basketService.Order();
            return true;
        }

        // POST api/librarian/GiveAllLines
        [HttpPost]
        [Route("GiveAllLines")]
        public async Task<ActionResult<bool>> GiveAllLines()
        {
            await basketService.Order();
            return true;
        }
    }
}