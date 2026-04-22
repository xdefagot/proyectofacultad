using System.ComponentModel.DataAnnotations;
namespace WebApiRopa.Models
{
    public class Categoria
    {
        [Key]
        public int id_categoria { get; set; }
        public string Nombre_Categoria { get; set; } = string.Empty;
        public string? Descripcion { get; set; }

        public ICollection<Prendas>? Prendas { get; set; }
    }
}
