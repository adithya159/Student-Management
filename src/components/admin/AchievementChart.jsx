import { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '../common/Card';

export const AchievementChart = ({ achievements, categories }) => {
  const chartData = useMemo(() => {
    return categories.map((category) => {
      const count = achievements.filter((a) => a.category === category).length;
      const maxCount = Math.max(...categories.map((cat) => achievements.filter((a) => a.category === cat).length), 1);
      const percentage = (count / maxCount) * 100;

      return {
        category,
        count,
        percentage,
      };
    });
  }, [achievements, categories]);

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements by Category</h2>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {chartData.map((data, index) => (
            <div key={data.category} className="animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{data.category}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{data.count}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${data.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
