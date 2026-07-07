import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Vérifier si on est sur le Web
const isWeb = Platform.OS === 'web';

// Service de stockage (SecureStore sur mobile, localStorage sur Web)
export const storage = {
  // Récupérer une valeur
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (isWeb) {
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  
  // Stocker une valeur
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (isWeb) {
        localStorage.setItem(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Ignorer les erreurs
    }
  },
  
  // Supprimer une valeur
  deleteItem: async (key: string): Promise<void> => {
    try {
      if (isWeb) {
        localStorage.removeItem(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch {
      // Ignorer les erreurs
    }
  },
};