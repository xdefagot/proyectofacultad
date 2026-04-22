using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApiRopa.Models;
using WebApiRopa.Models.Data;

namespace WebApiRopa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TallasController : ControllerBase
    {
        private readonly TiendaRopaDbContext _context;

        public TallasController(TiendaRopaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tallas>>> GetTallas()
        {
            return await _context.Tallas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tallas>> GetTalla(int id)
        {
            var talla = await _context.Tallas.FindAsync(id);
            if (talla == null)
                return NotFound();
            return talla;
        }

        [HttpPost]
        public async Task<ActionResult<Tallas>> PostTalla(Tallas talla)
        {
            _context.Tallas.Add(talla);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTalla), new { id = talla.id_talla }, talla);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTalla(int id, Tallas talla)
        {
            if (id != talla.id_talla)
                return BadRequest();

            _context.Entry(talla).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTalla(int id)
        {
            var talla = await _context.Tallas.FindAsync(id);
            if (talla == null)
                return NotFound();

            _context.Tallas.Remove(talla);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
