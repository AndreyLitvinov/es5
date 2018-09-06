using System.Threading.Tasks;
using react.api.Models.IdentityModels;

namespace react.api.Repository{
    public interface IUserRepository
    {
        Task<AppUser> AuthenticateAsync(string username, string password);

        Task<AppUser> CreateAsync(AppUser user, string password);
        
        Task UpdateAsync(AppUser user, string password = null);
        
        Task DeleteAsync(int id);

        Task<AppUser> FindByUsernameAsync(string username);

        Task AddToRoleAsync(AppUser user, string role);
    }
}