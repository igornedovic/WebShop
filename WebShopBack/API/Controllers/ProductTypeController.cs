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
    public class ProductTypeController : ControllerBase
    {
        private readonly IProductTypeService _productTypeService;
        public ProductTypeController(IProductTypeService productTypeService)
        {
            _productTypeService = productTypeService;

        }

        // POST: api/productType
        [HttpPost]
        public async Task<ActionResult> AddProductType(ProductType productType)
        {
            if (await _productTypeService.AddProductType(productType)) return Ok(productType);
            return NotFound();
        }
    }
}