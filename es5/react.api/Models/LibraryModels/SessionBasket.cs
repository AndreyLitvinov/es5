using Library.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.Models.LibraryModels
{
    public class SessionBasket : Basket
    {
        public static Basket GetBasket(IServiceProvider services)
        {
            var session = services.GetRequiredService<IHttpContextAccessor>()?
                .HttpContext.Session;
            var basket = session?.GetJson<SessionBasket>("Basket")
                ?? new SessionBasket();
            basket.Session = session;
            return basket;
        }

        [JsonIgnore]
        public ISession Session { get; set; }

        public override void AddItem(Book book, int quantity)
        {
            base.AddItem(book, quantity);
            Session.SetJson("Basket", this);
        }

        public override void RemoveLine(Book book)
        {
            base.RemoveLine(book);
            Session.SetJson("Basket", this);
        }

        public override void Clear()
        {
            base.Clear();
            Session.Remove("Basket");
        }
    }
}
