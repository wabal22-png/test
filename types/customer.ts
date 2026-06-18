// types/customer.ts

export type Gender = 'M' | 'F' | 'MALE' | 'FEMALE' | string;

export type CustomerGrade = string;
export type CustomerSource = string;
export type ServiceType = string;
export type ConcernType = string;
export type PaymentStatus = string;

// Form의 Select 박스 등에서 참조하는 장갑 사이즈 상수 배열
export const GLOVE_SIZES = ['22', '23', '24', '25', '26'] as const;