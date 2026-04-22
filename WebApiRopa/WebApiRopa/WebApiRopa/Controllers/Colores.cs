using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using WebApiRopa.Models;
using WebApiRopa.Models.Data;

namespace WebApiRopa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColoresController : ControllerBase
    {
        private readonly TiendaRopaDbContext _context;

        public ColoresController(TiendaRopaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Colores>>> GetColores()
        {
            return await _context.Colores.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Colores>> GetColor(int id)
        {
            var color = await _context.Colores.FindAsync(id);
            if (color == null)
                return NotFound();

            return color;
        }

        [HttpPost]
        public async Task<ActionResult<Colores>> PostColor(Colores color)
        {
            _context.Colores.Add(color);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetColor), new { id = color.id_color }, color);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor(int id, Colores color)
        {
            if (id != color.id_color)
                return BadRequest();

            _context.Entry(color).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(int id)
        {
            var color = await _context.Colores.FindAsync(id);
            if (color == null)
                return NotFound();

            _context.Colores.Remove(color);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
