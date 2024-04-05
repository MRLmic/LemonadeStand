using System.ComponentModel.DataAnnotations;

public class OrderItem
{
    [Key]
    public int OrderItemId { get; set; }

    [Required]
    public int Quantity { get; set; }
    [Required]
    public int OrderId { get; set; }

    public virtual Order { get; set; }

    [Required]
    public int ProductId { get; set; }

    public virtual Product { get; set; }
}