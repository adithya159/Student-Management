import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return children;
};
