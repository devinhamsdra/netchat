import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

export const useNotification = () => {
  const showSuccess = useCallback((message: string) => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
    });
  }, []);

  const showError = useCallback((message: string) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
  }, []);

  const showInfo = useCallback((message: string) => {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message,
    });
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
  };
};
