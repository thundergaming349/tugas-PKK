import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentSessions from './pages/student/Sessions';
import StudentSessionDetail from './pages/student/SessionDetail';
import StudentSummary from './pages/student/Summary';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherSubjects from './pages/teacher/Subjects';
import TeacherSessions from './pages/teacher/Sessions';
import TeacherSessionDetail from './pages/teacher/SessionDetail';
import TeacherArchive from './pages/teacher/Archive';
import TeacherSummary from './pages/teacher/Summary';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import SubjectManagement from './pages/admin/SubjectManagement';
import ClassManagement from './pages/admin/ClassManagement';
import UserManagement from './pages/admin/UserManagement';

function RedirectByRole() {
  const { user, token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  const rolePaths = {
    siswa: '/student/dashboard',
    guru: '/teacher/dashboard',
    admin: '/admin/dashboard',
  };
  return <Navigate to={rolePaths[user?.role] || '/login'} replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['siswa']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/sessions" element={<StudentSessions />} />
        <Route path="/student/sessions/:id" element={<StudentSessionDetail />} />
        <Route path="/student/summary" element={<StudentSummary />} />
      </Route>

      {/* Teacher Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['guru']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/subjects" element={<TeacherSubjects />} />
        <Route path="/teacher/sessions" element={<TeacherSessions />} />
        <Route path="/teacher/sessions/:id" element={<TeacherSessionDetail />} />
        <Route path="/teacher/archive" element={<TeacherArchive />} />
        <Route path="/teacher/summary" element={<TeacherSummary />} />
      </Route>

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/subjects" element={<SubjectManagement />} />
        <Route path="/admin/classes" element={<ClassManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Route>

      {/* Default / Catch-all */}
      <Route path="/" element={<RedirectByRole />} />
      <Route path="*" element={<RedirectByRole />} />
    </Routes>
  );
}
