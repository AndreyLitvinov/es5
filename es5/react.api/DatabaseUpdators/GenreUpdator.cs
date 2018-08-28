﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.Models.LibraryModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using react.Models;

namespace react.DatabaseUpdators
{
    public class GenreUpdator : IDatabaseUpdator
    {
        public async Task Update(IServiceScope scope, AppDbContext context)
        {
            var services = scope.ServiceProvider;
            if (!context.Genres.Any())
            {
                context.Genres.AddRange(
                    new Genre
                    {
                        Name = "Биография",
                    },
                    new Genre
                    {
                        Name = "Боевик",
                    },
                    new Genre
                    {
                        Name = "Героическая фантастика",
                    },
                    new Genre
                    {
                        Name = "Городское фэнтези",
                    },
                    new Genre
                    {
                        Name = "Драма",
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
