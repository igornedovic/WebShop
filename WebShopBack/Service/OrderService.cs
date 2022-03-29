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
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        public OrderService(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task<bool> AddOrder(Order order)
        {
            try
            {
                order.UserId = order.User.UserId;
                _context.Entry(order.User).State = EntityState.Unchanged;
                
                foreach (OrderItem item in order.OrderItems)
                {
                    item.ProductId = item.Product.ID;
                    _context.Entry(item.Product).State = EntityState.Unchanged;
                }
                
                _context.Orders.Add(order);

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public Task<bool> DeleteOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Order>> GetAllOrders()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Order>> GetAllOrdersForUser(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateOrder(int orderId, Order order)
        {
            throw new NotImplementedException();
        }
    }
}