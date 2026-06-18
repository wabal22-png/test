// types/setting.ts

export type SettingCategory =
  | 'customerGrade'
  | 'inflowPath'
  | 'interestService'
  | 'painPoint'
  | 'program'
  | 'instructor'
  | 'location';

export interface SettingOption {
  id: string;
  category: SettingCategory;
  name?: string;
  label?: string;
  value?: string;
  isActive: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const SETTING_CATEGORY_LABELS: Record<SettingCategory, string> = {
  customerGrade: '고객 등급',
  inflowPath: '유입 경로',
  interestService: '관심 서비스',
  painPoint: '불편 사항',
  program: '프로그램',
  instructor: '강사',
  location: '위치',
};

export const SETTING_CATEGORY_DESC: Record<SettingCategory, string> = {
  customerGrade: '고객의 등급을 분류하고 관리합니다.',
  inflowPath: '고객이 방문하게 된 경로를 관리합니다.',
  interestService: '고객이 관심을 보인 서비스 항목입니다.',
  painPoint: '고객이 겪고 있는 주요 불편 사항입니다.',
  program: '제공 중인 교육 및 상담 프로그램 목록입니다.',
  instructor: '담당 강사 및 전문가 목록을 관리합니다.',
  location: '서비스가 진행되는 장소 또는 위치 정보입니다.',
};