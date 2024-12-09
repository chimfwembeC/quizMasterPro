import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Quiz } from '../types';

export const getQuizzes = async (userId: string, role: string): Promise<Quiz[]> => {
  const quizzesRef = collection(db, 'quizzes');
  const q = role === 'student' 
    ? query(quizzesRef, where('isPublished', '==', true))
    : query(quizzesRef, where('createdBy', '==', userId));
    
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quiz));
};

export const createQuiz = async (quiz: Omit<Quiz, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'quizzes'), quiz);
  return docRef.id;
};

export const updateQuiz = async (quizId: string, data: Partial<Quiz>): Promise<void> => {
  await updateDoc(doc(db, 'quizzes', quizId), data);
};

export const deleteQuiz = async (quizId: string): Promise<void> => {
  await deleteDoc(doc(db, 'quizzes', quizId));
};