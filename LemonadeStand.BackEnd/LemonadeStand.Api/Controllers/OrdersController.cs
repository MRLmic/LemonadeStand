using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LemonadeStand.Models;

namespace LemonadeStand.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly LemonadeContext _context;

        public OrdersController(LemonadeContext context)
        {
            _context = context;
        }

        // POST: Orders
       [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
        }

        // GET: Orders/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
    }
}