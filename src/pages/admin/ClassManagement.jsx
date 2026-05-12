import { useState, useEffect } from 'react';
import api from '../../services/api';
import Modal from '../../components/Modal';
import { IoSchoolOutline, IoAddOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/class');
      setClasses(res.data.class || []);
    } catch { setMessage({ text: 'Gagal memuat data.', type: 'error' }); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setFormData({ name: '' }); setShowModal(true); };
  const openEdit = (c) => { setEditing(c); setFormData({ name: c.name }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });
    try {
      if (editing) {
        await api.put(`/admin/class/${editing.id}`, formData);
        setMessage({ text: 'Kelas berhasil diperbarui!', type: 'success' });
      } else {
        await api.post('/admin/class', formData);
        setMessage({ text: 'Kelas berhasil ditambahkan!', type: 'success' });
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Gagal menyimpan.', type: 'error' });
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus kelas ini?')) return;
    try {
      await api.delete(`/admin/class/${id}`);
      setMessage({ text: 'Kelas berhasil dihapus!', type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Gagal menghapus.', type: 'error' });
    }
  };

  if (loading) return <div className="space-y-4"><div className="skeleton h-8 w-48"></div><div className="skeleton h-64 w-full"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Kelas</h1>
          <p className="text-gray-500 mt-1">Kelola data kelas</p>
        </div>
        <button onClick={openCreate} id="add-class-btn" className="btn-primary flex items-center gap-2">
          <IoAddOutline className="text-lg" /> Tambah
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl animate-scale-in ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' : 'bg-red-50 border border-red-100 text-red-600'}`}>
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {classes.length === 0 ? (
        <div className="card text-center py-12">
          <IoSchoolOutline className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">Belum Ada Kelas</h3>
        </div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="table-header">ID</th>
              <th className="table-header">Nama Kelas</th>
              <th className="table-header text-right">Aksi</th>
            </tr></thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="table-cell text-gray-400">#{c.id}</td>
                  <td className="table-cell font-medium">{c.name}</td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-sidebar hover:bg-sidebar/10 transition-colors"><IoCreateOutline size={16} /></button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><IoTrashOutline size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Kelas' : 'Tambah Kelas'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Kelas</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ name: e.target.value })} className="input-field" placeholder="Contoh: XII IPA 1" required />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Batal</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {submitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Menyimpan...</> : 'Simpan'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
