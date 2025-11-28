import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="student">
                <Layout>
                  <StudentDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
