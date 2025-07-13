using Microsoft.EntityFrameworkCore;
using FinanceControl.Models;

namespace FinanceControl.Data
{
    public class FinancasDbContext : DbContext
    {
        public FinancasDbContext(DbContextOptions<FinancasDbContext> options)
            : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<User> Users { get; set; }

    }
}