using System.ComponentModel.DataAnnotations;

public class OrderItem
{
    [Key]
    public int OrderItemId { get; set; }

    [Required]
    public int Quantity { get; set; }
    [Required]
    public int OrderId { get; set; }

    public Order Order { get; set; }

    [Required]
    public int ProductId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public OrderItem(int quantity, int productId)
    {
        ProductId = productId;
        Quantity = quantity;
    }
}