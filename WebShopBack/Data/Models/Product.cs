using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Product
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Price { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public ProductType ProductType { get; set; }
        public IEnumerable<Characteristic> Characteristics { get; set; }
    }
}