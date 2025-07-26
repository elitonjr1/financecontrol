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
    public class AccountController : ControllerBase
    {
        private readonly FinancasDbContext _context;

        public AccountController(FinancasDbContext context)
        {
            _context = context;
        }

        private Guid GetUserId()
        {
            return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccount()
        {
            Guid userId = GetUserId();
            return await _context.Accounts
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(Guid id)
        {
            Guid userId = GetUserId();
            var Account = await _context.Accounts
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (Account == null)
                return NotFound();

            return Account;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            account.UserId = GetUserId();

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAccount), new { id = account.Id }, account);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(Guid id, Account account)
        {
            Guid userId = GetUserId();

            if (id != account.Id)
                return BadRequest();

            var existing = await _context.Accounts
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (existing == null)
                return NotFound();

            account.UserId = userId;
            _context.Entry(account).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            Guid userId = GetUserId();

            var account = await _context.Accounts
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (account == null)
                return NotFound();

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpGet("summary")]
        public async Task<ActionResult<object>> GetSummary()
        {
            Guid userId = GetUserId();

            var totalIncome = await _context.Accounts
                .Where(t => t.Type == "Income" && t.UserId == userId)
                .SumAsync(t => t.Amount);

            var totalExpense = await _context.Accounts
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
    }
}
