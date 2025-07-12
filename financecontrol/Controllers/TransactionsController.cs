// Controllers/TransactionsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanceControl.Data;
using FinanceControl.Models;

namespace FinanceControl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly FinancasDbContext _context;

        public TransactionsController(FinancasDbContext context)
        {
            _context = context;
        }

        // GET: api/transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        // GET: api/transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound();

            return transaction;
        }

        // POST: api/transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
        }

        // PUT: api/transactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, Transaction transaction)
        {
            if (id != transaction.Id)
                return BadRequest();

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Transactions.Any(e => e.Id == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: api/transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound();

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/transactions/summary
        [HttpGet("summary")]
        public async Task<ActionResult<object>> GetSummary()
        {
            var totalIncome = await _context.Transactions
                .Where(t => t.Type == "Income")
                .SumAsync(t => t.Amount);

            var totalExpense = await _context.Transactions
                .Where(t => t.Type == "Expense")
                .SumAsync(t => t.Amount);

            var balance = totalIncome - totalExpense;

            return Ok(new
            {
                totalIncome,
                totalExpense,
                balance
            });
        }

        // GET: api/transactions/by-category
        [HttpGet("by-category")]
        public async Task<ActionResult<IEnumerable<object>>> GetTotalsByCategory()
        {
            var result = await _context.Transactions
                .Where(t => t.Type == "Expense")
                .GroupBy(t => t.Category)
                .Select(g => new
                {
                    category = g.Key,
                    total = g.Sum(t => t.Amount)
                })
                .ToListAsync();

            return Ok(result);
        }

    }
}
