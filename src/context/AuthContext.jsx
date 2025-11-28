import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = (studentData) => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const newStudent = {
      ...studentData,
      id: Date.now().toString(),
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    return newStudent;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getAllStudents = () => {
    return JSON.parse(localStorage.getItem('students') || '[]');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    getAllStudents,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
