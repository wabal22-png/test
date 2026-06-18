'use client';

import { Customer } from '@/types/customer';
import { X } from 'lucide-react';
import CustomerPassCard from './CustomerPassCard';

interface Props { customer: Customer; onClose: () => void }

const gradeBadge: Record<string, string> = {
  신규: 'bg-gray-100 text-gray-600', 체험: 'bg-gray-100 text-gray-600',
  일반: 'bg-gray-100 text-gray-700', VIP: 'bg-gray-900 text-white', 휴면: 'bg-gray-50 text-gray-400',
};

export default function CustomerDetail({ customer: c, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-bold">{c.name[0]}</div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">{c.name}</h2>
                {c.gender && c.gender !== '미입력' && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.gender === '남성' ? 'bg-[#EAF4FA] text-[#1F6A8C]' : 'bg-[#FCE8F0] text-[#9B3066]'}`}>
                    {c.gender === '남성' ? '♂ 남성' : '♀ 여성'}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">{c.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${gradeBadge[c.grade] ?? 'bg-gray-100 text-gray-600'}`}>{c.grade}</span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={20} /></button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* 이용권 카드 */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">이용권</p>
            <CustomerPassCard customerId={c.id} customerName={c.name} />
          </div>

          {/* 기본 정보 */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">기본 정보</p>
            <div className="grid grid-cols-2 gap-4">
              <Info label="유입경로" value={c.source} />
              <Info label="담당코치" value={c.coachName || c.coach || '—'} />
              <Info label="첫 방문일" value={c.firstVisit} />
// 뒤에 || '-' 를 붙여 undefined일 경우 하이픈으로 대체하도록 규격을 맞춰줍니다.
<Info label="최근 방문일" value={c.lastVisit || '-'} />              <Info label="결제 상태" value={c.paymentStatus} />
              <Info label="누적 결제금액" value={`${c.totalPayment.toLocaleString()}원`} />
            </div>
          </div>

          {/* 골프 정보 */}
          {(c.handicap || c.footSize || c.gloveSize) && (
            <div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">골프 정보</p>
              <div className="grid grid-cols-3 gap-3">
                {c.handicap && (
                  <div className="bg-[#F4F6F8] rounded-xl p-3 text-center">
                    <p className="text-xs text-[#9CA3AF] mb-1">핸디캡</p>
                    <p className="text-sm font-bold text-[#1F2937]">{c.handicap}</p>
                  </div>
                )}
                {c.footSize && (
                  <div className="bg-[#F4F6F8] rounded-xl p-3 text-center">
                    <p className="text-xs text-[#9CA3AF] mb-1">발 사이즈</p>
                    <p className="text-sm font-bold text-[#1F2937]">{c.footSize}mm</p>
                  </div>
                )}
                {c.gloveSize && (
                  <div className="bg-[#F4F6F8] rounded-xl p-3 text-center">
                    <p className="text-xs text-[#9CA3AF] mb-1">장갑 사이즈</p>
                    <p className="text-sm font-bold text-[#1F2937]">{c.gloveSize}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 관심 서비스 */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">관심 서비스</p>
            <div className="flex flex-wrap gap-1.5">
              {c.services.length > 0
                ? c.services.map((s) => <span key={s} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{s}</span>)
                : <span className="text-xs text-gray-400">없음</span>}
            </div>
          </div>

          {/* 주요 고민 */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">주요 고민</p>
            <div className="flex flex-wrap gap-1.5">
              {c.concerns.length > 0
                ? c.concerns.map((con) => <span key={con} className="px-2.5 py-1 bg-gray-900 text-white rounded-full text-xs font-medium">{con}</span>)
                : <span className="text-xs text-gray-400">없음</span>}
            </div>
          </div>

          {/* 메모 */}
          {c.memo && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">메모</p>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3">{c.memo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
