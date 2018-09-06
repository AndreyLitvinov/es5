using react.api.Models.LibraryModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using react.api.Models.IdentityModels;

namespace react.api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<LibraryCardLine> LibraryCardLines { get; set; }
        public DbSet<LibraryCard> LibraryCards { get; set; }
        public DbSet<Reader> Readers { get; set; }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppRole> Roles { get; set; }

        public DbSet<AppUserRole> AppUserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

             builder.Entity<AppUserRole>()
                .HasKey(userRole => new { userRole.UserId, userRole.RoleId });
                
            builder.Entity<AppUserRole>()
                .HasOne(userRole => userRole.User)
                .WithMany(user => user.UserRoles)
                .HasForeignKey(userRole => userRole.UserId);

            builder.Entity<AppUserRole>()
                .HasOne(userRole => userRole.Role)
                .WithMany(role => role.UserRoles)
                .HasForeignKey(userRole => userRole.RoleId);

            builder.Entity<AppUser>()
                .HasOne(x => x.Reader)
                .WithOne(x => x.User)
                .HasForeignKey<Reader>(x => x.Id);
        }
    }
}
