import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

// Create Auth Context
const AuthContext = createContext({});

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign Up Function
  const signup = async (email, password, confirmPassword) => {
    try {
      setError(null);
      setLoading(true);

      // Validate inputs
      const trimmedEmail = email.trim().toLowerCase();
      
      if (!trimmedEmail) {
        return { success: false, error: 'Email не может быть пустым' };
      }

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        return { success: false, error: 'Пожалуйста, введите корректный email адрес' };
      }

      if (!password) {
        return { success: false, error: 'Пароль не может быть пустым' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Пароль должен быть минимум 6 символов' };
      }

      if (password !== confirmPassword) {
        return { success: false, error: 'Пароли не совпадают' };
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      
      // Get the newly created user
      const newUser = userCredential.user;
      
      return { 
        success: true, 
        user: newUser,
        message: 'Аккаунт успешно создан'
      };
    } catch (err) {
      let errorMessage = 'Ошибка при создании аккаунта';
      
      console.error('Firebase signup error:', err.code, err.message);
      
      // Firebase error handling
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Эта почта уже зарегистрирована';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Некорректный email';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Слабый пароль. Используйте минимум 6 символов';
      } else if (err.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/Password аутентификация не включена в Firebase. Откройте Firebase Console > Authentication > Sign-in method и включите Email/Password';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Ошибка подключения. Проверьте интернет';
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Login Function
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      // Validate inputs
      if (!email.trim()) {
        return { success: false, error: 'Email не может быть пустым' };
      }

      if (!password) {
        return { success: false, error: 'Пароль не может быть пустым' };
      }

      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      return { 
        success: true, 
        user: userCredential.user,
        message: 'Успешный вход'
      };
    } catch (err) {
      let errorMessage = 'Ошибка при входе';
      
      console.error('Firebase login error:', err.code, err.message);
      
      // Firebase error handling
      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Неправильный email или пароль';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'Пользователь не найден';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Неправильный пароль';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Слишком много попыток входа. Попробуйте позже';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Ошибка подключения. Проверьте интернет';
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      setError(null);
      setLoading(true);
      await signOut(auth);
      setUser(null);
      return { success: true, message: 'Выход выполнен' };
    } catch (err) {
      const errorMessage = 'Ошибка при выходе';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Reset error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth должен быть использован внутри AuthProvider');
  }
  
  return context;
};

export default AuthProvider;
