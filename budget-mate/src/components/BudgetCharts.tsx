'use client';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { parseISO, format, subMonths, isAfter } from 'date-fns';

export default function BudgetCharts({ entries }: { entries: any[] }) {
  const now = new Date();

  // Filtrowanie danych z ostatnich 30 dni
  const last30Days = entries.filter(entry => {
    const date = new Date(entry.date);
    return isAfter(date, subMonths(now, 1));
  });

  const dailyTotals: Record<string, number> = {};
  last30Days.forEach(entry => {
    const date = format(parseISO(entry.date), 'yyyy-MM-dd');
    dailyTotals[date] = (dailyTotals[date] || 0) + parseFloat(entry.price);
  });

  const dailyData = Object.entries(dailyTotals)
    .map(([date, sum]) => ({ date, sum }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Dane z ostatnich 6 miesięcy grupowane miesięcznie
  const last6Months = entries.filter(entry => {
    const date = new Date(entry.date);
    return isAfter(date, subMonths(now, 6));
  });

  const monthlyTotals: Record<string, number> = {};
  last6Months.forEach(entry => {
    const month = format(parseISO(entry.date), 'yyyy-MM');
    monthlyTotals[month] = (monthlyTotals[month] || 0) + parseFloat(entry.price);
  });

  const monthlyData = Object.entries(monthlyTotals)
    .map(([month, sum]) => ({ month, sum }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return (
    <div className="mt-12 flex flex-col lg:flex-row gap-6">
    {/* Wykres 1 */}
    <div className="bg-white text-black rounded shadow p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4">Last month</h2>
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="linear" dataKey="sum" stroke="#9333ea" strokeWidth={2} />
        </LineChart>
        </ResponsiveContainer>
    </div>

    {/* Wykres 2 */}
    <div className="bg-white text-black rounded shadow p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4">Last 6 months</h2>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sum" fill="#f472b6" />
        </BarChart>
        </ResponsiveContainer>
    </div>
    </div>
  );
}
