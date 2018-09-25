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

            CreateMap<IBasketService, BasketViewModel> ()
                .ForMember(view => view.Count, opt => opt.MapFrom(model => model.Lines != null ? (long?)model.Lines.Sum(line => line.Count) : null));

            CreateMap<LibraryCardLine, BasketLineViewModel>()
                .ForMember(view => view.Title, opt => opt.MapFrom(model => model.Book != null ? $"{model.Book.Name}{(model.Book.Genre != null ? $" ({model.Book.Genre.Name})":string.Empty)}" : string.Empty))
                .ForMember(view => view.MaxCount, opt => opt.MapFrom(model => model.Book != null ? model.Book.Count : 0));

            CreateMap<Genre, GenreViewModel>();

            CreateMap<Reader, ReaderViewModel>();
            CreateMap<ReaderViewModel, Reader>();

            CreateMap<Reader, OrderViewModel>()
                .ForMember(view => view.Title, opt => opt.MapFrom(model => $"{model.FirstName} {model.LastName}" ))
                .ForMember(view => view.UserId, opt => opt.MapFrom(model => model.User != null ? model.User.Id : 0 ));
        }
    }
}
