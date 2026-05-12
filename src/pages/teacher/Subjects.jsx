import { useState, useEffect } from "react";
import api from "../../services/api";
import Modal from "../../components/Modal";
import { IoBookOutline } from "react-icons/io5";

export default function TeacherSubjects() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedSubject, setSelectedSubject] = useState(null);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const res = await api.get("/teacher/subject");
            setSubjects(res.data.subject || []);
        } catch (err) {
            setError("Gagal memuat data mata pelajaran.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="skeleton h-8 w-48"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-32 w-full"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Mata Pelajaran
                </h1>
                <p className="text-gray-500 mt-1">
                    Daftar mata pelajaran yang Anda kuasai
                </p>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {subjects.length === 0 ? (
                <div className="card text-center py-12">
                    <IoBookOutline className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600">
                        Belum Ada Mata Pelajaran
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Mata pelajaran akan muncul setelah admin menambahkannya.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjects.map((subject, index) => (
                        <button
                            key={subject.id}
                            onClick={() => setSelectedSubject(subject)}
                            className="card text-left group hover:shadow-lg hover:border-sidebar/30 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <IoBookOutline className="text-indigo-600 text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-sidebar transition-colors">
                                {subject.name}
                            </h3>
                            <p className="text-gray-400 text-xs mt-2">
                                Klik untuk melihat detail
                            </p>
                        </button>
                    ))}
                </div>
            )}

            {/* Subject Detail Modal */}
            <Modal
                isOpen={!!selectedSubject}
                onClose={() => setSelectedSubject(null)}
                title="Detail Mata Pelajaran"
            >
                {selectedSubject && (
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                Nama Mata Pelajaran
                            </p>
                            <h3 className="text-xl font-bold text-gray-800 mt-1">
                                {selectedSubject.name}
                            </h3>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                ID Mata Pelajaran
                            </p>
                            <p className="text-gray-600 mt-1">
                                #{selectedSubject.id}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedSubject(null)}
                                className="btn-secondary w-full"
                                id="subject-modal-close-btn"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
