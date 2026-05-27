import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import {
    IoCalendarOutline,
    IoTimeOutline,
    IoBookOutline,
    IoArchiveOutline,
    IoChevronForwardOutline,
} from "react-icons/io5";

// Helper: check if session has ended
function isSessionFinished(session) {
    const now = new Date();
    const sessionEnd = new Date(session.date + "T" + session.end + ":00");
    return sessionEnd < now;
}

export default function TeacherArchive() {
    const [allSessions, setAllSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get("/session/teacher");
            setAllSessions(res.data.session || []);
        } catch (err) {
            setError("Gagal memuat data.");
        } finally {
            setLoading(false);
        }
    };

    // Only show finished sessions, sorted newest first
    const archivedSessions = allSessions
        .filter(isSessionFinished)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

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
                <div className="flex items-center gap-3 mb-1">
                    <IoArchiveOutline className="text-sidebar text-2xl" />
                    <h1 className="text-2xl font-bold text-gray-800">
                        Arsip Sesi
                    </h1>
                </div>
                <p className="text-gray-500 mt-1">
                    Sesi pembelajaran yang sudah selesai
                </p>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {archivedSessions.length === 0 ? (
                <div className="card text-center py-12">
                    <IoArchiveOutline className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600">
                        Belum Ada Arsip
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Sesi yang sudah selesai akan otomatis muncul di sini.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {archivedSessions.map((session, index) => (
                        <Link
                            key={session.id}
                            to={`/teacher/sessions/${session.id}`}
                            className="card flex items-center justify-between group hover:shadow-lg hover:border-sidebar/30 transition-all duration-300 animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <IoBookOutline className="text-gray-400 text-xl" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-800 group-hover:text-sidebar transition-colors">
                                            {session.subject_name}
                                        </h3>
                                        <span className="badge bg-gray-100 text-gray-500 text-[10px]">
                                            Selesai
                                        </span>
                                    </div>
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
        </div>
    );
}
