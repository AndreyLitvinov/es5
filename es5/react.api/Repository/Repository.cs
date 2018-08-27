using react.Models.LibraryModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.Models.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {
        private readonly AppDbContext context;
        private DbSet<T> entities;
        string errorMessage = string.Empty;

        public Repository(AppDbContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }
        public IQueryable<T> GetAll()
        {
            return entities.AsQueryable();
        }

        public T Get(long id)
        {
            return entities.Find(id);
        }

        public IQueryable<T> GetQueryable(long id)
        {
            return entities.Where(x => x.Id == id).AsQueryable();
        }

        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Add(entity);
            SaveChange();
        }

        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            SaveChange();
        }

        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
            SaveChange();
        }
        private void SaveChange()
        {
            context.SaveChanges();
        }
    }
}
