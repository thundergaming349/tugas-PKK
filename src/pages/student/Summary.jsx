import { useState, useEffect } from 'react';
import api from '../../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { IoStatsChartOutline } from 'react-icons/io5';

const COLORS = ['#34D399', '#F87171', '#94A3B8'];

export default function StudentSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await api.get('/summary/get-summary-by-student');
      setSummary(res.data.summary);
    } catch (err) {
      setError('Gagal memuat data ringkasan.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-48"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    );
  }

  const chartData = summary
    ? [
        { name: 'Hadir', value: summary.hadir },
        { name: 'Tidak Hadir', value: summary.tidak_hadir },
      ]
    : [];

  const total = summary ? summary.kelas_tersedia : 0;
  const hadirPct = total > 0 ? ((summary.hadir / total) * 100).toFixed(1) : 0;
  const tidakHadirPct = total > 0 ? ((summary.tidak_hadir / total) * 100).toFixed(1) : 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2.5 rounded-xl shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-500">{payload[0].value} sesi ({total > 0 ? ((payload[0].value / total) * 100).toFixed(1) : 0}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Ringkasan Kehadiran</h1>
        <p className="text-gray-500 mt-1">Statistik kehadiran Anda di seluruh sesi pembelajaran</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-sidebar">{total}</p>
          <p className="text-gray-500 text-sm mt-1">Total Sesi</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-emerald-500">{summary?.hadir || 0}</p>
          <p className="text-gray-500 text-sm mt-1">Hadir ({hadirPct}%)</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-red-400">{summary?.tidak_hadir || 0}</p>
          <p className="text-gray-500 text-sm mt-1">Tidak Hadir ({tidakHadirPct}%)</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <IoStatsChartOutline className="text-sidebar text-xl" />
          <h2 className="text-lg font-semibold text-gray-800">Grafik Kehadiran</h2>
        </div>

        {total === 0 ? (
          <div className="text-center py-12">
            <IoStatsChartOutline className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Belum ada data kehadiran.</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
