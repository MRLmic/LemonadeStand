using System.ComponentModel.DataAnnotations;

public class Order
{
    [Key]
    public int OrderId { get; set; }
    [Required]
    public decimal Total { get; set; }
    [Required]
    public int CustomerId { get; set; }
    public virtual Customer Customer { get; set; } = null!;
    [Required]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public Order() {}
    public Order(Customer customer, ICollection<OrderItem> orderItems, decimal total)
    {
        Customer = customer;
        OrderItems = orderItems;
        Total = total;        
    }
}