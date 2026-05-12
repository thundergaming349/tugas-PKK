import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    IoHomeOutline,
    IoCalendarOutline,
    IoStatsChartOutline,
    IoBookOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoLogOutOutline,
    IoMenuOutline,
    IoCloseOutline,
    IoArchiveOutline,
} from "react-icons/io5";
import { useState } from "react";

const menuConfig = {
    siswa: [
        { label: "Dashboard", path: "/student/dashboard", icon: IoHomeOutline },
        { label: "Sesi", path: "/student/sessions", icon: IoCalendarOutline },
        {
            label: "Summary",
            path: "/student/summary",
            icon: IoStatsChartOutline,
        },
    ],
    guru: [
        { label: "Dashboard", path: "/teacher/dashboard", icon: IoHomeOutline },
        {
            label: "Mata Pelajaran",
            path: "/teacher/subjects",
            icon: IoBookOutline,
        },
        { label: "Sesi", path: "/teacher/sessions", icon: IoCalendarOutline },
        { label: "Arsip", path: "/teacher/archive", icon: IoArchiveOutline },
        {
            label: "Summary",
            path: "/teacher/summary",
            icon: IoStatsChartOutline,
        },
    ],
    admin: [
        { label: "Dashboard", path: "/admin/dashboard", icon: IoHomeOutline },
        {
            label: "Mata Pelajaran",
            path: "/admin/subjects",
            icon: IoBookOutline,
        },
        { label: "Kelas", path: "/admin/classes", icon: IoSchoolOutline },
        { label: "Siswa", path: "/admin/students", icon: IoPeopleOutline },
    ],
};

const roleLabels = {
    siswa: "Siswa",
    guru: "Guru",
    admin: "Admin",
};

export default function Sidebar() {
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const menus = menuConfig[user?.role] || [];

    const handleLogout = async () => {
        if(confirm('yakin ingin logout?')) {
            await logout();
        }
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Brand / Logo */}
            <div className="px-6 py-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <IoSchoolOutline className="text-white text-xl" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg tracking-tight">
                            PintarApps
                        </h1>
                        <p className="text-white/60 text-xs">
                            Learning Management
                        </p>
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm uppercase">
                        {user?.full_name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">
                            {user?.full_name || "User"}
                        </p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white/90 uppercase tracking-wide">
                            {roleLabels[user?.role] || "User"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {menus.map((menu) => {
                    const Icon = menu.icon;
                    const isActive =
                        location.pathname === menu.path ||
                        location.pathname.startsWith(menu.path + "/");
                    return (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                                isActive
                                    ? "bg-white/20 text-white shadow-sm"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            <Icon
                                className={`text-lg flex-shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                            />
                            <span>{menu.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    id="sidebar-logout-btn"
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-red-500/20 transition-all duration-200 group"
                >
                    <IoLogOutOutline className="text-lg group-hover:translate-x-[-2px] transition-transform duration-200" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-sidebar text-white shadow-lg"
                onClick={() => setMobileOpen(!mobileOpen)}
                id="sidebar-mobile-toggle"
            >
                {mobileOpen ? (
                    <IoCloseOutline size={22} />
                ) : (
                    <IoMenuOutline size={22} />
                )}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/40 z-30 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 inset-y-0 left-0 z-40 w-[260px] h-screen bg-sidebar flex-shrink-0 transform transition-transform duration-300 ease-in-out ${
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }`}
            >
                {sidebarContent}
            </aside>
        </>
    );
}
