'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Customer } from '@/types/customer';
import { mockCustomers } from '@/data/mockCustomers';
import { softUpdate, genId, nowTs } from '@/lib/softDelete';

const STORAGE_KEY = 'dl_studio_customers';

/** localStorage에서 불러오기. 없으면 mock 데이터 사용 */
function loadCustomers(): Customer[] {
  if (typeof window === 'undefined') return mockCustomers;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockCustomers;
    const parsed: Customer[] = JSON.parse(raw);
    // mock 데이터에 있는 ID는 유지하고 localStorage에 없는 신규 mock은 병합
    const storedIds = new Set(parsed.map((c) => c.id));
    const newMocks = mockCustomers.filter((m) => !storedIds.has(m.id));
    return [...parsed, ...newMocks];
  } catch {
    return mockCustomers;
  }
}

function saveCustomers(customers: Customer[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (e) {
    console.warn('localStorage 저장 실패:', e);
  }
}

interface CustomerContextType {
  customers: Customer[];
  activeCustomers: Customer[];
  addCustomer: (c: Customer) => void;
  updateCustomer: (id: string, changes: Partial<Customer>) => void;
  deactivateCustomer: (id: string) => void;
}

const CustomerContext = createContext<CustomerContextType | null>(null);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [hydrated, setHydrated] = useState(false);

  // 클라이언트에서만 localStorage 로드
  useEffect(() => {
    setCustomers(loadCustomers());
    setHydrated(true);
  }, []);

  // 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (hydrated) {
      saveCustomers(customers);
    }
  }, [customers, hydrated]);

  const activeCustomers = customers.filter((c) => c.isActive);

  function addCustomer(c: Customer) {
    setCustomers((prev) => [
      ...prev,
      {
        ...c,
        id: c.id || genId('c'),
        isActive: true,
        createdAt: c.createdAt || new Date().toISOString().split('T')[0],
        updatedAt: nowTs(),
      },
    ]);
  }

  function updateCustomer(id: string, changes: Partial<Customer>) {
    setCustomers((prev) => softUpdate(prev, id, changes));
  }

  function deactivateCustomer(id: string) {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, isActive: false, deletedAt: nowTs(), updatedAt: nowTs(), prevSnapshot: JSON.stringify(c) }
          : c
      )
    );
  }

  return (
    <CustomerContext.Provider value={{ customers, activeCustomers, addCustomer, updateCustomer, deactivateCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error('useCustomer must be used inside CustomerProvider');
  return ctx;
}
