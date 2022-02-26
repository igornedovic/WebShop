using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly IManufacturerService _manufacturerService;

        public ManufacturerController(IManufacturerService manufacturerService)
        {
            _manufacturerService = manufacturerService;
        }

        // POST: api/manufacturer
        [HttpPost]
        public async Task<ActionResult> AddManufacturer(Manufacturer manufacturer)
        {
            if (await _manufacturerService.AddManufacturer(manufacturer)) return Ok(manufacturer);
            return NotFound();
        }
    }
}