'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { SettingOption, SettingCategory } from '@/types/setting';
import { mockSettings, DEFAULT_SETTINGS } from '@/data/mockSettings';
import { softUpdate, genId, nowTs } from '@/lib/softDelete';

interface SettingsContextType {
  settings: SettingOption[];
  getActive: (category: SettingCategory) => SettingOption[];
  getLabels: (category: SettingCategory) => string[];
  addOption: (option: SettingOption) => void;
  updateOption: (id: string, changes: Partial<SettingOption>) => void;
  /** 삭제 없음 — isActive: false 비활성화 */
  deactivateOption: (id: string) => void;
  toggleActive: (id: string) => void;
  reorder: (category: SettingCategory, fromIdx: number, toIdx: number) => void;
  /** 기본값 복원 — 기존 항목은 비활성화하고 기본값을 새로 append */
  resetCategory: (category: SettingCategory) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingOption[]>(mockSettings);

  function getActive(category: SettingCategory) {
    return settings
      .filter((s) => s.category === category && s.isActive)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }

  function getLabels(category: SettingCategory) {
    return getActive(category).map((s) => s.label ?? s.name ?? '');
  }

  function addOption(option: SettingOption) {
    // append only — 기존 데이터 건드리지 않음
    setSettings((prev) => [...prev, {
      ...option,
      id: option.id || genId(option.category),
      createdAt: nowTs(),
      updatedAt: nowTs(),
    }]);
  }

  function updateOption(id: string, changes: Partial<SettingOption>) {
    setSettings((prev) => softUpdate(prev, id, changes));
  }

  /** 삭제 대신 비활성화 */
  function deactivateOption(id: string) {
    setSettings((prev) =>
      prev.map((s) => s.id === id ? { ...s, isActive: false, updatedAt: nowTs() } : s)
    );
  }

  function toggleActive(id: string) {
    setSettings((prev) =>
      prev.map((s) => s.id === id ? { ...s, isActive: !s.isActive, updatedAt: nowTs() } : s)
    );
  }

  function reorder(category: SettingCategory, fromIdx: number, toIdx: number) {
    setSettings((prev) => {
      const catItems = prev
        .filter((s) => s.category === category)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      const others = prev.filter((s) => s.category !== category);
      const [moved] = catItems.splice(fromIdx, 1);
      catItems.splice(toIdx, 0, moved);
      const reordered = catItems.map((s, i) => ({ ...s, sortOrder: i + 1, updatedAt: nowTs() }));
      return [...others, ...reordered];
    });
  }

  /**
   * 기본값 복원: 기존 항목을 삭제하지 않고 비활성화 후,
   * 기본값을 새 ID로 append (누적 관리 원칙)
   */
  function resetCategory(category: SettingCategory) {
    const defaults = DEFAULT_SETTINGS.filter((s) => s.category === category);
    setSettings((prev) => [
      // 기존 해당 카테고리 항목은 isActive: false
      ...prev.map((s) => s.category === category ? { ...s, isActive: false, updatedAt: nowTs() } : s),
      // 기본값을 새 ID로 append
      ...defaults.map((s) => ({ ...s, id: genId(category), isActive: true, createdAt: nowTs(), updatedAt: nowTs() })),
    ]);
  }

  return (
    <SettingsContext.Provider value={{
      settings, getActive, getLabels,
      addOption, updateOption, deactivateOption, toggleActive,
      reorder, resetCategory,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
