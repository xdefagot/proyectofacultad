using System.ComponentModel.DataAnnotations;
namespace WebApiRopa.Models
{
    public class Colores
    {
        [Key]
        public int id_color { get; set; }
        public string Nombre_Color { get; set; } = string.Empty;
        public string? Codigo_Hex { get; set; }

        public ICollection<Inventario>? Inventario { get; set; }
    }
}
