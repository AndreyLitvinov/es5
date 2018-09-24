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
    public class ReaderController : ControllerBase
    {
        private IRepository<Reader> repoReader;
        private IMapper mapper;
        private IUserService userService;

        public ReaderController(IRepository<Reader> repos, IUserService userService, IMapper mapper)
        {
            repoReader = repos;
            this.mapper = mapper;
            this.userService = userService;
        }

        // GET api/reader
        [HttpGet]
        public ActionResult<ReaderViewModel> Get()
        {
            var reader = userService.GetCurrentUser()?.Reader;
            return mapper
                .Map<Reader, ReaderViewModel>(reader);
        }

        // GET api/reader/update/
        [HttpPost]
        [Route("Update")]
        public ActionResult<ReaderViewModel> Update([FromBody]ReaderViewModel reader)
        {
            var currentReader = userService.GetCurrentUser()?.Reader;
            
            repoReader.Update(mapper.Map<ReaderViewModel, Reader>(reader, currentReader));

            return mapper
                .Map<Reader, ReaderViewModel>(currentReader);
        }

    }
}