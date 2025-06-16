'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_BUDGET_API}/api/budgets/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setBudgets);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Twoje budżety</h1>
      <ul>
        {budgets.map((b: any) => (
          <li key={b.id} className="bg-gray-100 p-2 mb-2 rounded">{b.name}</li>
        ))}
      </ul>
    </div>
  );
}
