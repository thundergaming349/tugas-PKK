import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-root">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-sidebar border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    const rolePaths = {
      siswa: '/student/dashboard',
      guru: '/teacher/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={rolePaths[user?.role] || '/login'} replace />;
  }

  return children;
}
