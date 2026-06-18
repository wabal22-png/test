// utils/date.ts

// 예약 달력에 표시될 기본 시간 슬롯 설정
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

// 오늘 날짜 반환
export function getToday(): Date {
  return new Date();
}

// 기준 날짜가 포함된 일주일(월~일)의 Date 객체 배열 반환
export function getWeekDays(baseDate: Date = new Date()): Date[] {
  const currentDay = baseDate.getDay();
  const startOfWeek = new Date(baseDate);
  
  // 월요일을 한 주의 시작으로 설정 (일요일인 경우 전주 처리)
  const distance = currentDay === 0 ? -6 : 1 - currentDay;
  startOfWeek.setDate(baseDate.getDate() + distance);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
}

// 이전주 또는 다음주로 이동한 날짜 계산
export function moveWeek(baseDate: Date, direction: 'prev' | 'next'): Date {
  const newDate = new Date(baseDate);
  const days = direction === 'next' ? 7 : -7;
  newDate.setDate(baseDate.getDate() + days);
  return newDate;
}

// 달력 헤더에 표시할 날짜 포맷 (예: 월 06/18)
export function formatDayLabel(date: Date): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${days[date.getDay()]} ${month}/${day}`;
}

// 특정 날짜와 시간 슬롯에 해당하는 예약 데이터 필터링 함순
export function getReservationsByDateTime(reservations: any[], date: Date, timeSlot: string): any[] {
  if (!reservations) return [];
  const targetDateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  
  return reservations.filter((res) => {
    if (!res || !res.date) return false;
    const resDateStr = res.date instanceof Date 
      ? res.date.getFullYear() + '-' + String(res.date.getMonth() + 1).padStart(2, '0') + '-' + String(res.date.getDate()).padStart(2, '0')
      : String(res.date).split('T')[0];
    return resDateStr === targetDateStr && res.time === timeSlot;
  });
}