import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Modal from "../../components/Modal";
import {
    IoCalendarOutline,
    IoTimeOutline,
    IoBookOutline,
    IoAddOutline,
    IoChevronForwardOutline,
} from "react-icons/io5";

// Helper: check if a session is still active (not yet finished)
function isSessionActive(session) {
    const now = new Date();
    const sessionDate = new Date(session.date + "T" + session.end + ":00");
    return sessionDate >= now;
}

export default function TeacherSessions() {
    const [allSessions, setAllSessions] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [formData, setFormData] = useState({
        class_id: "",
        subject_id: "",
        date: "",
        start: "",
        end: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sessRes, subjRes, clsRes] = await Promise.all([
                api.get("/session/teacher"),
                api.get("/teacher/subject"),
                api.get("/teacher/class"),
            ]);
            setAllSessions(sessRes.data.session || []);
            setSubjects(subjRes.data.subject || []);
            setClasses(clsRes.data.class || []);
        } catch (err) {
            setError("Gagal memuat data.");
        } finally {
            setLoading(false);
        }
    };

    console.log(allSessions);

    // Only show active (not yet finished) sessions
    const sessions = allSessions.filter(isSessionActive);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();
        setCreating(true);
        setMessage({ text: "", type: "" });
        try {
            await api.post("/session/", formData);
            setMessage({ text: "Sesi berhasil dibuat!", type: "success" });
            setShowCreateModal(false);
            setFormData({
                class_id: "",
                subject_id: "",
                date: "",
                start: "",
                end: "",
            });
            fetchData();
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || "Gagal membuat sesi.",
                type: "error",
            });
        } finally {
            setCreating(false);
        }
    };

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
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Sesi Pembelajaran
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Sesi yang sedang aktif / belum selesai
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    id="create-session-btn"
                    className="btn-primary flex items-center gap-2"
                >
                    <IoAddOutline className="text-lg" />
                    Tambah Sesi
                </button>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {message.text && (
                <div
                    className={`p-4 rounded-xl animate-scale-in ${
                        message.type === "success"
                            ? "bg-emerald-50 border border-emerald-100 text-emerald-600"
                            : "bg-red-50 border border-red-100 text-red-600"
                    }`}
                >
                    <p className="text-sm font-medium">{message.text}</p>
                </div>
            )}

            {sessions.length === 0 ? (
                <div className="card text-center py-12">
                    <IoCalendarOutline className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600">
                        Tidak Ada Sesi Aktif
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Semua sesi telah selesai. Cek halaman{" "}
                        <Link
                            to="/teacher/archive"
                            className="text-accent hover:underline"
                        >
                            Arsip
                        </Link>{" "}
                        atau buat sesi baru.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {sessions.map((session, index) => (
                        <Link
                            key={session.id}
                            to={`/teacher/sessions/${session.id}`}
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
                                    <p className="text-gray-400 text-sm">
                                        {session.class_name}
                                    </p>
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

            {/* Create Session Modal */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Tambah Sesi Baru"
            >
                <form onSubmit={handleCreateSession} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Kelas
                        </label>
                        <select
                            name="class_id"
                            value={formData.class_id}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            <option value="">Pilih kelas...</option>
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Mata Pelajaran
                        </label>
                        <select
                            name="subject_id"
                            value={formData.subject_id}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            <option value="">Pilih mata pelajaran...</option>
                            {subjects.map((subj) => (
                                <option key={subj.id} value={subj.id}>
                                    {subj.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Tanggal
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Waktu Mulai
                            </label>
                            <input
                                type="time"
                                name="start"
                                value={formData.start}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Waktu Selesai
                            </label>
                            <input
                                type="time"
                                name="end"
                                value={formData.end}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowCreateModal(false)}
                            className="btn-secondary flex-1"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={creating}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                        >
                            {creating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Membuat...
                                </>
                            ) : (
                                "Buat Sesi"
                            )}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
