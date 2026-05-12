import { useAuth } from '../../context/AuthContext';
import { IoBookOutline, IoSchoolOutline, IoPeopleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();

  const features = [
    { icon: IoBookOutline, title: 'Manajemen Mata Pelajaran', description: 'Tambah, edit, dan hapus data mata pelajaran.', link: '/admin/subjects', color: 'bg-indigo-50 text-indigo-600' },
    { icon: IoSchoolOutline, title: 'Manajemen Kelas', description: 'Kelola data kelas yang tersedia di sekolah.', link: '/admin/classes', color: 'bg-blue-50 text-blue-600' },
    { icon: IoPeopleOutline, title: 'Manajemen Siswa', description: 'Lihat dan kelola data siswa per kelas.', link: '/admin/students', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-sidebar to-sidebar-dark rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
            <IoSchoolOutline className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">Selamat Datang, {user?.full_name || 'Admin'}! 👋</h1>
          <p className="text-white/70 mt-2 text-lg max-w-2xl">
            Kelola seluruh data mata pelajaran, kelas, dan siswa melalui panel admin LMS.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Fitur Admin</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link key={i} to={f.link} className="card group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-2xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">ℹ️ Tentang Panel Admin</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Sebagai admin, Anda memiliki kontrol penuh atas data mata pelajaran dan kelas. 
          Anda dapat menambah, mengubah, dan menghapus data sesuai kebutuhan sekolah.
        </p>
      </div>
    </div>
  );
}
