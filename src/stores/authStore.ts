import { create } from 'zustand';
import { authApi, LoginPayload, RegisterPayload } from '../api/auth.api';
import { storage } from '../utils/storage';

// Interface de l'état d'authentification
interface AuthState {
  user: any | null;           // Utilisateur connecté
  token: string | null;       // Token JWT
  isLoading: boolean;         // Indicateur de chargement
  isAuthenticated: boolean;   // Est-ce que l'utilisateur est connecté ?

  // Actions
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
}

// Store Zustand pour l'authentification
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  // Connexion
  login: async (payload) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.login(payload);
      await storage.setItem('access_token', data.token);
      set({
        token: data.token,
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  // Inscription
  register: async (payload) => {
    set({ isLoading: true });
    try {
      await authApi.register(payload);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  // Déconnexion
  logout: async () => {
    await storage.deleteItem('access_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Charger le token depuis le stockage au démarrage
  loadFromStorage: async () => {
    try {
      const token = await storage.getItem('access_token');
      if (!token) return;
      try {
        const { data } = await authApi.profile();
        set({ token, user: data, isAuthenticated: true });
      } catch {
        await storage.deleteItem('access_token');
      }
    } catch (error) {
      console.log('Erreur lors du chargement du token:', error);
    }
  },
}));