export type CoachStatus = '활동중' | '정지' | string;

export interface Coach {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialty: string;
  memo: string;
  status: CoachStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  prevSnapshot?: string; // 히스토리 추적을 위한 스냅샷 필드 최적화 추가
}