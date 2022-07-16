using Microsoft.EntityFrameworkCore;
using ReStore_app.Entitites;

namespace ReStore_app.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}