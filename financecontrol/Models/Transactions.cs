using System;

namespace FinanceControl.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }

        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}