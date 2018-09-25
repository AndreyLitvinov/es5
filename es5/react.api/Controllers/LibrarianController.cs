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
        public ActionResult<ListViewModel> Orders(int page, int pagesize)
        {
            var result =
                librarianService
                .GetOrders()
                .Include(reader => reader.User)
                .Select(reader => mapper.Map<Reader, OrderViewModel>(reader))
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

        // GET api/librarian/order/15
        [HttpGet]
        [Route("Order/{userId}")]
        public async Task<ActionResult<List<BasketLineViewModel>>> Order(long userId)
        {
            var result = await librarianService
                .GetOrder(userId);

            return mapper.Map<List<LibraryCardLine>, List<BasketLineViewModel>>(result);
        }

        // POST api/librarian/update/
        [HttpPost]
        [Route("Update")]
        public async Task<ActionResult<long>> Update([FromBody]BasketLineViewModel line)
        {
            await librarianService.UpdateCount(line.Id, line.Count);
            return line.Id;
        }

        // POST api/librarian/remove/15
        [HttpPost]
        [Route("Remove")]
        public async Task<ActionResult<long>> Remove([FromBody]BasketLineViewModel line)
        {
            await librarianService.RemoveLine(line.Id);
            return line.Id;
        }

        // POST api/librarian/GiveLine
        [HttpPost]
        [Route("GiveLine")]
        public async Task<ActionResult<long>> GiveLine(long lineId)
        {
            await librarianService.GiveLine(lineId);
            return lineId;
        }

        // POST api/librarian/GiveAllLines
        [HttpPost]
        [Route("GiveAllLines")]
        public async Task<ActionResult<long>> GiveAllLines(long userId)
        {
            await librarianService.GiveAllLines(userId);
            return userId;
        }
    }
}