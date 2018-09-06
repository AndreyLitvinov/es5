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

namespace react.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private IRepository<Genre> repoGenres;
        private IMapper mapper;

        public GenresController(IRepository<Genre> repos, IMapper mapper)
        {
            repoGenres = repos;
            this.mapper = mapper;
        }

        // GET api/genres
        [HttpGet]
        public ActionResult<IEnumerable<GenreViewModel>> Get()
        {
            return repoGenres
                .GetAll()
                .Select(genre => mapper.Map<Genre, GenreViewModel>(genre))
                .ToList();
        }
    }
}