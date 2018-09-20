using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using react.api.ViewModels;
using react.api.Models.LibraryModels;
using react.api.Repository;

namespace react.api.Map
{
    public class AutoMapperProfileConfiguration: Profile
    {
        public AutoMapperProfileConfiguration()
    : this("MyProfile")
        {
        }
        protected AutoMapperProfileConfiguration(string profileName)
        : base(profileName)
        {
            CreateMap<Book, BookViewModel> ()
                .ForMember(view => view.GenreId, opt => opt.MapFrom(model => model.Genre != null ? (long?)model.Genre.Id : null));

            CreateMap<IBasketRepository, BasketViewModel> ()
                .ForMember(view => view.Count, opt => opt.MapFrom(model => model.Lines != null ? (long?)model.Lines.Sum(line => line.Count) : null));

            CreateMap<LibraryCardLine, BasketLineViewModel> ()
                .ForMember(view => view.Title, opt => opt.MapFrom(model => model.Book != null ? $"{model.Book.Name}{(model.Book.Genre != null ? $" ({model.Book.Genre.Name})":string.Empty)}" : string.Empty));

            CreateMap<Genre, GenreViewModel>();
        }
    }
}
