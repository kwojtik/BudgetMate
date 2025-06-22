'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import BudgetTable from '@/components/BudgetTable';
import BudgetCharts from '@/components/BudgetCharts';

export default function BudgetPage({ params }: { params: { id: string } }) {
  const [entries, setEntries] = useState<any[]>([]);
  const [budgetName, setBudgetName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access');
    fetch(`${process.env.NEXT_PUBLIC_BUDGET_API}/api/budgets/${params.id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setBudgetName(data.name);
        setEntries(data.entries || []);
      });
  }, [params.id]);

  const total = entries.reduce((acc, entry) => acc + parseFloat(entry.price), 0);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 text-white">
        <h1 className="text-3xl font-bold mb-6">{budgetName}</h1>

        <BudgetTable entries={entries} setEntries={setEntries} budgetId={params.id} total={total} />
        <BudgetCharts entries={entries} />
      </div>
    </div>
  );
}
