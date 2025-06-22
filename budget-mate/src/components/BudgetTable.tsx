'use client';
import { useState } from 'react';

export default function BudgetTable({ entries, setEntries, budgetId, total }: { entries: any[], setEntries: Function, budgetId: string, total: number }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({ date: '', what: '', category: '', price: '' });

  const handleAddRow = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      alert("No token - session ended");
      return;
    }

    const entryData = {
      ...newEntry,
      price: parseFloat(newEntry.price),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BUDGET_API}/api/budgets/${budgetId}/entries/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    });

    if (res.ok) {
      const saved = await res.json();
      setEntries([...entries, saved]);
      setNewEntry({ date: '', what: '', category: '', price: '' });
      setIsAdding(false);
    } else {
      const error = await res.json();
      console.error("Save error:", error);
      alert('Save error. Check data');
    }
  };

  return (
    <div className="bg-white text-black rounded shadow overflow-x-auto">
      <div className="bg-white text-black rounded shadow overflow-x-auto max-h-[290px] overflow-y-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 z-10 bg-gray-200">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">What</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-3">{entry.date}</td>
                <td className="p-3">{entry.what}</td>
                <td className="p-3">{entry.category}</td>
                <td className="p-3">{entry.price}</td>
              </tr>
            ))}

            {isAdding && (
              <tr className="bg-purple-50">
                <td className="p-2"><input type="date" className="input" onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} /></td>
                <td className="p-2"><input type="text" className="input" placeholder="What" onChange={(e) => setNewEntry({ ...newEntry, what: e.target.value })} /></td>
                <td className="p-2"><input type="text" className="input" placeholder="Category" onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })} /></td>
                <td className="p-2"><input type="number" className="input" placeholder="Price" onChange={(e) => setNewEntry({ ...newEntry, price: e.target.value })} /></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-xl font-semibold text-right pr-4">
        Sum: {total.toFixed(2)} zł
      </div>

      <div className="p-4">
        {!isAdding ? (
          <button onClick={() => setIsAdding(true)} className="btn bg-gradient-to-r from-pink-500 to-orange-500 text-white">
            Add
          </button>
        ) : (
          <button onClick={handleAddRow} className="btn bg-purple-600 text-white">
            Save
          </button>
        )}
      </div>
    </div>
  );
}
