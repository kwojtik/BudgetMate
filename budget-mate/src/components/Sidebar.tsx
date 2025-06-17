'use client';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access');
    router.push('/login');
  };

  return (
    <div className="w-64 bg-violet-700 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">BudgetMate</h2>
      <button onClick={() => router.push('/dashboard')} className="mb-2 hover:underline">My Budgets</button>
      <button onClick={handleLogout} className="hover:underline text-red-300">Log Out</button>
    </div>
  );
}
