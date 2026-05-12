import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    IoMailOutline,
    IoLockClosedOutline,
    IoSchoolOutline,
    IoEyeOutline,
    IoEyeOffOutline,
} from "react-icons/io5";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await login(email, password);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Login gagal. Periksa email dan password Anda.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-root flex">
            {/* Left Panel — Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-sidebar relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 text-center px-12">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
                        <IoSchoolOutline className="text-white text-4xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        PintarApps
                    </h1>
                    <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
                        Platform digital untuk mengelola kehadiran, sesi
                        pembelajaran, dan performa siswa secara efisien.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-10">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                                Automatic
                            </div>
                            <div className="text-white/50 text-xs">
                                Attendance
                            </div>
                        </div>
                        <div className="w-px h-10 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                                ∞
                            </div>
                            <div className="text-white/50 text-xs">Sesi</div>
                        </div>
                        <div className="w-px h-10 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                                Live
                            </div>
                            <div className="text-white/50 text-xs">
                                Tracking
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel — Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-12 h-12 rounded-xl bg-sidebar flex items-center justify-center">
                            <IoSchoolOutline className="text-white text-2xl" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            PintarApps
                        </h1>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Selamat Datang! 👋
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Masuk ke akun Anda untuk melanjutkan
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 animate-scale-in">
                            <p className="text-red-600 text-sm font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="login-email"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <IoMailOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    id="login-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="input-field pl-11"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="login-password"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <IoLockClosedOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Masukkan password"
                                    className="input-field pl-11 pr-11"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <IoEyeOffOutline size={18} />
                                    ) : (
                                        <IoEyeOutline size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            id="login-submit-btn"
                            disabled={loading}
                            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                "Masuk"
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Belum punya akun?{" "}
                        <Link
                            to="/register"
                            className="text-accent font-semibold hover:text-accent-dark transition-colors"
                        >
                            Daftar sekarang
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
