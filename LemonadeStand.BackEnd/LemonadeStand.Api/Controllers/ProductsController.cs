using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LemonadeStand.Models;

namespace LemonadeStand.Controllers
{
    public class ProductsController : Controller
    {
        private readonly LemonadeContext _context;

        public ProductsController(LemonadeContext context)
        {
            _context = context;
        }

        // GET: Products
        public async Task<IActionResult> Index()
        {
            return _context.Products != null ?
                        View(await _context.Products.ToListAsync()) :
                        Problem("Entity set 'LemonadeContext.Products'  is null.");
        }

        // GET: Products/PrintToConsole
        public async Task<IActionResult> PrintToConsole()
        {
            if (_context.Products != null)
            {
                var products = await _context.Products.ToListAsync();
                foreach (var product in products)
                {
                    Console.WriteLine($"Product ID: {product.ProductId}, Name: {product.Flavor}, Price: {product.Price}, Size: {product.Size}");
                }
                return Ok("Products printed to console.");
            }
            return Problem("Entity set 'LemonadeContext.Products' is null.");
        }
    }
}
