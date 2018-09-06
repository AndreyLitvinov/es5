using System.Threading.Tasks;
using react.api.Models.IdentityModels;

namespace react.api.Repository{
    public interface IRoleRepository
    {
        Task<AppRole> CreateAsync(AppRole role);
        
        Task UpdateAsync(AppRole user);
        
        Task DeleteAsync(int id);

        Task<AppRole> FindByNameAsync(string username);

    }
}