import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Welcome to QuizMaster Pro
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          The ultimate platform for creating, managing, and taking quizzes with advanced analytics and real-time feedback.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Comprehensive Learning</h3>
            <p className="text-gray-600">Create and take quizzes across various subjects with multiple question types.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
            <p className="text-gray-600">Tailored experiences for students, teachers, and administrators.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
            <p className="text-gray-600">Get detailed analytics and performance insights immediately.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Monitor learning progress with comprehensive statistics.</p>
          </div>
        </div>

        <div className="space-x-4">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-block bg-white text-primary px-6 py-3 rounded-md font-medium border border-primary hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}