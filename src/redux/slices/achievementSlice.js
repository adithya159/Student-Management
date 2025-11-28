import { createSlice } from '@reduxjs/toolkit';

const generateMockData = () => {
  return [
    {
      id: '1',
      studentId: 'STU001',
      studentName: 'Arjun',
      studentEmail: 'arjun@student.com',
      password: 'password',
      rollNumber: 'CSE001',
      title: 'First Place in Science Fair',
      category: 'Academic',
      description: 'Won first place in the regional science fair with a project on renewable energy',
      date: '2024-03-15',
      level: 'Regional',
      points: 100,
      certificate: true,
    },
    {
      id: '2',
      studentId: 'STU001',
      studentName: 'Arjun',
      studentEmail: 'arjun@student.com',
      password: 'password',
      rollNumber: 'CSE001',
      title: 'Basketball Championship',
      category: 'Sports',
      description: 'Led the school team to victory in inter-school basketball tournament',
      date: '2024-02-20',
      level: 'Inter-School',
      points: 80,
      certificate: true,
    },
    {
      id: '3',
      studentId: 'STU002',
      studentName: 'Ravi',
      studentEmail: 'ravi@student.com',
      password: 'password',
      rollNumber: 'CSE002',
      title: 'Art Exhibition Award',
      category: 'Arts & Culture',
      description: 'Featured artwork in state-level art exhibition',
      date: '2024-04-10',
      level: 'State',
      points: 90,
      certificate: true,
    },
    {
      id: '4',
      studentId: 'STU002',
      studentName: 'Ravi',
      studentEmail: 'ravi@student.com',
      password: 'password',
      rollNumber: 'CSE002',
      title: 'Student Council President',
      category: 'Leadership',
      description: 'Elected as student council president for academic year 2024',
      date: '2024-01-05',
      level: 'School',
      points: 70,
      certificate: false,
    },
  ];
};

const initialState = {
  achievements: [],
  categories: ['Sports', 'Arts & Culture', 'Academic', 'Leadership', 'Community Service', 'Technology', 'Other'],
  loading: false,
  error: null,
};

// Load achievements from localStorage on app start
const storedAchievements = localStorage.getItem('achievements');
if (storedAchievements) {
  initialState.achievements = JSON.parse(storedAchievements);
} else {
  initialState.achievements = generateMockData();
  localStorage.setItem('achievements', JSON.stringify(initialState.achievements));
}

const achievementSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    addAchievement: (state, action) => {
      const newAchievement = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.achievements.push(newAchievement);
      localStorage.setItem('achievements', JSON.stringify(state.achievements));
    },
    updateAchievement: (state, action) => {
      const { id, achievement } = action.payload;
      const index = state.achievements.findIndex((a) => a.id === id);
      if (index !== -1) {
        state.achievements[index] = { ...state.achievements[index], ...achievement };
        localStorage.setItem('achievements', JSON.stringify(state.achievements));
      }
    },
    deleteAchievement: (state, action) => {
      state.achievements = state.achievements.filter((a) => a.id !== action.payload);
      localStorage.setItem('achievements', JSON.stringify(state.achievements));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  selectors: {
    selectAllAchievements: (state) => state.achievements,
    selectCategories: (state) => state.categories,
    selectAchievementsByEmail: (state, email) => 
      state.achievements.filter((a) => a.studentEmail === email),
    selectAchievementsByCategory: (state, category) =>
      state.achievements.filter((a) => a.category === category),
  },
});

export const { addAchievement, updateAchievement, deleteAchievement, setLoading, setError } = achievementSlice.actions;
export const { 
  selectAllAchievements, 
  selectCategories, 
  selectAchievementsByEmail, 
  selectAchievementsByCategory 
} = achievementSlice.selectors;
export default achievementSlice.reducer;
