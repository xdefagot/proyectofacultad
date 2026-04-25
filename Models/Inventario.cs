using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApiRopa.Models
{
    public class Inventario
    {
        [Key]
        public int id_inventario { get; set; }

        public int id_prenda { get; set; }
        [ForeignKey(nameof(id_prenda))]
        public Prendas? Prenda { get; set; }

        public int id_talla { get; set; }
        [ForeignKey(nameof(id_talla))]
        public Tallas? Talla { get; set; }
        public int id_color { get; set; }
        [ForeignKey(nameof(id_color))]
        public Colores? Color { get; set; }
        public string Sku { get; set; } = string.Empty;
        public int Stock { get; set; } = 0;
        public decimal Precio_Final { get; set; }

    }
}
