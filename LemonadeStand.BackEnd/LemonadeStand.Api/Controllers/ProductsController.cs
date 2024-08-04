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
    }
}
