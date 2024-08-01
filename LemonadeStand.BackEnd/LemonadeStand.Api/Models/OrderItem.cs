using System.ComponentModel.DataAnnotations;

public class OrderItem
{
    [Key]
    public int OrderItemId { get; set; }

    [Required]
    public int Quantity { get; set; }
    [Required]
    public int OrderId { get; set; }

    public virtual Order Order { get; set; }

    [Required]
    public required int ProductId { get; set; }

    public required virtual Product Product { get; set; }

    public OrderItem()
    {
        //TODO: initialize with Product/Order as parameter
        Product = new Product
        {
            Flavor = "",
            Size = "",
            Price = 0
        };

        Order = new Order
        {
            CustomerId = 0,
            Total = 0,
            OrderItems = new List<OrderItem>()
        };
    }
}