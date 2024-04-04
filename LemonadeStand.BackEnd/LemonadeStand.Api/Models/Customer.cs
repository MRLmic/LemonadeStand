 using System.ComponentModel.DataAnnotations;
 
 public class Customer 
  {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        public string Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
    }