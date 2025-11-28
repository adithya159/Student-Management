import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  isAdmin: false,
  isStudent: false,
};

// Load user from localStorage on app start
const storedUser = localStorage.getItem('user');
if (storedUser) {
  initialState.user = JSON.parse(storedUser);
  initialState.isAdmin = JSON.parse(storedUser).role === 'admin';
  initialState.isStudent = JSON.parse(storedUser).role === 'student';
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.role === 'admin';
      state.isStudent = action.payload.role === 'student';
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.isStudent = false;
      state.loading = false;
      localStorage.removeItem('user');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    register: (state, action) => {
      // Registration adds to students in localStorage, no immediate login
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      students.push(action.payload);
      localStorage.setItem('students', JSON.stringify(students));
    },
  },
});

export const { login, logout, setLoading, register } = authSlice.actions;
export default authSlice.reducer;
