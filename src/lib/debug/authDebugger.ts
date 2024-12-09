import { auth } from '../../config/firebase';
import { useAuthStore } from '../../store/authStore';
import type { User } from '../../types';

interface AuthDebugInfo {
  isAuthenticated: boolean;
  hasFirebaseUser: boolean;
  hasUserData: boolean;
  userDataComplete: boolean;
  navigationState: {
    currentPath: string;
    isProtectedRoute: boolean;
    shouldRedirect: boolean;
  };
  storeState: {
    hasUser: boolean;
    isLoading: boolean;
  };
}

export function getAuthDebugInfo(): AuthDebugInfo {
  const { user, loading } = useAuthStore.getState();
  const firebaseUser = auth.currentUser;
  const currentPath = window.location.pathname;

  const protectedRoutes = ['/dashboard', '/create-quiz', '/quiz'];
  const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

  return {
    isAuthenticated: !!firebaseUser && !!user,
    hasFirebaseUser: !!firebaseUser,
    hasUserData: !!user,
    userDataComplete: isUserDataComplete(user),
    navigationState: {
      currentPath,
      isProtectedRoute,
      shouldRedirect: isProtectedRoute && (!firebaseUser || !user),
    },
    storeState: {
      hasUser: !!user,
      isLoading: loading,
    },
  };
}

function isUserDataComplete(user: User | null): boolean {
  if (!user) return false;
  return !!(
    user.id &&
    user.email &&
    user.name &&
    user.role &&
    user.createdAt
  );
}