// types/reservation.ts

export type ReservationStatus = '예약완료' | '수업완료' | '취소' | '노쇼' | '변경요청' | 'confirmed' | 'pending' | 'cancelled' | string;
export type ReservationPaymentStatus = '미결제' | '결제완료' | '부분결제' | string;
export type InstructorType = string;
export type RoomType = string;
export type ProgramType = string;

export interface Reservation {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  customerId: string;
  customerName: string;
  customerPhone?: string;
  instructor: InstructorType;
  program: ProgramType;
  room?: RoomType;
  status: ReservationStatus;
  paymentStatus?: ReservationPaymentStatus;
  memo?: string;
  cancelReason?: string;
  notes?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  prevSnapshot?: string;
}