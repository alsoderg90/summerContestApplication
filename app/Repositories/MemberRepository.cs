using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Repositories
{
    public class MemberRepository
    {
        private readonly DatabaseContext _context;
        public MemberRepository(DatabaseContext context)
        {
            _context = context;
        }
        public async Task<List<Member>> GetAll()
        {
            var members = await _context.Members
                    .Include(m => m.Points)
                    .Include(m => m.Team)
                    .ToListAsync();

            return members;
        }

        public async Task<Member> GetById(int id)
        {
            var member = await _context.Members.FindAsync(id);
            return member;
        }

        public async Task<Member> Create(Member member)
        {
            
            _context.Members.Add(member);
            await _context.SaveChangesAsync();
            return member;
        }

        public async Task<Member> Update(int id, Member member)
        {
            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!MemberExists(id))
                {
                    return null;
                }
                else
                {
                    throw new Exception(ex.Message);
                }
            }
            return member;
        }

        public async Task<Member> Remove(int id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return null;
            }

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return member;
        }

        private bool MemberExists(int id)
        {
            return _context.Members.Any(e => e.Id == id);
        }

        private bool MembersExists()
        {
            return _context.Members.Count() != 0;
        }
    }
}
