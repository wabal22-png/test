'use client';

import { useState } from 'react';
import { mockTransactions } from '@/data/mockTransactions';
import { mockReservations } from '@/data/mockReservations';
import { usePass } from '@/context/PassContext';
import { useCustomer } from '@/context/CustomerContext';
import { Reservation } from '@/types/reservation';
import StatCard from '@/components/dashboard/StatCard';
import RecentCustomers from '@/components/dashboard/RecentCustomers';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ReservationSummary from '@/components/dashboard/ReservationSummary';
import TodayReservations from '@/components/dashboard/TodayReservations';
import WeeklyReservationCalendar from '@/components/reservations/WeeklyReservationCalendar';
import CustomerDetailPanel from '@/components/customers/CustomerDetailPanel';
import {
  DollarSign, TrendingDown, TrendingUp, Users, Star, UserPlus, AlertCircle, BarChart2, Ticket, AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { passes } = usePass();
  const { activeCustomers } = useCustomer();

  // 캘린더에서 선택된 예약
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const monthlyTx = mockTransactions.filter((t) => t.date.startsWith(thisMonth));
  const income  = monthlyTx.filter((t) => t.type === '입금').reduce((s, t) => s + t.amount, 0);
  const expense = monthlyTx.filter((t) => t.type === '출금').reduce((s, t) => s + t.amount, 0);
  const profit  = income - expense;

  const newCount   = activeCustomers.filter((c) => c.firstVisit.startsWith(thisMonth)).length;
  const trialCount = activeCustomers.filter((c) => c.grade === '체험').length;
  const vipCount   = activeCustomers.filter((c) => c.grade === 'VIP').length;

  const sourceMap: Record<string, number> = {};
  activeCustomers.forEach((c) => { sourceMap[c.source] = (sourceMap[c.source] ?? 0) + 1; });
  const sortedSources = Object.entries(sourceMap).sort((a, b) => b[1] - a[1]);
  const maxSource = sortedSources[0]?.[1] ?? 1;

  const lowPasses      = passes.filter((p) => p.remainCount <= 3 && p.remainCount > 0 && p.status !== '사용완료' && p.status !== '중지');
  const expiringPasses = passes.filter((p) => p.status === '만료예정');

  // 선택된 예약의 고객 찾기
  const selectedCustomer = selectedReservation
    ? activeCustomers.find((c) => c.id === selectedReservation.customerId) ?? null
    : null;

  return (
    <div className="space-y-6">

      {/* ── 예약 요약 ── */}
      <ReservationSummary reservations={mockReservations} />

      {/* ── 주간 캘린더(좌) + 고객 상세 패널(우) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5 items-start">
        {/* 캘린더: 예약 클릭 시 오른쪽 패널에 표시 */}
        <WeeklyReservationCalendar
          reservations={mockReservations}
          compact={true}
          onReservationSelect={setSelectedReservation}
        />

        {/* 우측 패널: 예약 선택 시 고객 상세, 미선택 시 오늘 예약 리스트 */}
        <div className="sticky top-4">
          {selectedCustomer ? (
            <CustomerDetailPanel
              customer={selectedCustomer}
              reservationDate={selectedReservation?.date}
              reservationTime={selectedReservation?.time}
              program={selectedReservation?.program}
              onClose={() => setSelectedReservation(null)}
            />
          ) : (
            <TodayReservations
              reservations={mockReservations}
              onReservationClick={setSelectedReservation}
            />
          )}
        </div>
      </div>

      {/* ── 매출 KPI ── */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-3">이번 달 매출</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="이번 달 매출"   value={`${income.toLocaleString()}원`}   icon={DollarSign}   color="blue"   />
          <StatCard title="이번 달 지출"   value={`${expense.toLocaleString()}원`}  icon={TrendingDown} color="red"    />
          <StatCard title="이번 달 순이익" value={`${profit.toLocaleString()}원`}   icon={TrendingUp}   color="navy"   />
          <StatCard title="미수금"         value="200,000원" sub="미결제+부분결제"   icon={AlertCircle}  color="yellow" />
        </div>
      </div>

      {/* ── 고객 통계 ── */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-3">고객 현황</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="신규 고객" value={`${newCount}명`}            sub="이번 달 등록"  icon={UserPlus} color="blue"  />
          <StatCard title="체험 고객" value={`${trialCount}명`}          sub="현재 체험 중"  icon={Users}    color="teal"  />
          <StatCard title="VIP 고객"  value={`${vipCount}명`}            sub="VIP 등급"     icon={Star}     color="navy"  />
          <StatCard title="전체 고객" value={`${activeCustomers.length}명`}                 icon={Users}    color="green" />
        </div>
      </div>

      {/* ── 이용권 알림 ── */}
      {(lowPasses.length > 0 || expiringPasses.length > 0) && (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 space-y-2.5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Ticket size={15} className="text-[#2F80A7]" />
              <h3 className="font-semibold text-[#1F2937] text-sm">이용권 알림</h3>
            </div>
            <Link href="/passes" className="text-xs text-[#2F80A7] hover:underline">전체보기</Link>
          </div>
          {lowPasses.map((p) => (
            <div key={p.id} className="flex items-center gap-3 bg-[#FFF6D8] rounded-lg px-4 py-2.5">
              <AlertTriangle size={13} className="text-[#A17400] shrink-0" />
              <p className="text-sm text-[#A17400] flex-1"><span className="font-semibold">{p.customerName}</span> · {p.passName}</p>
              <span className="text-sm font-bold text-[#A17400]">잔여 {p.remainCount}회</span>
            </div>
          ))}
          {expiringPasses.map((p) => (
            <div key={p.id} className="flex items-center gap-3 bg-[#FDECEA] rounded-lg px-4 py-2.5">
              <Ticket size={13} className="text-[#C24132] shrink-0" />
              <p className="text-sm text-[#C24132] flex-1"><span className="font-semibold">{p.customerName}</span> · {p.passName}</p>
              <span className="text-sm font-bold text-[#C24132]">만료 {p.expiryDate}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── 최근 고객 + 입출금 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentCustomers customers={activeCustomers} />
        <RecentTransactions transactions={mockTransactions} />
      </div>

      {/* ── 유입경로 차트 ── */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 size={16} className="text-[#2F80A7]" />
          <h3 className="font-semibold text-[#1F2937] text-sm">유입경로별 고객 수</h3>
        </div>
        <div className="space-y-3">
          {sortedSources.map(([source, count], i) => {
            const colors = ['#2F80A7','#7AC29A','#8BC6D9','#E9C46A','#E76F51','#6B7280','#A78BFA'];
            const color = colors[i % colors.length];
            return (
              <div key={source} className="flex items-center gap-4">
                <span className="text-sm text-[#6B7280] w-20 shrink-0">{source}</span>
                <div className="flex-1 bg-[#F3F4F6] rounded-full h-5 overflow-hidden">
                  <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500" style={{ width: `${(count / maxSource) * 100}%`, backgroundColor: color }}>
                    <span className="text-xs font-bold text-white">{count}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1F2937] w-8 text-right">{count}명</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
