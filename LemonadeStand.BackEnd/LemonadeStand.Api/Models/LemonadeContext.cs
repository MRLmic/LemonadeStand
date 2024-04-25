using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LemonadeStand.Models;

public partial class LemonadeContext : DbContext
{
    public LemonadeContext()
    {
    }

    public LemonadeContext(DbContextOptions<LemonadeContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath("/Users/melissa/Projects/LemonadeStand/LemonadeStand.Config/")
                .AddJsonFile("appsettings.Development.json")
                .Build();

            optionsBuilder.UseNpgsql(configuration.GetConnectionString("lemonade"));
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
