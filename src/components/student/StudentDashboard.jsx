import { useMemo, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectCategories } from '../../redux/slices/achievementSlice';
import { Card, CardHeader, CardBody } from '../common/Card';
import { Badge } from '../common/Badge';
import { Award, Trophy, TrendingUp, Calendar, Medal, Star, Download } from 'lucide-react';
import { Button } from '../common/Button';
import { jsPDF } from 'jspdf';

export const StudentDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const allAchievements = useAppSelector((state) => state.achievements.achievements);
  const categories = useAppSelector(selectCategories);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Get achievements for current user
  const studentAchievements = useMemo(() => {
    let filtered = allAchievements.filter((a) => a.studentEmail === user?.email || a.studentId === user?.id);

    if (filterCategory) {
      filtered = filtered.filter((a) => a.category === filterCategory);
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'points') {
        return b.points - a.points;
      }
      return 0;
    });
  }, [allAchievements, user?.email, user?.id, filterCategory, sortBy]);

  const stats = useMemo(() => {
    const total = studentAchievements.length;
    const totalPoints = studentAchievements.reduce((sum, a) => sum + a.points, 0);
    const withCertificate = studentAchievements.filter((a) => a.certificate).length;
    const recentMonth = studentAchievements.filter((a) => {
      const date = new Date(a.date);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return date >= monthAgo;
    }).length;

    const categoryBreakdown = categories.map((cat) => ({
      category: cat,
      count: studentAchievements.filter((a) => a.category === cat).length,
    }));

    return {
      total,
      totalPoints,
      withCertificate,
      recentMonth,
      categoryBreakdown,
    };
  }, [studentAchievements, categories]);

  const generateReport = () => {
    const pdf = new jsPDF();
    let yPosition = 20;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;

    const addWrappedText = (text, x, y, maxWidth, fontSize = 11) => {
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + lines.length * (fontSize / 2.5);
    };

    const checkPageBreak = (requiredSpace) => {
      if (yPosition + requiredSpace > pageHeight - 10) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    // Title
    pdf.setFontSize(20);
    pdf.setFont(undefined, 'bold');
    pdf.text('Achievement Report', margin, yPosition);
    yPosition += 15;

    // Student Information
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('Student Information', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(11);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Name: ${user?.name || 'N/A'}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Email: ${user?.email || 'N/A'}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Roll Number: ${user?.id || 'N/A'}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Generated Date: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 12;

    // Statistics
    checkPageBreak(25);
    pdf.setFont(undefined, 'bold');
    pdf.setFontSize(12);
    pdf.text('Summary Statistics', margin, yPosition);
    yPosition += 8;

    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(11);
    pdf.text(`Total Achievements: ${stats.total}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Total Points: ${stats.totalPoints}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Certificates Received: ${stats.withCertificate}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Recent Achievements (30 days): ${stats.recentMonth}`, margin, yPosition);
    yPosition += 12;

    // Category Breakdown
    checkPageBreak(30);
    pdf.setFont(undefined, 'bold');
    pdf.setFontSize(12);
    pdf.text('Category Breakdown', margin, yPosition);
    yPosition += 8;

    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(10);
    stats.categoryBreakdown.forEach((item) => {
      pdf.text(`${item.category}: ${item.count}`, margin + 5, yPosition);
      yPosition += 5;
    });
    yPosition += 8;

    // Achievements List
    if (studentAchievements.length > 0) {
      checkPageBreak(20);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(12);
      pdf.text('Detailed Achievements', margin, yPosition);
      yPosition += 10;

      studentAchievements.forEach((achievement, index) => {
        checkPageBreak(30);

        pdf.setFont(undefined, 'bold');
        pdf.setFontSize(11);
        yPosition = addWrappedText(`${index + 1}. ${achievement.title}`, margin, yPosition, maxWidth, 11);
        yPosition += 2;

        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(10);

        pdf.text(`Category: ${achievement.category}`, margin + 5, yPosition);
        yPosition += 5;

        pdf.text(`Level: ${achievement.level}`, margin + 5, yPosition);
        yPosition += 5;

        pdf.text(`Date: ${new Date(achievement.date).toLocaleDateString()}`, margin + 5, yPosition);
        yPosition += 5;

        pdf.text(`Points: ${achievement.points}`, margin + 5, yPosition);
        yPosition += 5;

        if (achievement.certificate) {
          pdf.setTextColor(0, 128, 0);
          pdf.text('✓ Certificate Received', margin + 5, yPosition);
          pdf.setTextColor(0, 0, 0);
          yPosition += 5;
        }

        if (achievement.description) {
          yPosition = addWrappedText(`Description: ${achievement.description}`, margin + 5, yPosition + 2, maxWidth - 5, 9);
        }

        yPosition += 8;
      });
    } else {
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(11);
      pdf.text('No achievements recorded yet.', margin, yPosition);
    }

    pdf.setFontSize(9);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      `Achievement Tracker Report - ${user?.name || 'Student'}`,
      margin,
      pageHeight - 10
    );

    pdf.save(`${user?.name?.replace(/\s+/g, '_') || 'achievements'}_report.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and showcase your extracurricular achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card hover className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Achievements</p>
                  <p className="text-4xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Trophy size={28} />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Total Points</p>
                  <p className="text-4xl font-bold">{stats.totalPoints}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Star size={28} />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">With Certificates</p>
                  <p className="text-4xl font-bold">{stats.withCertificate}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Award size={28} />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm mb-1">Recent (30 days)</p>
                  <p className="text-4xl font-bold">{stats.recentMonth}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <TrendingUp size={28} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Category Breakdown</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {stats.categoryBreakdown.map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between animate-slideIn" style={{ animationDelay: `${index * 50}ms` }}>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.category}</span>
                    <Badge variant={item.count > 0 ? 'primary' : 'default'}>{item.count}</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Overview</h2>
                <Button size="sm" onClick={generateReport} className="flex items-center gap-2">
                  <Download size={16} />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                {categories.slice(0, 6).map((category, index) => {
                  const count = studentAchievements.filter((a) => a.category === category).length;
                  const maxCount = Math.max(...categories.map((cat) => studentAchievements.filter((a) => a.category === cat).length), 1);
                  const percentage = (count / maxCount) * 100;

                  return (
                    <div key={category} className="animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Achievements</h2>
              <div className="flex gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="date">Sort by Date</option>
                  <option value="points">Sort by Points</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {studentAchievements.length === 0 ? (
              <div className="text-center py-12">
                <Medal className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No achievements yet</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Start participating in extracurricular activities!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studentAchievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-lg transition-all duration-300 animate-slideIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{achievement.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="primary">{achievement.category}</Badge>
                          <Badge variant="success">{achievement.level}</Badge>
                          {achievement.certificate && <Badge variant="warning">Certified</Badge>}
                        </div>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg ml-3">
                        <Trophy className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1 text-lg font-bold text-blue-600 dark:text-blue-400">
                        <Star size={20} />
                        {achievement.points}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
