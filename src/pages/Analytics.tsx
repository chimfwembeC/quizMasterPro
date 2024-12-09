import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Loader2 } from 'lucide-react';

export function Analytics() {
  const [loading, setLoading] = useState(true);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [topQuiz, setTopQuiz] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const quizzesSnapshot = await getDocs(query(collection(db, 'quizzes')));
        const quizzes = quizzesSnapshot.docs.map((doc) => doc.data());

        setTotalQuizzes(quizzes.length);

        const scores = quizzes.map((quiz) => quiz.averageScore || 0);
        const avgScore = scores.reduce((acc, score) => acc + score, 0) / quizzes.length;
        setAverageScore(avgScore.toFixed(2));

        const highestScoreQuiz = quizzes.reduce((top, quiz) =>
          quiz.averageScore > (top?.averageScore || 0) ? quiz : top, null);
        setTopQuiz(highestScoreQuiz?.title || null);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p className="text-lg text-gray-700">Total Quizzes: {totalQuizzes}</p>
        <p className="text-lg text-gray-700">Average Score: {averageScore}</p>
        <p className="text-lg text-gray-700">
          Top Quiz: {topQuiz || 'No data available'}
        </p>
      </div>
    </div>
  );
}
