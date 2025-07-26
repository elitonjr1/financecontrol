using System;

namespace FinanceControl.Models
{
    public class Account
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Type { get; set; } = string.Empty;
        public decimal Amount { get; set; }        
        public string Description { get; set; } = string.Empty;        
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}