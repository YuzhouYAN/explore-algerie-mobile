import axios from 'axios';
import { storage } from '../utils/storage';

// URL de base de l'API
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.77:3001/api';

// Client Axios pour les requêtes HTTP
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteur : ajouter le token JWT à chaque requête
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await storage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Ignorer les erreurs
  }
  return config;
});

// Intercepteur : rafraîchir automatiquement le token en cas d'expiration (401)
let isRefreshing = false;
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && !isRefreshing) {
      original._retry = true;
      isRefreshing = true;
      try {
        const token = await storage.getItem('access_token');
        const { data } = await axios.post(`${BASE_URL}/users/refresh-token`, { token });
        await storage.setItem('access_token', data.token);
        original.headers.Authorization = `Bearer ${data.token}`;
        return apiClient(original);
      } catch {
        await storage.deleteItem('access_token');
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);