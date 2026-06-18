// types/transaction.ts

export type TransactionType = 'income' | 'expense' | string;
export type PaymentMethod = 'card' | 'cms' | 'cash' | 'bank' | string;
export type TransactionStatus = 'completed' | 'pending' | 'failed' | string;

export interface Transaction {
  id: string;
  date: string;
  customerName?: string;
  type: TransactionType;
  category: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  description?: string;
  createdAt?: string;
}