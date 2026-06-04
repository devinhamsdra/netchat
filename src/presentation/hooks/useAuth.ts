import { useEffect, useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { AuthService } from '@services/AuthService';
import { User as FirebaseUser } from 'firebase/auth';

export const useAuth = () => {
  const { user, isLoading, isAuthenticated, setUser, setLoading, setAuthenticated, setError } =
    useAuthStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          email: currentUser.email || '',
          emailVerified: currentUser.emailVerified,
        });
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
      setInitialized(true);
      setLoading(false);
    };

    checkAuth();
  }, []);

  return {
    user,
    isLoading: isLoading || !initialized,
    isAuthenticated,
    setError,
  };
};
