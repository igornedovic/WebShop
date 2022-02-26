using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;

namespace Data.Interfaces
{
    public interface IManufacturerService
    {
        IEnumerable<Manufacturer> GetAllManufacturers();
        Task<bool> AddManufacturer(Manufacturer manufacturer);
        Task<bool> DeleteManufacturer(int id);
    }
}