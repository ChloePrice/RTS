using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RtsLibs.Data.Models
{
    public class Scenario
    {
        public string Name { get; set; }
        public Dictionary<Light, LightConfig> Configuration { get; set; }
        public Room BoundRoom { get; set; }
        public int RoomId { get; set; }


        public List<Light> Lights()
        {
            return Configuration.Keys.ToList();
        }
    }
}
