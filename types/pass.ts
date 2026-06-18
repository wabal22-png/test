// types/pass.ts

export type PassStatus = '사용중' | '만료예정' | '사용완료' | '중지';
export type PassPaymentStatus = '결제완료' | '미결제' | '부분결제';

export interface Pass {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  passName: string;
  totalCount: number;
  usedCount: number;
  remainCount: number;
  purchaseDate: string;
  expiryDate: string;
  paymentAmount: number;
  paymentStatus: PassPaymentStatus;
  status: PassStatus;
  memo: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  deletedAt?: string;
}

export interface PassUsage {
  id: string;
  passId: string;
  customerId: string;
  customerName: string;
  usedDate: string;
  program: string;
  instructor: string;
  reservationId: string;
  deductCount: number;
  memo: string;
  createdAt: string;
  isActive: boolean;
}
