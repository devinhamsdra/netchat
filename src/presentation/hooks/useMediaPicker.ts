import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const useMediaPicker = () => {
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && result.assets[0]) {
        return result.assets[0];
      }
    } finally {
      setIsLoading(false);
    }
  };

  const pickVideo = async () => {
    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
      });

      if (!result.cancelled && result.assets[0]) {
        return result.assets[0];
      }
    } finally {
      setIsLoading(false);
    }
  };

  const pickDocument = async () => {
    setIsLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (result.type === 'success') {
        return result;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pickImage,
    pickVideo,
    pickDocument,
    isLoading,
  };
};
