// types/reservation.ts

export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | string;
export type InstructorType = string;
export type RoomType = string;
export type ProgramType = string;

export interface Reservation {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  customerId: string;
  customerName: string;
  instructor: InstructorType;
  program: ProgramType;
  room?: RoomType;
  status: ReservationStatus;
  notes?: string;
  createdAt?: string;
}