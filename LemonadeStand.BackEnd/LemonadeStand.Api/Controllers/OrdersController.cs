using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LemonadeStand.Models;
using LemonadeStand.DTOs;
using AutoMapper;

namespace LemonadeStand.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly LemonadeContext _context;
        private readonly IMapper _mapper;

        private int customerId;
        private int orderId;
        private Order order;

        public OrdersController(LemonadeContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // POST: Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromBody]OrderDto orderDto)
        {
            if (orderDto == null || orderDto.Customer == null || orderDto.Order == null){
                return BadRequest();
            }
            Console.WriteLine(orderDto);
            try
            {
                var customerInfo = _mapper.Map<CustomerDto, Customer>(orderDto.Customer);
                _context.Customers.Add(customerInfo);
                await _context.SaveChangesAsync();
                customerId = customerInfo.CustomerId;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }


            try
            {
                var order = _mapper.Map<OrderDto, Order>(orderDto);
                order.CustomerId = customerId;
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
                orderId = order.OrderId;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            try
            {

                foreach (var item in orderDto.Order.OrderItems)
                {
                    var orderItem = _mapper.Map<OrderItemDto, OrderItem>(item);
                    orderItem.OrderId = orderId;
                    _context.OrderItems.Add(orderItem);
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return CreatedAtAction(nameof(GetOrder), new { id = orderId }, order);
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