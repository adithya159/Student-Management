import { createContext, useContext, useState, useEffect } from 'react';

const AchievementContext = createContext();

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};

export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState([]);
  const [categories, setCategories] = useState([
    'Sports',
    'Arts & Culture',
    'Academic',
    'Leadership',
    'Community Service',
    'Technology',
    'Other',
  ]);

  useEffect(() => {
    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    } else {
      const mockData = generateMockData();
      setAchievements(mockData);
      localStorage.setItem('achievements', JSON.stringify(mockData));
    }
  }, []);

  const generateMockData = () => {
    return [
      {
        id: '1',
        studentId: 'STU001',
        studentName: 'అర్జున్',
        studentEmail: 'arjun@student.com',
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
        studentName: 'అర్జున్',
        studentEmail: 'arjun@student.com',
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
        studentName: 'రవి',
        studentEmail: 'ravi@student.com',
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
        studentName: 'రవి',
        studentEmail: 'ravi@student.com',
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

  const addAchievement = (achievement) => {
    const newAchievement = {
      ...achievement,
      id: Date.now().toString(),
    };
    const updated = [...achievements, newAchievement];
    setAchievements(updated);
    localStorage.setItem('achievements', JSON.stringify(updated));
  };

  const updateAchievement = (id, updatedData) => {
    const updated = achievements.map((a) => (a.id === id ? { ...a, ...updatedData } : a));
    setAchievements(updated);
    localStorage.setItem('achievements', JSON.stringify(updated));
  };

  const deleteAchievement = (id) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    localStorage.setItem('achievements', JSON.stringify(updated));
  };

  const getStudentAchievements = (studentId) => {
    return achievements.filter((a) => a.studentId === studentId);
  };

  const getAchievementsByCategory = (category) => {
    return achievements.filter((a) => a.category === category);
  };

  const getTotalPoints = (studentId) => {
    return achievements
      .filter((a) => a.studentId === studentId)
      .reduce((sum, a) => sum + a.points, 0);
  };

  return (
    <AchievementContext.Provider
      value={{
        achievements,
        categories,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        getStudentAchievements,
        getAchievementsByCategory,
        getTotalPoints,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};
