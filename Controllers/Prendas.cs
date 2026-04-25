using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiRopa.Models;
using WebApiRopa.Models.Data;

namespace WebApiRopa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrendasController : ControllerBase
    {
        private readonly TiendaRopaDbContext _context;

        public PrendasController(TiendaRopaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prendas>>> GetPrendas()
        {
            return await _context.Prendas
                .Include(p => p.Categoria)
                .Include(p => p.Marca)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Prendas>> GetPrenda(int id)
        {
            var prenda = await _context.Prendas.FindAsync(id);
            if (prenda == null)
                return NotFound();

            return prenda;
        }

        [HttpPost]
        public async Task<ActionResult<Prendas>> PostPrenda(Prendas prenda)
        {
            _context.Prendas.Add(prenda);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPrenda), new { id = prenda.id_prenda }, prenda);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrenda(int id, Prendas prenda)
        {
            if (id != prenda.id_prenda)
                return BadRequest();

            _context.Entry(prenda).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrenda(int id)
        {
            var prenda = await _context.Prendas.FindAsync(id);
            if (prenda == null)
                return NotFound();

            _context.Prendas.Remove(prenda);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
