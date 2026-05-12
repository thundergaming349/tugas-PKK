import { useAuth } from '../../context/AuthContext';
import { IoCalendarOutline, IoStatsChartOutline, IoBookOutline, IoSchoolOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  const { user } = useAuth();

  const features = [
    {
      icon: IoBookOutline,
      title: 'Mata Pelajaran',
      description: 'Lihat daftar mata pelajaran yang Anda ampu beserta detailnya.',
      link: '/teacher/subjects',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: IoCalendarOutline,
      title: 'Kelola Sesi',
      description: 'Buat dan kelola sesi pembelajaran, serta atur absensi siswa.',
      link: '/teacher/sessions',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: IoStatsChartOutline,
      title: 'Ringkasan Kehadiran',
      description: 'Pantau statistik kehadiran siswa per sesi dalam bentuk grafik.',
      link: '/teacher/summary',
      color: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-sidebar to-sidebar-dark rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <IoSchoolOutline className="text-2xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-4">
            Selamat Datang, {user?.full_name || 'Guru'}! 👋
          </h1>
          <p className="text-white/70 mt-2 text-lg max-w-2xl">
            Kelola sesi pembelajaran, pantau kehadiran siswa, dan lihat performa kelas Anda 
            melalui dashboard guru yang informatif.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Fitur Guru</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="card group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-2xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">ℹ️ Tentang Panel Guru</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Sebagai guru, Anda memiliki akses untuk membuat sesi pembelajaran baru, mengelola absensi siswa, 
          dan melihat ringkasan kehadiran per sesi. Anda juga dapat mengubah status kehadiran siswa 
          (hadir, sakit, izin, atau alfa) langsung dari halaman detail sesi.
        </p>
      </div>
    </div>
  );
}
