import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Quiz } from '../types';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function MyQuizzes() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Replace `userId` with the actual user ID (e.g., from auth state)
        const userId = user.id; 
        const q = query(collection(db, 'quizzes'), where('creatorId', '==', userId));
        const querySnapshot = await getDocs(q);

        const quizzesData: Quiz[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Quiz[];

        setQuizzes(quizzesData);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">No quizzes found. Create your first quiz now!</p>
        <button
          onClick={() => navigate('/create-quiz')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Create Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Quizzes</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="flex justify-between items-center border-t pt-4"
          >
            <div>
              <h2 className="text-lg font-medium text-gray-900">{quiz.title}</h2>
              <p className="text-gray-500 text-sm">
                {quiz.questions.length} questions - {quiz.duration} mins
              </p>
            </div>
            <div className="space-x-2">
              <Link
                to={`/quiz/${quiz.id}`}
                className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Take Quiz
              </Link>
              <Link
                to={`/edit-quiz/${quiz.id}`}
                className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
