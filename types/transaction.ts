// types/transaction.ts

export type TransactionType = '입금' | '출금' | 'income' | 'expense' | string;
export type TransactionCategory = '수업료' | '체험비' | 'VIP프로그램' | '광고비' | '임대료' | '인건비' | '장비비' | '소모품' | '기타' | string;
export type PaymentMethod = '카드' | '현금' | '계좌이체' | '간편결제' | 'card' | 'cms' | 'cash' | 'bank' | string;
export type TransactionStatus = 'completed' | 'pending' | 'failed' | string;

export interface Transaction {
  id: string;
  date: string;
  customerName?: string;
  counterpart: string;
  type: TransactionType;
  category: string;
  amount: number;
  method?: string;
  paymentMethod?: PaymentMethod;
  status?: TransactionStatus;
  hasReceipt?: boolean;
  hasTaxInvoice?: boolean;
  memo?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}