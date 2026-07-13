import { apiClient } from './client';

// Types pour la connexion
export interface LoginPayload {
  email: string;
  password: string;
}

// Types pour l'inscription
export interface RegisterPayload {
  email: string;
  password: string;
  nom: string;
  prenom: string;
}

// API d'authentification
export const authApi = {
  // Connexion
  login: (payload: LoginPayload) =>
    apiClient.post<{ token: string; user: any }>('/users/login', payload),

  // Inscription
  register: (payload: RegisterPayload) =>
    apiClient.post('/users/register', payload),

  // Récupérer le profil de l'utilisateur connecté
  profile: () =>
    apiClient.get('/users/profile'),

  // Déconnexion
  logout: () =>
    apiClient.post('/users/logout'),
};