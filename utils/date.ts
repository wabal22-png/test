// utils/date.ts

import { Reservation } from '@/types/reservation';

// 예약 달력에 표시될 기본 시간 슬롯 설정
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

// 오늘 날짜 문자열 반환 (YYYY-MM-DD)
export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

// 기준 날짜가 포함된 일주일(월~일)의 YYYY-MM-DD 배열 반환
export function getWeekDays(baseDate: string): string[] {
  const d = new Date(baseDate + 'T00:00:00');
  const currentDay = d.getDay();
  const distance = currentDay === 0 ? -6 : 1 - currentDay;
  const startOfWeek = new Date(d);
  startOfWeek.setDate(d.getDate() + distance);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day.toISOString().split('T')[0];
  });
}

// 이전주 또는 다음주로 이동한 날짜 계산
export function moveWeek(baseDate: string, direction: number): string {
  const d = new Date(baseDate + 'T00:00:00');
  d.setDate(d.getDate() + direction * 7);
  return d.toISOString().split('T')[0];
}

// 달력 헤더에 표시할 날짜 포맷 — { mmdd: '06/18', dow: '수' }
export function formatDayLabel(dateStr: string): { mmdd: string; dow: string } {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return { mmdd: `${month}/${day}`, dow: days[d.getDay()] };
}

// 특정 날짜와 시간 슬롯에 해당하는 예약 데이터 필터링
export function getReservationsByDateTime(reservations: Reservation[], dateStr: string, timeSlot: string): Reservation[] {
  if (!reservations) return [];
  return reservations.filter((res) => {
    if (!res || !res.date) return false;
    const resDateStr = String(res.date).split('T')[0];
    return resDateStr === dateStr && res.time === timeSlot;
  });
}