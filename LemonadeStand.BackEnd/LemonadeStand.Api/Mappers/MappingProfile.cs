using AutoMapper;
using LemonadeStand.Models;
using LemonadeStand.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<OrderDto, Order>().ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.Order.Total));
        CreateMap<OrderItemDto, OrderItem>();
        CreateMap<CustomerDto, Customer>();
    }
}