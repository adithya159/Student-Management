import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { login as loginAction } from '../../redux/slices/authSlice';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card, CardBody } from '../common/Card';
import { Award, UserPlus } from 'lucide-react';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !rollNumber) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check if email already exists
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const emailExists = students.some((s) => s.email === email);
    if (emailExists) {
      setError('Email already registered');
      return;
    }

    // Store student credentials separately in localStorage
    const studentId = 'STU' + Date.now().toString().slice(-4);
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    students.push({
      id: studentId,
      name: name,
      email: email,
      password: password,
      rollNumber: rollNumber,
    });
    localStorage.setItem('students', JSON.stringify(students));

    // Auto-login the newly registered student
    dispatch(loginAction({
      email: email,
      name: name,
      id: studentId,
      rollNumber: rollNumber,
      role: 'student',
    }));

    setSuccess('Registration successful! Redirecting to dashboard...');
    setTimeout(() => {
      navigate('/student');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <UserPlus className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Register</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Create your student account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg text-sm">
                {success}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Roll Number"
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g., CSE001"
              required
            />

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
              placeholder="Enter a password (min 6 characters)"
              required
            />

            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <UserPlus size={20} />
              Create Account
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
