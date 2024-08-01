using System.ComponentModel.DataAnnotations;

public class Order
{
    [Key]
    public int OrderId { get; set; }
    [Required]
    public decimal Total { get; set; }
    [Required]
    public int CustomerId { get; set; }
    public virtual Customer Customer { get; set; }
    public required virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public Order()
    {
        //TODO: initialize with Customer as parameter
        Customer = new Customer
        {
            Name = "",
            PhoneNumber = "",
            Email = ""
        };
    }
}