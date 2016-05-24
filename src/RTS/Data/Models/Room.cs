using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RTS.Data.Models
{
    public class Room
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public Scenario BoundScenario { get; set; }


        public void TurnOn()
        {
            BoundScenario.Lights().ForEach(l => l.TurnOn());
        }

        public void TurnOff()
        {
            BoundScenario.Lights().ForEach(l => l.TurnOff());
        }
    }
}
