using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using react.api.DatabaseUpdators;

namespace react.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args)
                // обновление данных в БД
                .DatabaseUpdate<RoleUpdator>()
                .DatabaseUpdate<GenreUpdator>()
                .DatabaseUpdate<BookUpdator>()
                .Run();
        }

        // Создание приложения для стороннего ПО(например для миграции БД)
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
