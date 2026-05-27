import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import {
  IoArrowBackOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoDocumentTextOutline,
  IoAddOutline,
  IoTrashOutline,
  IoAttachOutline,
} from 'react-icons/io5';

export default function TeacherSessionDetail() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [students, setStudents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Post form state
  const [showPostForm, setShowPostForm] = useState(false);
  const [postCaption, setPostCaption] = useState('');
  const [postFiles, setPostFiles] = useState(null);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [sessRes, studRes, postRes] = await Promise.all([
        api.get('/session/teacher'),
        api.get(`/attendance/${id}/student`),
        api.get(`/post/${id}`),
      ]);
      const found = (sessRes.data.session || []).find((s) => s.id === parseInt(id));
      setSession(found || null);
      setStudents(studRes.data.student || []);
      setPosts(postRes.data.post || []);
    } catch (err) {
      setMessage({ text: 'Gagal memuat data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (studentId, status) => {
    setMessage({ text: '', type: '' });
    try {
      await api.put(`/attendance/${studentId}/${id}/${status}`);
      setMessage({ text: `Status berhasil diubah ke ${status}!`, type: 'success' });
      const res = await api.get(`/attendance/${id}/student`);
      setStudents(res.data.student || []);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Gagal mengubah status.', type: 'error' });
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setPosting(true);
    setMessage({ text: '', type: '' });
    try {
      const formData = new FormData();
      formData.append('caption', postCaption);
      formData.append('session_id', id);
      if (postFiles) {
        for (let i = 0; i < postFiles.length; i++) {
          formData.append('attachments[]', postFiles[i]);
        }
      }
      await api.post('/post/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ text: 'Postingan berhasil dibuat!', type: 'success' });
      setPostCaption('');
      setPostFiles(null);
      setShowPostForm(false);
      // Refresh posts
      const postRes = await api.get(`/post/${id}`);
      setPosts(postRes.data.post || []);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Gagal membuat postingan.', type: 'error' });
    } finally {
      setPosting(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Yakin ingin menghapus postingan ini?')) return;
    setMessage({ text: '', type: '' });
    try {
      await api.delete(`/post/${postId}`);
      setMessage({ text: 'Postingan berhasil dihapus!', type: 'success' });
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Gagal menghapus postingan.', type: 'error' });
    }
  };

  const statusBadge = (status) => {
    const map = {
      hadir: 'badge-success',
      sakit: 'badge-warning',
      izin: 'badge-info',
      alfa: 'badge-danger',
    };
    return map[status] || 'badge-info';
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
        <Link to="/teacher/sessions" className="text-accent text-sm mt-2 inline-block hover:underline">
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/teacher/sessions" className="inline-flex items-center gap-2 text-gray-500 hover:text-sidebar transition-colors text-sm font-medium">
        <IoArrowBackOutline /> Kembali ke Daftar Sesi
      </Link>

      {/* Session Info */}
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-800">{session.subject_name}</h1>
        <p className="text-gray-500 mt-1">{session.class_name}</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <IoCalendarOutline className="text-sidebar text-xl" />
            <div>
              <p className="text-xs text-gray-400">Tanggal</p>
              <p className="text-sm font-semibold text-gray-700">{session.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <IoTimeOutline className="text-sidebar text-xl" />
            <div>
              <p className="text-xs text-gray-400">Mulai</p>
              <p className="text-sm font-semibold text-gray-700">{session.start}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <IoTimeOutline className="text-sidebar text-xl" />
            <div>
              <p className="text-xs text-gray-400">Selesai</p>
              <p className="text-sm font-semibold text-gray-700">{session.end}</p>
            </div>
          </div>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl animate-scale-in ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' : 'bg-red-50 border border-red-100 text-red-600'}`}>
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* Posts Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IoDocumentTextOutline className="text-sidebar text-xl" />
            <h2 className="text-lg font-semibold text-gray-800">Postingan</h2>
          </div>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-1.5"
            id="toggle-post-form-btn"
          >
            <IoAddOutline className="text-base" />
            {showPostForm ? 'Batal' : 'Tambah'}
          </button>
        </div>

        {/* Create Post Form */}
        {showPostForm && (
          <form onSubmit={handleCreatePost} className="mb-6 p-4 bg-gray-50 rounded-xl space-y-3 animate-scale-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Caption</label>
              <textarea
                value={postCaption}
                onChange={(e) => setPostCaption(e.target.value)}
                className="input-field min-h-[80px] resize-y"
                placeholder="Tulis caption postingan..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Lampiran (opsional)</label>
              <input
                type="file"
                multiple
                onChange={(e) => setPostFiles(e.target.files)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-sidebar/10 file:text-sidebar hover:file:bg-sidebar/20 file:cursor-pointer file:transition-colors"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={posting}
                className="btn-primary text-sm px-6 py-2 flex items-center gap-2"
              >
                {posting ? (
                  <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Mengirim...</>
                ) : (
                  'Kirim Postingan'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <IoDocumentTextOutline className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Belum ada postingan di sesi ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fade-in">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{post.caption}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(post.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
                    title="Hapus postingan"
                  >
                    <IoTrashOutline size={16} />
                  </button>
                </div>

                {/* Attachments */}
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

      {/* Student List */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <IoPersonOutline className="text-sidebar text-xl" />
          <h2 className="text-lg font-semibold text-gray-800">Daftar Siswa ({students.length})</h2>
        </div>

        {students.length === 0 ? (
          <p className="text-gray-400 text-sm py-4">Tidak ada siswa di sesi ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="table-header">Nama Siswa</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="table-cell font-medium">
                      <div>
                        <span>{student.name}</span>
                        {student.status === 'hadir' && student.attended_at && (
                          <span className="text-xs text-gray-400 font-normal block mt-0.5">
                            Absen pada: {student.attended_at}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={statusBadge(student.status)}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      {student.status !== 'hadir' && (
                        <div className="flex items-center justify-end gap-2">
                          {student.status !== 'sakit' && (
                            <button onClick={() => handleChangeStatus(student.id, 'sakit')} className="px-3 py-1 text-xs font-medium rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors">
                              Sakit
                            </button>
                          )}
                          {student.status !== 'izin' && (
                            <button onClick={() => handleChangeStatus(student.id, 'izin')} className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                              Izin
                            </button>
                          )}
                          {student.status !== 'alfa' && (
                            <button onClick={() => handleChangeStatus(student.id, 'alfa')} className="px-3 py-1 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                              Alfa
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
