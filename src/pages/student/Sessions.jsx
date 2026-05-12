import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { IoCalendarOutline, IoTimeOutline, IoBookOutline, IoChevronForwardOutline } from 'react-icons/io5';

// Helper: check if a session is still active (not yet finished)
function isSessionActive(session) {
  const now = new Date();
  // Menggabungkan tanggal dan waktu selesai untuk pengecekan akurat
  const sessionDate = new Date(session.date + 'T' + session.end + ':00');
  return sessionDate >= now;
}

export default function StudentSessions() {
  const [allSessions, setAllSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await api.get('/session/student');
      setAllSessions(res.data.session || []);
    } catch (err) {
      setError('Gagal memuat data sesi.');
    } finally {
      setLoading(false);
    }
  };

  // Filter hanya sesi yang masih aktif
  const sessions = allSessions.filter(isSessionActive);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-48"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-24 w-full"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sesi Pembelajaran</h1>
        <p className="text-gray-500 mt-1">Daftar sesi aktif yang tersedia untuk kelas Anda</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="card text-center py-12">
          <IoCalendarOutline className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">Tidak Ada Sesi Aktif</h3>
          <p className="text-gray-400 text-sm mt-1">Saat ini tidak ada sesi yang sedang berlangsung atau akan datang.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session, index) => (
            <Link
              key={session.id}
              to={`/student/sessions/${session.id}`}
              className="card flex items-center justify-between group hover:shadow-lg hover:border-sidebar/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sidebar/10 flex items-center justify-center flex-shrink-0">
                  <IoBookOutline className="text-sidebar text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-sidebar transition-colors">
                    {session.subject_name}
                  </h3>
                  <p className="text-gray-400 text-sm">{session.class_name}</p>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <IoCalendarOutline />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <IoTimeOutline />
                      {session.start} - {session.end}
                    </span>
                  </div>
                </div>
              </div>
              <IoChevronForwardOutline className="text-gray-300 text-xl group-hover:text-sidebar group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
