using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FecebookApi26.Models;
using Microsoft.EntityFrameworkCore;

namespace FecebookApi26.Context
{
    public class AppDbContext  : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            
        }

        public DbSet<Fecebook> Fecebooks { get; set; }
    }
}