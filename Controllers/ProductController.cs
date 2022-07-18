using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStore_app.Data;
using ReStore_app.Entitites;

namespace ReStore_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            if(products == null)
                return Ok("Products not found");
            return Ok(products);
            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null)
                BadRequest("Product not found");
            return Ok(product);
        }

        [HttpPost("Add Product")]
        public async Task<ActionResult<List<Product>>> AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(await _context.Products.ToListAsync());
        }

        [HttpPut("Update Product")]
        public async Task<ActionResult<List<Product>>> UpdateProduct(Product request)
        {
            var product = await _context.Products.FindAsync(request.Id);
            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.PictureUrl = request.PictureUrl;
            product.Brand = request.Brand;
            product.QuantityInStock = request.QuantityInStock;

            await _context.SaveChangesAsync();
            return Ok(await _context.Products.ToListAsync());
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null)
                return BadRequest("Product not found");
            
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok("Product deleted succesfully");
        }
    }
}