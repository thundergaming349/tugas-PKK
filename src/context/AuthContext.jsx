import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user & token from storage on mount
  useEffect(() => {
    let savedToken = localStorage.getItem('token');
    let savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      const loginTime = localStorage.getItem('login_time');
      const rememberMe = localStorage.getItem('remember_me') === 'true';
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (rememberMe && loginTime && (Date.now() - parseInt(loginTime, 10) > sevenDays)) {
        // Expired! Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('login_time');
        localStorage.removeItem('remember_me');
        savedToken = null;
        savedUser = null;
      }
    }

    // Check sessionStorage if not found/expired in localStorage
    if (!savedToken || !savedUser) {
      savedToken = sessionStorage.getItem('token');
      savedUser = sessionStorage.getItem('user');
    }

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe = false) => {
    const response = await api.post('/auth/login', { email, password });
    const { token: newToken, user: userData } = response.data;

    if (rememberMe) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('login_time', Date.now().toString());
      localStorage.setItem('remember_me', 'true');

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('token', newToken);
      sessionStorage.setItem('user', JSON.stringify(userData));

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('login_time');
      localStorage.removeItem('remember_me');
    }

    setToken(newToken);
    setUser(userData);

    // Redirect based on role
    const rolePaths = {
      siswa: '/student/dashboard',
      guru: '/teacher/dashboard',
      admin: '/admin/dashboard',
    };
    navigate(rolePaths[userData.role] || '/login');
    return response.data;
  };

  const register = async (fullName, email, password, classId) => {
    const response = await api.post('/auth/register', {
      full_name: fullName,
      email,
      password,
      class_id: classId,
    });
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Even if logout API fails, clear local data
      console.error('Logout API error:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('login_time');
    localStorage.removeItem('remember_me');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
