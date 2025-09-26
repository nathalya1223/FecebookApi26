using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FecebookApi26.Context;
using FecebookApi26.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FecebookApi26.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FecebookController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FecebookController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fecebook>>> GetAll()
        {
            return await _context.Fecebooks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fecebook>> GetById(int id)
        {
            var fecebook = await _context.Fecebooks.FindAsync(id);
            if (fecebook == null)
                return NotFound();
            return fecebook;
        }

         [HttpPost]
        public async Task<ActionResult<Fecebook>> Create(Fecebook fecebook)
        {
            _context.Fecebooks.Add(fecebook);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = fecebook.Id }, fecebook);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Fecebook fecebook)
        {
            if (id != fecebook.Id)
                return BadRequest();

            _context.Entry(fecebook).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var fecebook = await _context.Fecebooks.FindAsync(id);
            if (fecebook == null)
                return NotFound();

            _context.Fecebooks.Remove(fecebook);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}