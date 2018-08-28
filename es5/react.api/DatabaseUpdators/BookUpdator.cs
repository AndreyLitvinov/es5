using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.Models.LibraryModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using react.Models;

namespace react.DatabaseUpdators
{
    public class BookUpdator : IDatabaseUpdator
    {
        public async Task Update(IServiceScope scope, AppDbContext context)
        {
            var services = scope.ServiceProvider;
            if (!context.Books.Any())
            {
                context.Books.AddRange(
                    new Book
                    {
                        Name = "Гумилев сын Гумилева",
                        Annotation = "Финалист национальной премии \"Большая книга — 2013\". Самая полная, основанная на уникальных документах и материалах, биография ученого и человека с судьбой счастливой, трагичной...",
                        Count = 18,
                        Year = 1989,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Биография")
                    },
                    new Book
                    {
                        Name = "Лев Толстой: Бегство из рая",
                        Annotation = "Исследование жизни и смерти Толстого. Национальная премия \"Большая книга\".",
                        Count = 45,
                        Year = 1958,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Биография")
                    },
                    new Book
                    {
                        Name = "Эта странная жизнь",
                        Annotation = "Документальная повесть о биологе, энтомологе, философе Александре Любищеве.",
                        Count = 0,
                        Year = 1974,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Биография")
                    },
                    new Book
                    {
                        Name = "Город мертвых",
                        Annotation = "Идет война против человечества. Когда небольшой городок Райнбоу Фалс в штате Монтана попадает в осаду, выжившие жители решают собраться с последними силами и начать страшную борьбу против существ, разгуливающих по всему миру…",
                        Count = 5,
                        Year = 1981,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Боевик")
                    },
                    new Book
                    {
                        Name = "Стрелок",
                        Annotation = "Есть только один, кто способен спасти этот сдвинувшийся мир. И от него не будет пощады.",
                        Count = 5,
                        Year = 1980,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Героическая фантастика")
                    },
                    new Book
                    {
                        Name = "Извлечение троих",
                        Annotation = "Роланду откроет двери между мирами, чтобы спасти Узника, сразиться с Госпожой Теней и встретить Смерть.",
                        Count = 9,
                        Year = 1990,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Героическая фантастика")
                    },
                    new Book
                    {
                        Name = "Ударные согласные",
                        Annotation = "О пиарщиках умирающего завода, молодых самонадеянных властителях провинциальных умов, пытающихся корпоративным духом ударить по экономическому кризису, казнокрадству и разгильдяйству.",
                        Count = 8,
                        Year = 1997,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Драма")
                    },
                    new Book
                    {
                        Name = "Мартин Иден",
                        Annotation = "Известная социальная драма американского классика-реалиста о надеждах, мечтах и трудном пути человека к их исполнению.",
                        Count = 15,
                        Year = 1991,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Драма")
                    },
                    new Book
                    {
                        Name = "Осуждённый",
                        Annotation = "Небольшой детектив древнего мира.",
                        Count = 520,
                        Year = 1999,
                        Genre = context.Genres.FirstOrDefault(genre => genre.Name == "Драма")
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
