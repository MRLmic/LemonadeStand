using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LemonadeStand.Models;

namespace LemonadeStand.Controllers
{
    public class ProductsController : ControllerBase
    {
        private readonly LemonadeContext _context;

        public ProductsController(LemonadeContext context)
        {
            _context = context;
        }

        // GET: Products
       [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
