namespace LemonadeStand.DTOs
{
    public class OrderDto
    {
        public CustomerDto Customer { get; set; }
        public OrderDetailsDto Order { get; set; }
    }

    public class CustomerDto
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }

    public class OrderDetailsDto
    {
        public decimal Total { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}