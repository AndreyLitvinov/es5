using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using react.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.api.DatabaseUpdators
{
    public static class DatabaseUpdator
    {
        public async static Task DatabaseUpdate<TUpdator>(IWebHost host) where TUpdator : IDatabaseUpdator, new()
        {
            
            try
            {
                using (var scope = host.Services.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                    context.Database.Migrate();
                    var updator = new TUpdator();
                    await updator.Update(scope, context);
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
        }
    }

    public interface IDatabaseUpdator
    {
        Task Update(IServiceScope scope, AppDbContext context);
    }
}
