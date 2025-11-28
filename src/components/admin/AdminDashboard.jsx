import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addAchievement, updateAchievement, deleteAchievement, selectAllAchievements, selectCategories } from '../../redux/slices/achievementSlice';
import { Card, CardHeader, CardBody } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Input, Select, Textarea } from '../common/Input';
import { useForm } from '../../hooks/useForm';
import { Plus, Edit, Trash2, Award, TrendingUp, Users, Trophy } from 'lucide-react';
import { AchievementChart } from './AchievementChart';

export const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const achievements = useAppSelector(selectAllAchievements);
  const categories = useAppSelector(selectCategories);
  const { achievements: allAchievements } = useAppSelector((state) => state.achievements);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedStudentEmail, setSelectedStudentEmail] = useState('');

  const registeredStudents = useMemo(() => {
    const studentsMap = new Map();
    
    // Add registered students from localStorage
    const localStudents = JSON.parse(localStorage.getItem('students') || '[]');
    localStudents.forEach((s) => {
      if (!studentsMap.has(s.email)) {
        studentsMap.set(s.email, {
          id: s.id,
          name: s.name,
          email: s.email,
          rollNumber: s.rollNumber || '',
        });
      }
    });
    
    // Also add students from achievements (for mock data)
    allAchievements.forEach((ach) => {
      if (ach.studentEmail && !studentsMap.has(ach.studentEmail)) {
        studentsMap.set(ach.studentEmail, {
          id: ach.studentId,
          name: ach.studentName,
          email: ach.studentEmail,
          rollNumber: ach.rollNumber || '',
        });
      }
    });
    
    return Array.from(studentsMap.values());
  }, [allAchievements]);

  const stats = useMemo(() => {
    const uniqueStudents = new Set(achievements.map((a) => a.studentEmail || a.studentId)).size;
    const totalPoints = achievements.reduce((sum, a) => sum + a.points, 0);
    const avgPoints = uniqueStudents > 0 ? (totalPoints / uniqueStudents).toFixed(0) : 0;

    return {
      totalAchievements: achievements.length,
      uniqueStudents,
      totalPoints,
      avgPoints,
    };
  }, [achievements]);

  const filteredAchievements = useMemo(() => {
    return achievements.filter((achievement) => {
      const matchesSearch =
        achievement.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.studentId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !filterCategory || achievement.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [achievements, searchTerm, filterCategory]);

  const validate = (values) => {
    const errors = {};
    if (!values.studentEmail) errors.studentEmail = 'Student email is required';
    if (!values.title) errors.title = 'Title is required';
    if (!values.category) errors.category = 'Category is required';
    if (!values.date) errors.date = 'Date is required';
    if (!values.level) errors.level = 'Level is required';
    if (!values.points || values.points < 0) errors.points = 'Valid points required';
    return errors;
  };

  const initialValues = {
    studentEmail: '',
    studentId: '',
    studentName: '',
    title: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    level: '',
    points: 0,
    certificate: false,
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, setValues } = useForm(
    editingAchievement || initialValues,
    validate
  );

  const handleStudentSelect = (email) => {
    const student = registeredStudents.find((s) => s.email === email);
    if (student) {
      setValues({
        ...values,
        studentEmail: email,
        studentName: student.name,
        studentId: student.rollNumber,
      });
      setSelectedStudentEmail(email);
    }
  };

  const openModal = (achievement = null) => {
    if (achievement) {
      setEditingAchievement(achievement);
      setValues(achievement);
      setSelectedStudentEmail(achievement.studentEmail);
    } else {
      setEditingAchievement(null);
      resetForm();
      setSelectedStudentEmail('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAchievement(null);
    resetForm();
    setSelectedStudentEmail('');
  };

  const onSubmit = handleSubmit((formValues) => {
    if (editingAchievement) {
      dispatch(updateAchievement({ id: editingAchievement.id, achievement: formValues }));
    } else {
      dispatch(addAchievement(formValues));
    }
    closeModal();
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      dispatch(deleteAchievement(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage student extracurricular achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card hover>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Achievements</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalAchievements}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Trophy className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Students</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.uniqueStudents}</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Users className="text-green-600 dark:text-green-400" size={24} />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Points</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPoints}</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <Award className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Points/Student</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgPoints}</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                  <TrendingUp className="text-orange-600 dark:text-orange-400" size={24} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="mb-8">
          <AchievementChart achievements={achievements} categories={categories} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Registered Students</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {registeredStudents.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No students registered yet</p>
                ) : (
                  registeredStudents.map((student) => (
                    <div key={student.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{student.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{student.rollNumber}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 break-all">{student.email}</p>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleStudentSelect(student.email);
                          openModal();
                        }}
                        className="w-full text-xs"
                      >
                        Add Achievement
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievement Records</h2>
                <Button onClick={() => openModal()} className="flex items-center gap-2">
                  <Plus size={20} />
                  Add Achievement
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search by student name, ID, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Achievement
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Points
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredAchievements.map((achievement) => (
                      <tr key={achievement.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{achievement.studentName}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{achievement.studentId}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">{achievement.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{achievement.description}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge variant="primary">{achievement.category}</Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(achievement.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge variant="success">{achievement.level}</Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {achievement.points}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal(achievement)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(achievement.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredAchievements.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500 dark:text-gray-400">No achievements found</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Student</label>
            <select
              value={selectedStudentEmail}
              onChange={(e) => {
                handleStudentSelect(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required={!editingAchievement}
            >
              <option value="">Choose a student...</option>
              {registeredStudents.map((student) => (
                <option key={student.id} value={student.email}>
                  {student.name} ({student.rollNumber})
                </option>
              ))}
            </select>
            {errors.studentEmail && touched.studentEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.studentEmail}</p>
            )}
          </div>

          <Input
            label="Achievement Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.title}
            touched={touched.title}
            required
            placeholder="e.g., First Place in Science Fair"
          />

          <Select
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            options={categories}
            error={errors.category}
            touched={touched.category}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe the achievement..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              name="date"
              type="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.date}
              touched={touched.date}
              required
            />
            <Select
              label="Level"
              name="level"
              value={values.level}
              onChange={handleChange}
              onBlur={handleBlur}
              options={['School', 'Inter-School', 'District', 'Regional', 'State', 'National', 'International']}
              error={errors.level}
              touched={touched.level}
              required
            />
          </div>

          <Input
            label="Points"
            name="points"
            type="number"
            value={values.points}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.points}
            touched={touched.points}
            required
            placeholder="0"
          />

          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="certificate"
                checked={values.certificate}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Certificate Received</span>
            </label>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">{editingAchievement ? 'Update' : 'Add'} Achievement</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
