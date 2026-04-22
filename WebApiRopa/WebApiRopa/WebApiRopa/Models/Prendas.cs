using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApiRopa.Models
{
    public class Prendas
    {
        [Key]
        public int id_prenda { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion_Base { get; set; }
        public int id_categoria { get; set; }
        [ForeignKey(nameof(id_categoria))]
        public Categoria? Categoria { get; set; }
        public int id_marca { get; set; }
        [ForeignKey(nameof(id_marca))]
        public Marca? Marca { get; set; }
        public decimal Precio_Base { get; set; }
        public DateTime Fecha_Creacion { get; set; } = DateTime.Now;
        public ICollection<Inventario>? Inventario { get; set; }
    }
}
