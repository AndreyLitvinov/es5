using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using react.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.DatabaseUpdators
{
    public static class DatabaseUpdatorExtention
    {
        public static IWebHost DatabaseUpdate<TUpdator>(this IWebHost host) where TUpdator : IDatabaseUpdator, new()
        {
            
            try
            {
                using (var scope = host.Services.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                    context.Database.Migrate();
                    var updator = new TUpdator();
                    updator.Update(scope, context);
                }
            }
            catch (Exception ex)
            {
                /* взять сервис логера и записать ошибку */
                using (var scope = host.Services.CreateScope())
                {

                    var loggingService = scope.ServiceProvider.GetRequiredService<ILoggerFactory>();
                    var logger = loggingService.CreateLogger("DatabaseUpdator");
                    logger.LogError(ex, ex.Message);
                }
            }

            return host;
        }
    }

    public interface IDatabaseUpdator
    {
        Task Update(IServiceScope scope, AppDbContext context);
    }
}
