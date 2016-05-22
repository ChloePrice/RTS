using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;

namespace RTS.Models
{
    public class RtsContext : DbContext
    {
        public static bool _created = false;

        public RtsContext()
        {
            if (!_created)
            {
                _created = true;
                Database.EnsureCreated();
            }
        }

        public DbSet<Light> Lights { get; set; }
    }
}
