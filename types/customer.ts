export type Gender = 'M' | 'F' | 'MALE' | 'FEMALE' | string;

export type CustomerGrade = string;
export type CustomerSource = string;
export type ServiceType = string;
export type ConcernType = string;
export type PaymentStatus = string;

export const GLOVE_SIZES = ['22', '23', '24', '25', '26'] as const;

// 도메인 핵심 엔티티 인터페이스 정의 (런타임 오버헤드가 없는 컴파일 타임 최적화 자산)
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: Gender;
  grade: CustomerGrade;
  source: CustomerSource;
  serviceType: ServiceType;
  concernType: ConcernType;
  paymentStatus: PaymentStatus;
  gloveSize: string;
  memo: string;
  isActive: boolean;
  firstVisit: string; // 대시보드 통계용 최초 방문일 필드 추가 (YYYY-MM-DD)
  createdAt: string;
  updatedAt: string;
}