using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Order
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public DateTime DateOfMaking { get; set; }
        [Required]
        public DateTime Deadline { get; set; }
        [Required]
        public double SumPrice { get; set; }
        [Required]
        public User User { get; set; }
        public string Status { get; set; }
        public IEnumerable<OrderItem> OrderItems { get; set; }
    }
}