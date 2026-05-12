import { useAuth } from "../../context/AuthContext";
import {
    IoCalendarOutline,
    IoStatsChartOutline,
    IoSchoolOutline,
    IoTimeOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
    const { user } = useAuth();

    const features = [
        {
            icon: IoCalendarOutline,
            title: "Sesi Pembelajaran",
            description:
                "Lihat jadwal sesi kelas dan lakukan absensi secara real-time.",
            link: "/student/sessions",
            color: "bg-blue-50 text-blue-600",
        },
        {
            icon: IoStatsChartOutline,
            title: "Ringkasan Kehadiran",
            description:
                "Pantau statistik kehadiran Anda dalam bentuk grafik interaktif.",
            link: "/student/summary",
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            icon: IoTimeOutline,
            title: "Absensi Digital",
            description:
                "Lakukan absensi langsung dari perangkat Anda tanpa antri.",
            link: "/student/sessions",
            color: "bg-purple-50 text-purple-600",
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
                        Selamat Datang, {user?.full_name || "Siswa"}! 👋
                    </h1>
                    <p className="text-white/70 mt-2 text-lg max-w-2xl">
                        Selamat datang di PintarApps. Platform ini membantu Anda
                        mengelola kehadiran, melihat jadwal sesi pembelajaran,
                        dan memantau performa belajar Anda secara digital.
                    </p>
                </div>
            </div>

            {/* Feature Cards */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Fitur Tersedia
                </h2>
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
                                <div
                                    className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <Icon className="text-2xl" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Quick Info */}
            <div className="card">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    ℹ️ Tentang PintarApps
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                    PintarApps adalah platform digital yang dirancang untuk
                    memudahkan proses manajemen kehadiran di sekolah. Dengan
                    LMS, siswa dapat melakukan absensi secara online, melihat
                    jadwal sesi pembelajaran, dan memantau rekam jejak kehadiran
                    melalui ringkasan statistik yang informatif. Seluruh data
                    dikelola secara terpusat dan dapat diakses kapan saja.
                </p>
            </div>
        </div>
    );
}
