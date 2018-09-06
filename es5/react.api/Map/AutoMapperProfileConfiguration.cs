using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using react.api.ViewModels;
using react.api.Models.LibraryModels;

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

            CreateMap<Genre, GenreViewModel>();
        }
    }
}
