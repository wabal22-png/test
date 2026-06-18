import { Pass, PassUsage } from '@/types/pass';

export const mockPasses: Pass[] = [
  { id: 'p001', customerId: 'c001', customerName: '김태현', customerPhone: '010-1234-5678', passName: 'VIP코칭 10회권', totalCount: 10, usedCount: 7, remainCount: 3, purchaseDate: '2026-04-01', expiryDate: '2026-07-01', paymentAmount: 1200000, paymentStatus: '결제완료', status: '만료예정', memo: 'VIP 프리미엄 패키지', createdAt: '2026-04-01', updatedAt: '2026-06-03', isActive: true },
  { id: 'p002', customerId: 'c002', customerName: '박수연', customerPhone: '010-2345-6789', passName: '패시브스트레칭 8회권', totalCount: 8, usedCount: 3, remainCount: 5, purchaseDate: '2026-05-01', expiryDate: '2026-08-01', paymentAmount: 480000, paymentStatus: '결제완료', status: '사용중', memo: '허리 통증 집중 케어', createdAt: '2026-05-01', updatedAt: '2026-06-03', isActive: true },
  { id: 'p003', customerId: 'c004', customerName: '최유진', customerPhone: '010-4567-8901', passName: '싱글프로젝트 12회권', totalCount: 12, usedCount: 9, remainCount: 3, purchaseDate: '2026-03-15', expiryDate: '2026-06-15', paymentAmount: 1800000, paymentStatus: '결제완료', status: '만료예정', memo: '싱글 달성 목표 패키지', createdAt: '2026-03-15', updatedAt: '2026-06-03', isActive: true },
  { id: 'p004', customerId: 'c005', customerName: '이준혁', customerPhone: '010-5678-9012', passName: '바디메커니즘 5회권', totalCount: 5, usedCount: 1, remainCount: 4, purchaseDate: '2026-05-29', expiryDate: '2026-08-29', paymentAmount: 350000, paymentStatus: '미결제', status: '사용중', memo: '첫 등록 패키지', createdAt: '2026-05-29', updatedAt: '2026-06-01', isActive: true },
  { id: 'p005', customerId: 'c007', customerName: '윤상호', customerPhone: '010-7890-1234', passName: '비거리향상 6회권', totalCount: 6, usedCount: 4, remainCount: 2, purchaseDate: '2026-04-10', expiryDate: '2026-07-10', paymentAmount: 540000, paymentStatus: '부분결제', status: '만료예정', memo: '잔여 결제 20만원', createdAt: '2026-04-10', updatedAt: '2026-06-02', isActive: true },
  { id: 'p006', customerId: 'c008', customerName: '임지수', customerPhone: '010-8901-2345', passName: 'AI영상분석 4회권', totalCount: 4, usedCount: 1, remainCount: 3, purchaseDate: '2026-05-30', expiryDate: '2026-08-30', paymentAmount: 280000, paymentStatus: '결제완료', status: '사용중', memo: '', createdAt: '2026-05-30', updatedAt: '2026-06-03', isActive: true },
  { id: 'p007', customerId: 'c001', customerName: '김태현', customerPhone: '010-1234-5678', passName: 'VIP코칭 10회권', totalCount: 10, usedCount: 10, remainCount: 0, purchaseDate: '2026-01-01', expiryDate: '2026-04-01', paymentAmount: 1200000, paymentStatus: '결제완료', status: '사용완료', memo: '이전 기간 완료', createdAt: '2026-01-01', updatedAt: '2026-04-01', isActive: true },
  { id: 'p008', customerId: 'c006', customerName: '강혜린', customerPhone: '010-6789-0123', passName: '패시브스트레칭 8회권', totalCount: 8, usedCount: 2, remainCount: 6, purchaseDate: '2025-09-01', expiryDate: '2025-12-01', paymentAmount: 480000, paymentStatus: '결제완료', status: '중지', memo: '고객 장기 미방문으로 중지 처리', createdAt: '2025-09-01', updatedAt: '2025-12-01', isActive: true },
];

export const mockPassUsages: PassUsage[] = [
  { id: 'u001', passId: 'p001', customerId: 'c001', customerName: '김태현', usedDate: '2026-06-01', program: 'VIP코칭', instructor: '김보형', reservationId: 'r_c001_20260601', deductCount: 1, memo: '필드 라운딩 코칭', createdAt: '2026-06-01', isActive: true },
  { id: 'u002', passId: 'p001', customerId: 'c001', customerName: '김태현', usedDate: '2026-05-28', program: 'VIP코칭', instructor: '김보형', reservationId: 'r_c001_20260528', deductCount: 1, memo: '', createdAt: '2026-05-28', isActive: true },
  { id: 'u003', passId: 'p001', customerId: 'c001', customerName: '김태현', usedDate: '2026-05-21', program: 'VIP코칭', instructor: '김보형', reservationId: '', deductCount: 1, memo: '', createdAt: '2026-05-21', isActive: true },
  { id: 'u004', passId: 'p001', customerId: 'c001', customerName: '김태현', usedDate: '2026-05-14', program: 'VIP코칭', instructor: '김보형', reservationId: '', deductCount: 1, memo: '', createdAt: '2026-05-14', isActive: true },
  { id: 'u005', passId: 'p002', customerId: 'c002', customerName: '박수연', usedDate: '2026-06-03', program: '패시브스트레칭', instructor: '마틴프로', reservationId: 'r_c002_20260603', deductCount: 1, memo: '허리 통증 집중', createdAt: '2026-06-03', isActive: true },
  { id: 'u006', passId: 'p002', customerId: 'c002', customerName: '박수연', usedDate: '2026-05-27', program: '패시브스트레칭', instructor: '마틴프로', reservationId: '', deductCount: 1, memo: '', createdAt: '2026-05-27', isActive: true },
  { id: 'u007', passId: 'p003', customerId: 'c004', customerName: '최유진', usedDate: '2026-06-02', program: '싱글프로젝트', instructor: '마틴프로', reservationId: '', deductCount: 1, memo: '', createdAt: '2026-06-02', isActive: true },
  { id: 'u008', passId: 'p005', customerId: 'c007', customerName: '윤상호', usedDate: '2026-06-02', program: '비거리향상', instructor: '마틴프로', reservationId: 'r_c007_20260602', deductCount: 1, memo: '', createdAt: '2026-06-02', isActive: true },
];

export const DEFAULT_PASSES = mockPasses.map((p) => ({ ...p }));
