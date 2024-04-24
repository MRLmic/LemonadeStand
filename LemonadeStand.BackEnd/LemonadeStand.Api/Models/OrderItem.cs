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
    public int ProductId { get; set; }

    public virtual Product Product { get; set; }
}