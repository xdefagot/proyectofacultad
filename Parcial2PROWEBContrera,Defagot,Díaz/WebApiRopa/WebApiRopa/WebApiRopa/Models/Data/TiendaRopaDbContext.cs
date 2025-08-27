using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Drawing;

namespace WebApiRopa.Models.Data
{
    public class TiendaRopaDbContext : DbContext
    {
        public TiendaRopaDbContext(DbContextOptions<TiendaRopaDbContext> options) : base(options)
        {
        }

        public DbSet<Prendas> Prendas { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Marca> Marcas { get; set; }
        public DbSet<Tallas> Tallas { get; set; }
        public DbSet<Colores> Colores { get; set; }
        public DbSet<Inventario> Inventario { get; set; }
    }
}
