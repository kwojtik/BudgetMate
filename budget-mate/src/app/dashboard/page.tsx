'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_BUDGET_API}/api/budgets/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBudgets(data);
        } else {
          console.warn('Dane nie są tablicą:', data);
          setBudgets([]); // fallback
        }
      })
      .catch(err => {
        console.error('Błąd pobierania:', err);
        setBudgets([]);
      });
  }, []);

  const handleAddBudget = async () => {
    const token = localStorage.getItem('access');
    if (!token) return;
    if (!newName.trim()) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BUDGET_API}/api/budgets/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    });
    if (res.ok) {
      const created = await res.json();
      setBudgets([...budgets, created]);
      setNewName('');
    } else {
      alert('Błąd przy dodawaniu budżetu');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Twoje budżety</h1>

        <div className="flex items-center mb-6 gap-2">
          <input
            type="text"
            className="input"
            placeholder="Nazwa nowego budżetu"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleAddBudget} className="btn bg-white text-purple-700 font-semibold">
            Dodaj budżet
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget) => (
            <div
              key={budget.id}
              className="bg-white text-black rounded shadow-md p-4 hover:bg-gray-100 cursor-pointer transition"
              onClick={() => router.push(`/budget/${budget.id}`)}
            >
              <h2 className="text-xl font-semibold">{budget.name}</h2>
              <p className="text-sm text-gray-500">ID: {budget.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
