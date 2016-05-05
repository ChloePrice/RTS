using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using RTS.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RTS.Controllers
{
    [Route("api/[controller]")]
    public class LightsController : Controller
    {
        private readonly RtsContext _dbContext;

        public LightsController(RtsContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/lights
        [HttpGet]
        public IEnumerable<Light> Get()
        {
            return _dbContext.Lights;
        }

        // GET api/lights/5
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var light = _dbContext.Lights.FirstOrDefault(l => l.Id == id);
            if (light == null)
                return new HttpNotFoundResult();
            else
                return new ObjectResult(light);
        }

        // POST api/lights
        [HttpPost]
        public IActionResult Post([FromBody]Light light)
        {
            if (light.Id == 0)
            {
                _dbContext.Lights.Add(light);
                _dbContext.SaveChanges();
                return new ObjectResult(light);
            }
            else
            {
                var original = _dbContext.Lights.FirstOrDefault(l => l.Id == light.Id);
                if (original == null)
                    return new HttpNotFoundResult();
                original.Label = light.Label;
                _dbContext.SaveChanges();
                return new ObjectResult(original);
            }
        }

        // PUT api/lights/5
        [HttpPut("{id}:int")]
        public IActionResult Put(int id, [FromBody]Light light)
        {
            var original = _dbContext.Lights.FirstOrDefault(l => l.Id == light.Id);
            if (original == null)
                return new HttpNotFoundResult();
            original.Label = light.Label;
            _dbContext.SaveChanges();
            return new ObjectResult(original);
        }

        // DELETE api/lights/5
        [HttpDelete("{id:int}")]
        public IActionResult Delete(Light light)
        {
            var original = _dbContext.Lights.FirstOrDefault(l => l.Id == light.Id);
            if (original == null)
                return new HttpNotFoundResult();
            _dbContext.Lights.Remove(light);
            _dbContext.SaveChanges();
            return new ObjectResult(original);
        }
    }
}
