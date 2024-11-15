using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LemonadeStand.Models;

namespace LemonadeStand.Controllers
{
    [Route("api/[controller]")]
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
            var products = await _context.Products
                .OrderByDescending(p => p.Size)
                .ThenByDescending(p => p.Flavor)
                .ToListAsync();
                return products;
        }
    }
}
