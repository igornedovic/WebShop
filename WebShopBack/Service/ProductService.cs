using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Service
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;
        public ProductService(ApplicationDbContext context)
        {
            _context = context;

        }

        public async Task<bool> AddProduct(Product product)
        {
            try
            {
                product.ManufacturerId = product.Manufacturer.ID;
                product.ProductTypeId = product.ProductType.ID;
                _context.Entry(product.Manufacturer).State = EntityState.Unchanged;
                _context.Entry(product.ProductType).State = EntityState.Unchanged;
                _context.Products.Add(product);
                _context.Characteristics.AddRange(product.Characteristics);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public Task<bool> DeleteProduct(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Characteristic>> GetAllCharacteristics(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Product>> GetAllProduct()
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetProduct(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateProduct(int productId, Product product)
        {
            throw new NotImplementedException();
        }
    }
}