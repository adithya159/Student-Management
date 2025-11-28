import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login as loginAction } from '../../redux/slices/authSlice';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card, CardBody } from '../common/Card';
import { Award, LogIn } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { achievements } = useAppSelector((state) => state.achievements);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check admin login
    if (role === 'admin') {
      const mockAdmins = {
        'admin@school.com': { role: 'admin', name: 'Admin User', id: 'ADMIN001' },
      };

      const admin = mockAdmins[email];
      if (admin && password === 'password') {
        dispatch(loginAction({ ...admin, email }));
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. Try: admin@school.com / password');
      }
      return;
    }

    // Check student login - first check registered students in localStorage
    const registeredStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const registeredStudent = registeredStudents.find((s) => s.email === email && s.password === password);

    if (registeredStudent) {
      dispatch(loginAction({ 
        email: registeredStudent.email,
        name: registeredStudent.name,
        id: registeredStudent.id,
        rollNumber: registeredStudent.rollNumber,
        role: 'student',
      }));
      navigate('/student');
      return;
    }

    // Fallback: check mock students in achievements (for backward compatibility)
    const studentMap = new Map();
    achievements.forEach((ach) => {
      if (ach.studentEmail && ach.password && !studentMap.has(ach.studentEmail)) {
        // Only add if password is present (real student)
        studentMap.set(ach.studentEmail, {
          email: ach.studentEmail,
          name: ach.studentName,
          id: ach.studentId,
          password: ach.password,
          rollNumber: ach.rollNumber || '',
        });
      }
    });

    const mockStudents = Array.from(studentMap.values());
    const mockStudent = mockStudents.find((s) => s.email === email && s.password === password);

    if (mockStudent) {
      dispatch(loginAction({ 
        email: mockStudent.email,
        name: mockStudent.name,
        id: mockStudent.id,
        rollNumber: mockStudent.rollNumber,
        role: 'student',
      }));
      navigate('/student');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Award className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Achievement Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Login to manage extracurricular achievements</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <LogIn size={20} />
              Login
            </Button>

            {role === 'student' && (
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    Register here
                  </Link>
                </p>
              </div>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
