using System.ComponentModel.DataAnnotations;
namespace WebApiRopa.Models
{
    public class Marca
    {
        [Key]
        public int id_marca { get; set; }
        public string Nombre_Marca { get; set; } = string.Empty;

        public ICollection<Prendas>? Prendas { get; set; }
    }
}
