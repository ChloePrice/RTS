using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;

namespace RTS.Models
{
    public class RtsContext : DbContext
    {
        public DbSet<Light> Lights { get; set; }
    }
}
