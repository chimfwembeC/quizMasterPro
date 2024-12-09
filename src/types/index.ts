export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdBy: string;
  questions: Question[];
  category: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  type: 'mcq' | 'true-false' | 'short-answer';
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  imageUrl?: string;
}