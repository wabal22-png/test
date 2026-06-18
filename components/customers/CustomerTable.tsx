'use client';

import { Customer } from '@/types/customer';
import { useState } from 'react';
import { Search, Plus, Pencil, EyeOff, Eye, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CustomerForm from './CustomerForm';
import CustomerDetail from './CustomerDetail';
import { useSettings } from '@/context/SettingsContext';
import { useCustomer } from '@/context/CustomerContext';

const gradeBadge: Record<string, string> = {
  신규: 'bg-[#EAF4FA] text-[#1F6A8C]',
  체험: 'bg-[#E0F4F8] text-[#2F80A7]',
  일반: 'bg-[#E8F6EF] text-[#2F8F5B]',
  VIP:  'bg-[#202B3F] text-white',
  휴면: 'bg-[#F3F4F6] text-[#9CA3AF]',
};

const payBadge: Record<string, string> = {
  미결제:  'bg-[#FDECEA] text-[#C24132]',
  결제완료: 'bg-[#E8F6EF] text-[#2F8F5B]',
  부분결제: 'bg-[#FFF6D8] text-[#A17400]',
};

export default function CustomerTable() {
  const { customers, addCustomer, updateCustomer, deactivateCustomer, deleteCustomer } = useCustomer();
  const { getLabels } = useSettings();

  const gradeLabels  = ['전체', ...getLabels('customerGrade')];
  const sourceLabels = ['전체', ...getLabels('inflowPath')];

  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('전체');
  const [sourceFilter, setSourceFilter] = useState('전체');
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Customer | null>(null);
  const [detailTarget, setDetailTarget] = useState<Customer | null>(null);

  const filtered = customers.filter((c) => {
    if (!c.isActive) return false;
    const matchSearch = c.name.includes(search) || c.phone.includes(search);
    const matchGrade  = gradeFilter  === '전체' || c.grade  === gradeFilter;
    const matchSource = sourceFilter === '전체' || c.source === sourceFilter;
    return matchSearch && matchGrade && matchSource;
  });

  function handleSave(customer: Customer) {
    if (editTarget) {
      updateCustomer(customer.id, customer);
    } else {
      addCustomer(customer);
    }
    setFormOpen(false);
    setEditTarget(null);
  }

  function handleDeactivate(id: string) {
    if (confirm('이 고객을 비활성화하시겠습니까?\n데이터는 보존됩니다.')) {
      deactivateCustomer(id);
    }
  }

  function handleDelete(id: string) {
    if (confirm('정말로 이 고객을 삭제하시겠습니까?\n(이 작업은 되돌릴 수 없으며 데이터베이스에서 영구 삭제됩니다)')) {
      deleteCustomer(id);
    }
  }

  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${active ? 'bg-[#202B3F] text-white' : 'bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB]'}`;

  return (
    <div className="space-y-4">
      {/* 툴바 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <Input placeholder="고객명 또는 연락처 검색" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 border-[#E5E7EB] h-9 text-sm" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {gradeLabels.map((g) => <button key={g} onClick={() => setGradeFilter(g)} className={chip(gradeFilter === g)}>{g}</button>)}
        </div>
        <div className="flex gap-1 flex-wrap">
          {sourceLabels.map((s) => <button key={s} onClick={() => setSourceFilter(s)} className={chip(sourceFilter === s)}>{s}</button>)}
        </div>
        <Button onClick={() => { setEditTarget(null); setFormOpen(true); }} className="bg-[#2F80A7] hover:bg-[#256B8D] text-white ml-auto">
          <Plus size={15} className="mr-1" /> 고객 추가
        </Button>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F4F6F8] border-b border-[#E5E7EB]">
              <tr>
                {['고객명', '성별', '연락처', '등급', '유입경로', '첫방문', '최근방문', '결제상태', '누적결제', '담당코치', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6F8]">
              {filtered.length === 0 ? (
                <tr><td colSpan={10} className="text-center py-12 text-[#9CA3AF]">검색 결과가 없습니다.</td></tr>
              ) : filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F4F6F8]/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-[#1F2937]">{c.name}</td>
                  <td className="px-4 py-3">
                    {c.gender && c.gender !== '미입력' && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.gender === '남성' ? 'bg-[#EAF4FA] text-[#1F6A8C]' : 'bg-[#FCE8F0] text-[#9B3066]'}`}>
                        {c.gender === '남성' ? '♂' : '♀'} {c.gender}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#6B7280]">{c.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${gradeBadge[c.grade] ?? 'bg-[#F3F4F6] text-[#6B7280]'}`}>{c.grade}</span>
                  </td>
                  <td className="px-4 py-3 text-[#6B7280]">{c.source}</td>
                  <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{c.firstVisit}</td>
                  <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{c.lastVisit}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${payBadge[c.paymentStatus] ?? 'bg-[#F3F4F6] text-[#6B7280]'}`}>{c.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1F2937] whitespace-nowrap">{c.totalPayment.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{c.coachName || c.coach || '—'}</td>
                  <td className="px-4 py-3">
                      <button onClick={() => setDetailTarget(c)} className="p-1.5 rounded-lg hover:bg-[#EAF4FA] text-[#2F80A7] transition-colors" title="상세보기"><Eye size={15} /></button>
                      <button onClick={() => { setEditTarget(c); setFormOpen(true); }} className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors" title="수정"><Pencil size={15} /></button>
                      <button onClick={() => handleDeactivate(c.id)} className="p-1.5 rounded-lg hover:bg-[#FFF6D8] text-[#9CA3AF] hover:text-[#A17400] transition-colors" title="비활성화"><EyeOff size={15} /></button>
                      <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg hover:bg-[#FDECEA] text-[#9CA3AF] hover:text-[#C24132] transition-colors" title="영구 삭제"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-[#E5E7EB] bg-[#F4F6F8]/50">
          <p className="text-xs text-[#9CA3AF]">총 {filtered.length}명</p>
        </div>
      </div>

      {formOpen && <CustomerForm customer={editTarget} onSave={handleSave} onClose={() => { setFormOpen(false); setEditTarget(null); }} />}
      {detailTarget && <CustomerDetail customer={detailTarget} onClose={() => setDetailTarget(null)} />}
    </div>
  );
}
