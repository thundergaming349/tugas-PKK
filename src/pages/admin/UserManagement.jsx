import { useState, useEffect } from "react";
import api from "../../services/api";
import Modal from "../../components/Modal";
import {
    IoPeopleOutline,
    IoAddOutline,
    IoCreateOutline,
    IoTrashOutline,
    IoSchoolOutline,
} from "react-icons/io5";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        role: "siswa",
        class_id: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [filterRole, setFilterRole] = useState("all");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userRes, classRes] = await Promise.all([
                api.get("/admin/users"),
                api.get("/classes"),
            ]);
            setUsers(userRes.data.users || []);
            setClasses(classRes.data.class || []);
        } catch {
            setMessage({ text: "Gagal memuat data pengguna.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setEditing(null);
        setFormData({
            full_name: "",
            email: "",
            password: "",
            role: "siswa",
            class_id: "",
        });
        setShowModal(true);
    };

    const openEdit = (u) => {
        setEditing(u);
        setFormData({
            full_name: u.full_name,
            email: u.email,
            password: "",
            role: u.role,
            class_id: u.class_id || "",
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ text: "", type: "" });

        const payload = {
            full_name: formData.full_name,
            email: formData.email,
            role: formData.role,
        };

        if (formData.password) {
            payload.password = formData.password;
        }

        if (formData.role === "siswa") {
            payload.class_id = formData.class_id;
        }

        try {
            if (editing) {
                await api.put(`/admin/users/${editing.id}`, payload);
                setMessage({
                    text: "Pengguna berhasil diperbarui!",
                    type: "success",
                });
            } else {
                await api.post("/admin/users", payload);
                setMessage({
                    text: "Pengguna berhasil ditambahkan!",
                    type: "success",
                });
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || "Gagal menyimpan data.",
                type: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (
            !confirm(
                "Yakin ingin menghapus pengguna ini? Semua data terkait akan terhapus.",
            )
        )
            return;
        try {
            await api.delete(`/admin/users/${id}`);
            setMessage({ text: "Pengguna berhasil dihapus!", type: "success" });
            fetchData();
        } catch (err) {
            setMessage({
                text:
                    err.response?.data?.message || "Gagal menghapus pengguna.",
                type: "error",
            });
        }
    };

    const maskEmail = (email) => {
        if (!email) return "";
        const [localPart, domain] = email.split("@");
        if (!localPart) return email;
        const visible = localPart.slice(0, 3);
        const stars = "*".repeat(Math.max(1, localPart.length - 3));
        return `${visible}${stars}@${domain || "gmail.com"}`;
    };

    const filteredUsers = users.filter((u) => {
        if (filterRole === "all") return true;
        return u.role === filterRole;
    });

    const getRoleBadge = (role) => {
        const maps = {
            admin: "px-2.5 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-600 border border-red-100 uppercase tracking-wider",
            guru: "px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider",
            siswa: "px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider",
        };
        return (
            maps[role] ||
            "px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-50 text-gray-600 border border-gray-100"
        );
    };

    if (loading)
        return (
            <div className="space-y-4">
                <div className="skeleton h-8 w-48"></div>
                <div className="skeleton h-64 w-full"></div>
            </div>
        );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Manajemen Pengguna
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Kelola data admin, guru, dan siswa
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    id="add-user-btn"
                    className="btn-primary flex items-center gap-2"
                >
                    <IoAddOutline className="text-lg" /> Tambah Pengguna
                </button>
            </div>

            {message.text && (
                <div
                    className={`p-4 rounded-xl animate-scale-in ${message.type === "success" ? "bg-emerald-50 border border-emerald-100 text-emerald-600" : "bg-red-50 border border-red-100 text-red-600"}`}
                >
                    <p className="text-sm font-medium">{message.text}</p>
                </div>
            )}

            {/* Filter Toolbar */}
            <div className="card flex items-center gap-4 flex-wrap py-3 px-4">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Filter Role:
                </span>
                <div className="flex gap-2">
                    {["all", "admin", "guru", "siswa"].map((role) => (
                        <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                                filterRole === role
                                    ? "bg-sidebar text-white shadow-sm"
                                    : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                        >
                            {role === "all" ? "Semua" : role}
                        </button>
                    ))}
                </div>
            </div>

            {filteredUsers.length === 0 ? (
                <div className="card text-center py-12">
                    <IoPeopleOutline className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600">
                        Belum Ada Pengguna
                    </h3>
                </div>
            ) : (
                <div className="card overflow-x-auto p-0">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="table-header">Nama</th>
                                <th className="table-header">Email</th>
                                <th className="table-header">Role</th>
                                <th className="table-header">
                                    Kelas (Khusus Siswa)
                                </th>
                                <th className="table-header text-right">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((u) => (
                                <tr
                                    key={u.id}
                                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="table-cell font-semibold text-gray-800">
                                        {u.full_name}
                                    </td>
                                    <td className="table-cell text-gray-500">
                                        {maskEmail(u.email)}
                                    </td>
                                    <td className="table-cell">
                                        <span className={getRoleBadge(u.role)}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="table-cell">
                                        {u.role === "siswa" ? (
                                            u.class_name ? (
                                                <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-lg border border-gray-200">
                                                    <IoSchoolOutline className="text-gray-400" />{" "}
                                                    {u.class_name}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-red-500 font-medium">
                                                    Belum pilih kelas
                                                </span>
                                            )
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">
                                                -
                                            </span>
                                        )}
                                    </td>
                                    <td className="table-cell text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEdit(u)}
                                                className="p-2 rounded-lg text-sidebar hover:bg-sidebar/10 transition-colors"
                                                title="Edit Pengguna"
                                            >
                                                <IoCreateOutline size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(u.id)
                                                }
                                                className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                                                title="Hapus Pengguna"
                                            >
                                                <IoTrashOutline size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add / Edit Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editing ? "Edit Pengguna" : "Tambah Pengguna"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    full_name: e.target.value,
                                })
                            }
                            className="input-field"
                            placeholder="Contoh: Budi Santoso"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="input-field"
                            placeholder="Contoh: budi@sekolah.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password{" "}
                            {editing && (
                                <span className="text-xs text-gray-400 font-normal">
                                    (Kosongkan jika tidak ingin diubah)
                                </span>
                            )}
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="input-field"
                            placeholder={
                                editing
                                    ? "••••••••"
                                    : "Masukkan password (min 6 karakter)"
                            }
                            required={!editing}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Role
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value,
                                })
                            }
                            className="input-field"
                        >
                            <option value="siswa">Siswa</option>
                            <option value="guru">Guru</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {formData.role === "siswa" && (
                        <div className="animate-scale-in">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Pilih Kelas
                            </label>
                            <select
                                value={formData.class_id}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        class_id: e.target.value,
                                    })
                                }
                                className="input-field"
                                required={formData.role === "siswa"}
                            >
                                <option value="">-- Pilih Kelas --</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="btn-secondary flex-1"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan"
                            )}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
