import { useState, useEffect } from 'react';
import api from '../../services/api';
import { IoPeopleOutline, IoSchoolOutline } from 'react-icons/io5';

export default function StudentManagement() {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchClasses(); }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get('/admin/class');
      setClasses(res.data.class || []);
    } catch { setError('Gagal memuat data kelas.'); }
    finally { setLoading(false); }
  };

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setSelectedClassId(classId);
    if (!classId) { setStudents([]); return; }

    setStudentsLoading(true);
    try {
      // Fetch sessions for this class to get student data
      // Note: Backend doesn't have a direct admin endpoint for students per class
      // We show the class info for now
      setStudents([]);
      setError('');
    } catch {
      setError('Gagal memuat data siswa.');
    } finally {
      setStudentsLoading(false);
    }
  };

  if (loading) return <div className="space-y-4"><div className="skeleton h-8 w-48"></div><div className="skeleton h-64 w-full"></div></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Siswa</h1>
        <p className="text-gray-500 mt-1">Lihat data siswa berdasarkan kelas</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Class Selector */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <IoSchoolOutline className="text-sidebar" />
          <label className="font-medium text-gray-700">Pilih Kelas</label>
        </div>
        <select
          value={selectedClassId}
          onChange={handleClassChange}
          className="input-field"
          id="student-class-select"
        >
          <option value="">-- Pilih Kelas --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </div>

      {studentsLoading && (
        <div className="skeleton h-48 w-full"></div>
      )}

      {selectedClassId && !studentsLoading && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <IoPeopleOutline className="text-sidebar text-xl" />
            <h2 className="text-lg font-semibold text-gray-800">Data Siswa</h2>
          </div>

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <IoPeopleOutline className="text-amber-500 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Fitur Segera Hadir</h3>
            <p className="text-gray-400 text-sm max-w-md">
              Endpoint backend untuk manajemen siswa oleh admin belum tersedia. 
              Silakan tambahkan endpoint CRUD siswa di backend untuk mengaktifkan fitur ini.
            </p>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-left max-w-md w-full">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Endpoint yang Dibutuhkan:</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">GET /api/admin/students?class_id=X</code></li>
                <li><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">POST /api/admin/students</code></li>
                <li><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">PUT /api/admin/students/{'{id}'}</code></li>
                <li><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">DELETE /api/admin/students/{'{id}'}</code></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
