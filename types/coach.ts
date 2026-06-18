// types/coach.ts
export type CoachStatus = '활동중' | '정지' | string;

export interface Coach {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialty: string; // 단수형 string 구조로 일치
  memo: string;      // 누락된 메모 필드 추가
  status: CoachStatus;
  isActive: boolean; // 누락된 활성화 여부 필드 추가
  createdAt: string;
  updatedAt: string; // 누락된 수정일 필드 추가
}