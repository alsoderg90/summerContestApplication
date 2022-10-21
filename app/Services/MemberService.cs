using app.Repositories;
using app.Models;

namespace app.Services
{
    public class MemberService
    {
        private readonly MemberRepository _memberRepository;

        public MemberService(MemberRepository memberRepository)
        {
            _memberRepository = memberRepository;
        }

        public async Task<List<Member>> GetAll()
        {
            return await _memberRepository.GetAll();
        }

        public async Task<Member> GetById(int id)
        {
            return await _memberRepository.GetById(id);
        }

        public async Task<Member> Create(Member member)
        {
            return await _memberRepository.Create(member);
        }

        public async Task<Member> Update(int id, Member member)
        {
            return await _memberRepository.Update(id, member);
        }

        public async Task<Member> Delete(int id)
        {
            return await _memberRepository.Remove(id);
        }
    }
}
