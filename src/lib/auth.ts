import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { authLogger } from './debug/authLogger';
import type { User } from '../types';

export const signUp = async (
  email: string,
  password: string,
  name: string,
  role: 'student' | 'teacher'
): Promise<void> => {
  const addNotification = useNotificationStore.getState().addNotification;
  
  try {
    authLogger.log('info', 'Starting signup process', { email, name, role });
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    
    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name,
      role,
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.id), user);
    useAuthStore.getState().setUser(user);
    authLogger.log('info', 'User successfully created and stored', { userId: user.id });
    
    addNotification({
      type: 'success',
      message: `Welcome to QuizMaster Pro, ${name}!`,
    });
  } catch (error) {
    authLogger.log('error', 'Signup failed', { error });
    addNotification({
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to create account',
    });
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<void> => {
  const addNotification = useNotificationStore.getState().addNotification;
  
  try {
    authLogger.log('info', 'Starting signin process', { email });
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      useAuthStore.getState().setUser(userData);
      authLogger.log('info', 'User successfully signed in', { userId: userData.id });
      
      addNotification({
        type: 'success',
        message: `Welcome back, ${userData.name}!`,
      });
    } else {
      authLogger.log('error', 'User document not found after signin', { uid: firebaseUser.uid });
      throw new Error('User data not found');
    }
  } catch (error) {
    let message = 'Failed to sign in';
    if (error instanceof Error) {
      if (error.message.includes('wrong-password')) {
        message = 'Invalid email or password';
      } else if (error.message.includes('too-many-requests')) {
        message = 'Account temporarily locked. Please try again later';
      } else if (error.message.includes('network-request-failed')) {
        message = 'Network error. Please check your connection';
      }
    }
    authLogger.log('error', 'Signin failed', { error, message });
    addNotification({
      type: 'error',
      message,
    });
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  const addNotification = useNotificationStore.getState().addNotification;
  
  try {
    authLogger.log('info', 'Starting signout process');
    await firebaseSignOut(auth);
    useAuthStore.getState().setUser(null);
    authLogger.log('info', 'User successfully signed out');
    
    addNotification({
      type: 'success',
      message: 'Successfully signed out',
    });
  } catch (error) {
    authLogger.log('error', 'Signout failed', { error });
    addNotification({
      type: 'error',
      message: 'Failed to sign out',
    });
    throw error;
  }
};

export const initializeAuth = (): void => {
  authLogger.log('info', 'Initializing auth state listener');
  
  onAuthStateChanged(auth, async (firebaseUser) => {
    useAuthStore.getState().setLoading(true);
    
    if (firebaseUser) {
      authLogger.log('info', 'Firebase user state changed', { uid: firebaseUser.uid });
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        useAuthStore.getState().setUser(userData);
        authLogger.log('info', 'User data retrieved and stored', { userId: userData.id });
      } else {
        authLogger.log('warning', 'No user document found for authenticated user', { uid: firebaseUser.uid });
      }
    } else {
      authLogger.log('info', 'User signed out or no user found');
      useAuthStore.getState().setUser(null);
    }
    
    useAuthStore.getState().setLoading(false);
    authLogger.logAuthState();
  });
};