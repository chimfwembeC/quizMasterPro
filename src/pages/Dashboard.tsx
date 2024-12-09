import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, BookOpen, Users, Award, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { getQuizzes } from '../lib/quiz';
import type { Quiz } from '../types';

export function Dashboard() {
  const { user } = useAuthStore();
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchQuizzes = async () => {
      if (user) {
        const fetchedQuizzes = await getQuizzes(user.id, user.role);
        setQuizzes(fetchedQuizzes);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [user]);

  const stats = [
    {
      label: 'Total Quizzes',
      value: quizzes.length,
      icon: BookOpen,
      color: 'text-blue-500',
    },
    {
      label: 'Completed',
      value: quizzes.filter(q => q.isPublished).length,
      icon: Award,
      color: 'text-green-500',
    },
    {
      label: 'In Progress',
      value: quizzes.filter(q => !q.isPublished).length,
      icon: Users,
      color: 'text-yellow-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {user?.role !== 'student' && (
          <button
            onClick={() => navigate('/create-quiz')}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create Quiz
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Quizzes</h2>
        </div>
        <div className="border-t border-gray-200">
          {quizzes.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <li key={quiz.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{quiz.title}</h3>
                      <p className="text-sm text-gray-500">{quiz.description}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                      className="px-4 py-2 bg-primary text-white text-sm rounded hover:bg-primary/90 transition-colors"
                    >
                      {user?.role === 'student' ? 'Take Quiz' : 'Edit Quiz'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No quizzes available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}