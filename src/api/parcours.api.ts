import { apiClient } from './client';
import type { Parcours, TransportMode, Difficulte } from '../types/parcours.types';

// ============================================================
// MOCK DATA - À SUPPRIMER QUAND LE BACKEND EST DISPONIBLE
// ============================================================

const MOCK_PARCOURS: Parcours[] = [
  {
    id_parcours: 1,
    nom_parcours: { fr: 'Randonnée dans la Casbah', ar: 'جولة في القصبة', en: 'Casbah Walk' },
    description: {
      fr: 'Découvrez les ruelles pittoresques de la Casbah d\'Alger, ses maisons traditionnelles et ses monuments historiques.',
      ar: 'اكتشف أزقة القصبة الخلابة في الجزائر، منازلها التقليدية ومعالمها التاريخية.',
      en: 'Discover the picturesque alleys of the Casbah of Algiers, its traditional houses and historical monuments.'
    },
    duree_estimee: 120,
    difficulte: 'facile',
    theme: 'historique',
    distance_km: 3.5,
    transport_mode: 'marche',
    statut: 'actif',
    Etapes: [
      {
        id_parcours_lieu: 1,
        ordre: 1,
        id_lieu: 1,
        duree_estimee: 30,
        distance_precedent: 0,
        temps_trajet: 0,
        transport_mode: 'marche',
        Lieu: {
          id_lieu: 1,
          nom: { fr: 'Palais du Dey' },
          latitude: 36.7850,
          longitude: 3.0642,
          mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
        }
      },
      {
        id_parcours_lieu: 2,
        ordre: 2,
        id_lieu: 2,
        duree_estimee: 45,
        distance_precedent: 0.8,
        temps_trajet: 10,
        transport_mode: 'marche',
        Lieu: {
          id_lieu: 2,
          nom: { fr: 'Mosquée Ketchaoua' },
          latitude: 36.7853,
          longitude: 3.0642,
          mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
        }
      },
      {
        id_parcours_lieu: 3,
        ordre: 3,
        id_lieu: 3,
        duree_estimee: 45,
        distance_precedent: 0.5,
        temps_trajet: 5,
        transport_mode: 'marche',
        Lieu: {
          id_lieu: 3,
          nom: { fr: 'Maison de la Photographie' },
          latitude: 36.7850,
          longitude: 3.0633,
          mainImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400',
        }
      }
    ]
  },
  {
    id_parcours: 2,
    nom_parcours: { fr: 'Circuit des sites archéologiques', ar: 'جولة المواقع الأثرية', en: 'Archaeological Sites Tour' },
    description: {
      fr: 'Un parcours à travers les plus beaux sites archéologiques d\'Algérie, de Timgad à Djemila.',
      ar: 'جولة عبر أجمل المواقع الأثرية في الجزائر، من تيمقاد إلى جميلة.',
      en: 'A tour through the most beautiful archaeological sites in Algeria, from Timgad to Djemila.'
    },
    duree_estimee: 480,
    difficulte: 'moyen',
    theme: 'patrimoine',
    distance_km: 120,
    transport_mode: 'voiture',
    statut: 'actif',
    Etapes: [
      {
        id_parcours_lieu: 4,
        ordre: 1,
        id_lieu: 5,
        duree_estimee: 120,
        distance_precedent: 0,
        temps_trajet: 0,
        transport_mode: 'voiture',
        Lieu: {
          id_lieu: 5,
          nom: { fr: 'Timgad' },
          latitude: 35.4844,
          longitude: 6.4683,
          mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
        }
      },
      {
        id_parcours_lieu: 5,
        ordre: 2,
        id_lieu: 9,
        duree_estimee: 120,
        distance_precedent: 45,
        temps_trajet: 60,
        transport_mode: 'voiture',
        Lieu: {
          id_lieu: 9,
          nom: { fr: 'Djemila' },
          latitude: 36.3203,
          longitude: 5.7367,
          mainImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400',
        }
      }
    ]
  },
  {
    id_parcours: 3,
    nom_parcours: { fr: 'Découverte du M\'zab', ar: 'اكتشاف مزاب', en: 'Discover M\'zab' },
    description: {
      fr: 'Explorez la vallée du M\'zab et ses villages berbères classés au patrimoine mondial.',
      ar: 'استكشف وادي مزاب وقرى البربر المصنفة ضمن التراث العالمي.',
      en: 'Explore the M\'zab Valley and its Berber villages classified as World Heritage.'
    },
    duree_estimee: 240,
    difficulte: 'facile',
    theme: 'culture',
    distance_km: 15,
    transport_mode: 'marche',
    statut: 'actif',
    Etapes: [
      {
        id_parcours_lieu: 6,
        ordre: 1,
        id_lieu: 13,
        duree_estimee: 120,
        distance_precedent: 0,
        temps_trajet: 0,
        transport_mode: 'marche',
        Lieu: {
          id_lieu: 13,
          nom: { fr: 'Vallée du M\'zab' },
          latitude: 32.4833,
          longitude: 3.6833,
          mainImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
        }
      }
    ]
  }
];

