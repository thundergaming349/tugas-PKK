import { useState, useEffect } from 'react';
import api from '../../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { IoStatsChartOutline, IoCalendarOutline } from 'react-icons/io5';

const COLORS = ['#34D399', '#F87171', '#FBBF24', '#60A5FA', '#94A3B8'];

export default function TeacherSummary() {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await api.get('/session/teacher');
      setSessions(res.data.session || []);
    } catch (err) {
      setError('Gagal memuat data sesi.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async (sessionId) => {
    setSummaryLoading(true);
    setSummary(null);
    try {
      const res = await api.get(`/summary/get-summary-by-teacher/${sessionId}`);
      setSummary(res.data.summary);
    } catch (err) {
      setError('Gagal memuat ringkasan.');
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleSessionChange = (e) => {
    const val = e.target.value;
    setSelectedSessionId(val);
    if (val) fetchSummary(val);
    else setSummary(null);
  };

  const chartData = summary ? [
    { name: 'Hadir', value: summary.hadir },
    { name: 'Sakit', value: summary.sakit },
    { name: 'Izin', value: summary.izin },
    { name: 'Alfa', value: summary.alfa },
  ].filter(d => d.value > 0) : [];

  const total = summary ? summary['banyak siswa'] : 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2.5 rounded-xl shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-500">{payload[0].value} siswa</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="space-y-4"><div className="skeleton h-8 w-48"></div><div className="skeleton h-64 w-full"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Ringkasan Kehadiran</h1>
        <p className="text-gray-500 mt-1">Pilih sesi untuk melihat statistik kehadiran siswa</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Session Selector */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <IoCalendarOutline className="text-sidebar" />
          <label className="font-medium text-gray-700">Pilih Sesi</label>
        </div>
        <select value={selectedSessionId} onChange={handleSessionChange} className="input-field" id="summary-session-select">
          <option value="">-- Pilih Sesi --</option>
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.subject_name} — {s.class_name} — {s.date}
            </option>
          ))}
        </select>
      </div>

      {summaryLoading && (
        <div className="space-y-4">
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-64 w-full"></div>
        </div>
      )}

      {summary && !summaryLoading && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card text-center"><p className="text-2xl font-bold text-sidebar">{total}</p><p className="text-gray-500 text-xs mt-1">Total Siswa</p></div>
            <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">{summary.hadir}</p><p className="text-gray-500 text-xs mt-1">Hadir</p></div>
            <div className="card text-center"><p className="text-2xl font-bold text-red-400">{summary.tidak_hadir}</p><p className="text-gray-500 text-xs mt-1">Tidak Hadir</p></div>
            <div className="card text-center"><p className="text-2xl font-bold text-amber-400">{summary.sakit + summary.izin}</p><p className="text-gray-500 text-xs mt-1">Sakit/Izin</p></div>
          </div>

          {/* Pie Chart */}
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <IoStatsChartOutline className="text-sidebar text-xl" />
              <h2 className="text-lg font-semibold text-gray-800">Grafik Kehadiran</h2>
            </div>
            {total === 0 ? (
              <p className="text-gray-400 text-center py-8">Tidak ada data.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value" animationDuration={800}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} strokeWidth={0} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} formatter={(v) => <span className="text-sm text-gray-600">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </div>
  );
}
