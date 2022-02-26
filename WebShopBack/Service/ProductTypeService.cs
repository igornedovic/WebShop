using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Interfaces;
using Data.Models;

namespace Service
{
    public class ProductTypeService : IProductTypeService
    {
        private readonly ApplicationDbContext _context;
        public ProductTypeService(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task<bool> AddProductType(ProductType productType)
        {
            try
            {
                _context.ProductTypes.Add(productType);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public Task<bool> DeleteProductType(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProductType>> GetAllProductTypes()
        {
            throw new NotImplementedException();
        }
    }
}