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
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;

        }

        // POST: api/product
        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            if (await _productService.AddProduct(product)) return Ok(product);
            return BadRequest();
        }

        // GET: api/product
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();

            if (products == null) return NotFound();

            if (products.Count == 0) return NoContent();

            return Ok(products);
        }

        // DELETE: api/product/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            if (await _productService.DeleteProduct(id)) return Ok();
            return NotFound();
        }
    }
}