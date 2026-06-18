// types/coach.ts

export type CoachStatus = 'active' | 'inactive' | string;

export interface Coach {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  specialties?: string[]; // 담당 전문 분야 (예: 요가, 필라테스 등)
  status: CoachStatus;
  createdAt?: string;
}