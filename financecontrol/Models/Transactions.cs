using System;

namespace FinanceControl.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }           // Valor da transação
        public DateTime Date { get; set; }            // Data da transação
        public string Type { get; set; } = string.Empty; // "Income" ou "Expense"
        public string Category { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}