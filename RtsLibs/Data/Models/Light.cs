using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RtsLibs.Data.Models
{
    public class Light
    {
        public int Id { get; set; }
        public string Label { get; set; }

        public void configure(LightConfig pattern)
        {
            //HUE set color and intensity
        }

        public void TurnOn()
        {
            //call HUE API
        }

        public void TurnOff()
        {
            //call HUE API
        }
    }
}
