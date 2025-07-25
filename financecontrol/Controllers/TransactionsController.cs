using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanceControl.Data;
using FinanceControl.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

        private Guid GetUserId()
        {
            return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            Guid userId = GetUserId();
            return await _context.Transactions
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(Guid id)
        {
            Guid userId = GetUserId();
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (transaction == null)
                return NotFound();

            return transaction;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
            transaction.UserId = GetUserId();

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(Guid id, Transaction transaction)
        {
            Guid userId = GetUserId();

            if (id != transaction.Id)
                return BadRequest();

            var existing = await _context.Transactions
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (existing == null)
                return NotFound();

            transaction.UserId = userId;
            _context.Entry(transaction).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id)
        {
            Guid userId = GetUserId();

            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (transaction == null)
                return NotFound();

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpGet("summary")]
        public async Task<ActionResult<object>> GetSummary()
        {
            Guid userId = GetUserId();

            var totalIncome = await _context.Transactions
                .Where(t => t.Type == "Income" && t.UserId == userId)
                .SumAsync(t => t.Amount);

            var totalExpense = await _context.Transactions
                .Where(t => t.Type == "Expense" && t.UserId == userId)
                .SumAsync(t => t.Amount);

            var balance = totalIncome - totalExpense;

            return Ok(new
            {
                totalIncome,
                totalExpense,
                balance
            });
        }
        
        [Authorize]
        [HttpGet("by-category")]
        public async Task<ActionResult<IEnumerable<object>>> GetTotalsByCategory()
        {
            Guid userId = GetUserId();

            var result = await _context.Transactions
                .Where(t => t.UserId == userId)
                .GroupBy(t => new { t.Category, t.Type })
                .Select(g => new
                {
                    category = g.Key.Category,
                    type = g.Key.Type,
                    total = g.Sum(t => t.Amount)
                })
                .ToListAsync();

            return Ok(result);
        }

        [Authorize]
        [HttpGet("by-month")]
        public async Task<ActionResult<IEnumerable<object>>> GetMonthlySummary()
        {
            Guid userId = GetUserId();

            var data = await _context.Transactions
                .Where(t => t.UserId == userId)
                .GroupBy(t => new { t.Type, Month = t.Date.Month, Year = t.Date.Year })
                .Select(g => new
                {
                    type = g.Key.Type,
                    month = g.Key.Month,
                    year = g.Key.Year,
                    total = g.Sum(t => t.Amount)
                })
                .OrderBy(g => g.year).ThenBy(g => g.month)
                .ToListAsync();

            return Ok(data);
        }
        
        
    }
}
