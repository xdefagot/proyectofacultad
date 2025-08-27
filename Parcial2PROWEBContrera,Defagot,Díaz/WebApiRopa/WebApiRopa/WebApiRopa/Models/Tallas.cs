using System.ComponentModel.DataAnnotations;
namespace WebApiRopa.Models
{
    public class Tallas
    {
        [Key]
        public int id_talla { get; set; }
        public string Nombre_Talla { get; set; } = string.Empty;

        public ICollection<Inventario>? Inventario { get; set; }
    }
}
