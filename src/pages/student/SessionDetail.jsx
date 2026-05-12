import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoAttachOutline,
  IoWarningOutline,
} from 'react-icons/io5';

export default function StudentSessionDetail() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attending, setAttending] = useState(false);
  const [attendStatus, setAttendStatus] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchSessionDetail();
  }, [id]);

  const fetchSessionDetail = async () => {
    try {
      // Get session list and posts
      const [sessRes, postRes] = await Promise.all([
        api.get('/session/student'),
        api.get(`/post/${id}`),
      ]);
      const sessions = sessRes.data.session || [];
      const found = sessions.find((s) => s.id === parseInt(id));
      setSession(found || null);
      setPosts(postRes.data.post || []);

      // Cek apakah sudah absen dari data summary (opsional tapi lebih akurat)
      const summaryRes = await api.get('/summary/get-summary-by-student');
      const attendanceList = summaryRes.data.summary_list || []; // Asumsi ada list detail di summary
      // Jika backend tidak menyediakan list detail di summary, kita bisa mengandalkan 
      // pesan dari backend saat mencoba absen, tapi di sini kita coba cari tahu di awal jika memungkinkan.
      
    } catch (err) {
      setMessage({ text: 'Gagal memuat detail sesi.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk cek apakah sesi sudah dimulai
  const isSessionStarted = () => {
    if (!session) return false;
    const now = new Date();
    const sessionDate = new Date(`${session.date}T${session.start}`);
    return now >= sessionDate;
  };

  const handleAttend = async () => {
    setAttending(true);
    setMessage({ text: '', type: '' });

    // Validasi client-side sebelum kirim ke backend
    if (!isSessionStarted()) {
      setMessage({ text: 'Pertemuan belum dimulai. Silakan tunggu hingga waktu yang ditentukan.', type: 'warning' });
      setAttending(false);
      return;
    }

    try {
      const res = await api.put(`/attendance/${id}/attend`);
      setAttendStatus('hadir');
      setMessage({ text: res.data.message || 'Absen berhasil!', type: 'success' });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Gagal melakukan absensi.';
      const errType = err.response?.data?.type;
      
      if (errType === 'hadir') {
        setAttendStatus('hadir');
        setMessage({ text: 'Peringatan: Anda sudah melakukan absensi sebelumnya.', type: 'warning' });
      } else if (errType === 'start') {
        setMessage({ text: errMsg, type: 'warning' });
      } else {
        setMessage({ text: errMsg, type: 'error' });
      }
    } finally {
      setAttending(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-32"></div>
        <div className="skeleton h-48 w-full"></div>
        <div className="skeleton h-48 w-full"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="card text-center py-12">
        <h3 className="text-lg font-semibold text-gray-600">Sesi tidak ditemukan</h3>
        <Link to="/student/sessions" className="text-accent text-sm mt-2 inline-block hover:underline">
          ← Kembali ke daftar sesi
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/student/sessions"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-sidebar transition-colors text-sm font-medium"
      >
        <IoArrowBackOutline />
        Kembali ke Daftar Sesi
      </Link>

      {/* Session Detail Card */}
      <div className="card">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{session.subject_name}</h1>
            <p className="text-gray-500 mt-1">{session.class_name}</p>
          </div>
          {attendStatus === 'hadir' && (
            <span className="badge-success flex items-center gap-1.5 px-3 py-1.5 text-sm">
              <IoCheckmarkCircleOutline />
              Sudah Hadir
            </span>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <IoCalendarOutline className="text-sidebar text-xl" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Tanggal</p>
              <p className="text-sm font-semibold text-gray-700">{session.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <IoTimeOutline className="text-sidebar text-xl" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Waktu Mulai</p>
              <p className="text-sm font-semibold text-gray-700">{session.start}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <IoTimeOutline className="text-sidebar text-xl" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Waktu Selesai</p>
              <p className="text-sm font-semibold text-gray-700">{session.end}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Action */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Absensi</h2>
        {message.text && (
          <div className={`mb-4 p-4 rounded-xl animate-scale-in flex items-center gap-3 ${
            message.type === 'success' ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' : 
            message.type === 'warning' ? 'bg-amber-50 border border-amber-100 text-amber-600' :
            'bg-red-50 border border-red-100 text-red-600'
          }`}>
            {message.type === 'warning' && <IoWarningOutline className="text-xl flex-shrink-0" />}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}
        {attendStatus === 'hadir' ? (
          <div className="flex items-center gap-3 p-5 bg-emerald-50 rounded-xl">
            <IoCheckmarkCircleOutline className="text-emerald-500 text-2xl flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-700">Anda sudah melakukan absensi</p>
              <p className="text-emerald-600/70 text-sm">Status kehadiran Anda telah tercatat.</p>
            </div>
          </div>
        ) : (
          <button
            onClick={handleAttend}
            disabled={attending || !isSessionStarted()}
            className={`btn-primary py-3 px-8 flex items-center gap-2 disabled:opacity-60 ${
              !isSessionStarted() ? 'cursor-not-allowed grayscale' : ''
            }`}
          >
            {attending ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Memproses...</>
            ) : !isSessionStarted() ? (
              <><IoTimeOutline className="text-lg" />Belum Dimulai</>
            ) : (
              <><IoCheckmarkCircleOutline className="text-lg" />Hadir Sekarang</>
            )}
          </button>
        )}
      </div>

      {/* Posts Section (View Only for Student) */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <IoDocumentTextOutline className="text-sidebar text-xl" />
          <h2 className="text-lg font-semibold text-gray-800">Postingan Guru</h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-8">
            <IoDocumentTextOutline className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Belum ada postingan dari guru untuk sesi ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fade-in">
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{post.caption}</p>
                <p className="text-gray-400 text-xs mt-2">
                  {new Date(post.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </p>

                {post.attachment && post.attachment.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1">
                      <IoAttachOutline /> Lampiran ({post.attachment.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.attachment.map((att) => (
                        <a
                          key={att.id}
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-sidebar hover:bg-sidebar/5 hover:border-sidebar/30 transition-colors"
                        >
                          <IoAttachOutline />
                          Lihat File
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
