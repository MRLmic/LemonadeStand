public class LemonadeContext : DbContext
    {
        public LemonadeContext(DbContextOptions<Test1DbContext> options)
            : base(options)
        {
        }
        public DbSet<Customer> Customers { get; set; }
    }