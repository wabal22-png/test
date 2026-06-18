// types/customer.ts

export type Gender = 'M' | 'F' | 'MALE' | 'FEMALE' | string;

export type CustomerGrade = string;
export type CustomerSource = string;
export type ServiceType = string;
                export type ConcernType = string;
export type PaymentStatus = string;

export const GLOVE_SIZES = ['22', '23', '24', '25', '26'] as const;

// types/customer.ts

// types/customer.ts

// types/customer.ts

// types/customer.ts

// types/customer.ts

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender?: Gender;
  grade: CustomerGrade;
  source: CustomerSource;
  serviceType?: ServiceType;
  concernType?: ConcernType;
  paymentStatus: PaymentStatus;
  gloveSize: string;
  memo: string;
  isActive: boolean;
  firstVisit: string;
  
  // 💡 코치 관련 연동 필드 일치화
  coachName?: string;
  coach?: string;
  coachId?: string;   // ✨ 신규 추가: 폼 컴포넌트 초기값에서 요구하는 코치 ID 필드
  lastVisit?: string;
  
  totalPayment: number;
  handicap?: string;
  footSize?: string;
  services: string[];
  concerns: string[];
  createdAt: string;
  updatedAt: string;
  prevSnapshot?: string;
}