const USE_MOCK = true;

// ============================================================
// API PARCOURS
// ============================================================

export const parcoursApi = {
  // Liste des parcours
  list: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        data: {
          data: MOCK_PARCOURS,
        },
      };
    }
    return apiClient.get<{ data: Parcours[] }>('/parcours');
  },

  // Mes parcours
  myList: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Retourner les parcours avec un utilisateur associé
      const myParcours = MOCK_PARCOURS.map(p => ({
        ...p,
        utilisateur: {
          id_utilisateur: 1,
          nom: 'Test',
          prenom: 'User',
        }
      }));
      return {
        data: {
          data: myParcours.slice(0, 2),
        },
      };
    }
    return apiClient.get<{ data: Parcours[] }>('/parcours/my/list');
  },

  // Détail d'un parcours
  detail: async (id: number) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const parcours = MOCK_PARCOURS.find(p => p.id_parcours === id);
      if (!parcours) {
        throw new Error('Parcours non trouvé');
      }
      return {
        data: {
          data: parcours,
        },
      };
    }
    return apiClient.get<{ data: Parcours }>(`/parcours/${id}`);
  },

  // Parcours avec coordonnées GPS
  map: async (id: number) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const parcours = MOCK_PARCOURS.find(p => p.id_parcours === id);
      return {
        data: {
          data: parcours || null,
        },
      };
    }
    return apiClient.get(`/parcours/${id}/map`);
  },

  // Créer un parcours personnalisé
  personnalise: async (params: {
    latitude: number;
    longitude: number;
    rayon?: number;
    theme?: string;
    difficulte?: string;
    transport_mode?: string;
  }) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      // Simuler la création d'un parcours
      const newParcours: Parcours = {
        id_parcours: Date.now(),
        nom_parcours: {
          fr: `Parcours personnalisé - ${params.theme || 'Découverte'}`,
          ar: `مسيرة مخصصة - ${params.theme || 'اكتشاف'}`,
          en: `Custom Tour - ${params.theme || 'Discovery'}`,
        },
        description: {
          fr: `Un parcours personnalisé généré automatiquement autour de votre position. Thème: ${params.theme || 'mixte'}`,
          ar: `مسيرة مخصصة تم إنشاؤها تلقائياً حول موقعك. الموضوع: ${params.theme || 'متنوع'}`,
          en: `A custom tour automatically generated around your location. Theme: ${params.theme || 'mixed'}`,
        },
        duree_estimee: 180,
        difficulte: (params.difficulte as Difficulte) || 'moyen',
        theme: params.theme,
        distance_km: 25,
        transport_mode: (params.transport_mode as TransportMode) || 'voiture',
        statut: 'actif',
        Etapes: [
          {
            id_parcours_lieu: 1,
            ordre: 1,
            id_lieu: 1,
            duree_estimee: 60,
            distance_precedent: 0,
            temps_trajet: 0,
            transport_mode: 'marche',
            Lieu: {
              id_lieu: 1,
              nom: { fr: 'Point de départ' },
              latitude: params.latitude,
              longitude: params.longitude,
              mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
            }
          }
        ]
      };
      return {
        data: {
          data: newParcours,
        },
      };
    }
    return apiClient.post('/parcours/personnalise', params);
  },

  // Créer un parcours
  create: async (payload: {
    nom: string;
    description?: string;
    difficulte?: Difficulte;
    theme?: string;
    transport_mode?: TransportMode;
  }) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const newParcours: Parcours = {
        id_parcours: Date.now(),
        nom_parcours: { fr: payload.nom },
        description: payload.description ? { fr: payload.description } : undefined,
        duree_estimee: 120,
        difficulte: payload.difficulte || 'facile',
        theme: payload.theme,
        distance_km: 10,
        transport_mode: payload.transport_mode || 'marche',
        statut: 'actif',
      };
      return {
        data: {
          data: newParcours,
        },
      };
    }
    return apiClient.post<{ data: Parcours }>('/parcours', payload);
  },

  // Ajouter une étape
  addEtape: (parcoursId: number, lieuId: number, ordre?: number) =>
    apiClient.post(`/parcours/${parcoursId}/etapes`, { id_lieu: lieuId, ordre }),

  // Supprimer un parcours
  delete: (id: number) =>
    apiClient.delete(`/parcours/${id}`),
};