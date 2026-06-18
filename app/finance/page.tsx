'use client';

import { useState, useEffect } from 'react';
import { mockTransactions } from '@/data/mockTransactions';
import { Transaction } from '@/types/transaction';
import TransactionTable from '@/components/finance/TransactionTable';

const STORAGE_KEY = 'dl_studio_transactions';

function loadTransactions(): Transaction[] {
  if (typeof window === 'undefined') return mockTransactions;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockTransactions;
    const parsed: Transaction[] = JSON.parse(raw);
    const storedIds = new Set(parsed.map((t) => t.id));
    return [...parsed, ...mockTransactions.filter((m) => !storedIds.has(m.id))];
  } catch { return mockTransactions; }
}

export default function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTransactions(loadTransactions());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)); } catch {}
    }
  }, [transactions, hydrated]);

  return <TransactionTable transactions={transactions} onChange={setTransactions} />;
}
