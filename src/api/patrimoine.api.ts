import type { SiteDetail, SitePatrimoine } from '../types/patrimoine.types';
import { apiClient } from './client';

// ============================================================
// MOCK DATA - À SUPPRIMER QUAND LE BACKEND EST DISPONIBLE
// ============================================================
const MOCK_SITES: SitePatrimoine[] = [
  {
    id_lieu: 1,
    nom: { fr: 'Casbah d\'Alger', ar: 'قصبة الجزائر', en: 'Casbah of Algiers' },
    typePatrimoine: 'monument',
    typeLieu: 'monument',
    mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
    latitude: 36.7538,
    longitude: 3.0588,
    wilaya: { id_wilaya: 16, nom: 'Alger' },
    commune: { id_commune: 1, nom: 'Casbah' },
    stats: { noteMoyenne: 4.8, totalMedias: 45, totalMonuments: 12 },
  },
  {
    id_lieu: 2,
    nom: { fr: 'Timgad', ar: 'تيمقاد', en: 'Timgad' },
    typePatrimoine: 'site_archeologique',
    typeLieu: 'site_archeologique',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 35.4844,
    longitude: 6.4683,
    wilaya: { id_wilaya: 5, nom: 'Batna' },
    commune: { id_commune: 2, nom: 'Timgad' },
    stats: { noteMoyenne: 4.9, totalMedias: 32, totalMonuments: 8 },
  },
  {
    id_lieu: 3,
    nom: { fr: 'Tipaza', ar: 'تيبازة', en: 'Tipasa' },
    typePatrimoine: 'site_archeologique',
    typeLieu: 'site_archeologique',
    mainImage: 'https://images.unsplash.com/photo-1590060350618-8c6c2f9d7e63?w=400',
    latitude: 36.5897,
    longitude: 2.4472,
    wilaya: { id_wilaya: 42, nom: 'Tipaza' },
    commune: { id_commune: 3, nom: 'Tipaza' },
    stats: { noteMoyenne: 4.7, totalMedias: 28, totalMonuments: 6 },
  },
  {
    id_lieu: 4,
    nom: { fr: 'Djemila', ar: 'جميلة', en: 'Djemila' },
    typePatrimoine: 'site_archeologique',
    typeLieu: 'site_archeologique',
    mainImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400',
    latitude: 36.3203,
    longitude: 5.7367,
    wilaya: { id_wilaya: 19, nom: 'Sétif' },
    commune: { id_commune: 4, nom: 'Djemila' },
    stats: { noteMoyenne: 4.6, totalMedias: 25, totalMonuments: 5 },
  },
  {
    id_lieu: 5,
    nom: { fr: 'Tassili n\'Ajjer', ar: 'طاسيلي ناجر', en: 'Tassili n\'Ajjer' },
    typePatrimoine: 'site_naturel',
    typeLieu: 'site_naturel',
    mainImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
    latitude: 25.2000,
    longitude: 8.5000,
    wilaya: { id_wilaya: 11, nom: 'Tamanrasset' },
    commune: { id_commune: 5, nom: 'Tamanrasset' },
    stats: { noteMoyenne: 4.9, totalMedias: 56, totalMonuments: 3 },
  },
  {
    id_lieu: 6,
    nom: { fr: 'Vallée du M\'zab', ar: 'وادي مزاب', en: 'M\'zab Valley' },
    typePatrimoine: 'ville_village',
    typeLieu: 'ville_village',
    mainImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
    latitude: 32.4833,
    longitude: 3.6833,
    wilaya: { id_wilaya: 47, nom: 'Ghardaïa' },
    commune: { id_commune: 6, nom: 'Ghardaïa' },
    stats: { noteMoyenne: 4.8, totalMedias: 38, totalMonuments: 9 },
  },
  {
    id_lieu: 7,
    nom: { fr: 'Palais des Raïs', ar: 'قصر الرايس', en: 'Palace of the Rais' },
    typePatrimoine: 'palais_forteresse',
    typeLieu: 'palais_forteresse',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 36.7850,
    longitude: 3.0633,
    wilaya: { id_wilaya: 16, nom: 'Alger' },
    commune: { id_commune: 1, nom: 'Casbah' },
    stats: { noteMoyenne: 4.5, totalMedias: 20, totalMonuments: 4 },
  },
  {
    id_lieu: 8,
    nom: { fr: 'Grande Mosquée d\'Alger', ar: 'الجامع الكبير', en: 'Great Mosque of Algiers' },
    typePatrimoine: 'edifice_religieux',
    typeLieu: 'edifice_religieux',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 36.7853,
    longitude: 3.0642,
    wilaya: { id_wilaya: 16, nom: 'Alger' },
    commune: { id_commune: 1, nom: 'Casbah' },
    stats: { noteMoyenne: 4.6, totalMedias: 18, totalMonuments: 3 },
  },
];

// Mock pour un site détaillé
const MOCK_SITE_DETAIL: SiteDetail = {
  ...MOCK_SITES[0],
  DetailLieu: {
    description: { 
      fr: 'La Casbah d\'Alger est un site historique exceptionnel classé au patrimoine mondial de l\'UNESCO. Elle témoigne de l\'histoire riche et complexe de l\'Algérie à travers les siècles.',
      ar: 'قصبة الجزائر هي موقع تاريخي استثنائي مصنف ضمن التراث العالمي لليونسكو.',
      en: 'The Casbah of Algiers is an exceptional historical site classified as a UNESCO World Heritage site.'
    },
    histoire: {
      fr: 'Construite au VIe siècle avant J.-C., la Casbah a connu plusieurs civilisations : Phéniciens, Romains, Vandales, Byzantins, Arabes et Ottomans. Elle a été le cœur de la résistance algérienne pendant la guerre d\'indépendance.',
      ar: 'بنيت في القرن السادس قبل الميلاد، وعرفت القصبة عدة حضارات.',
      en: 'Built in the 6th century BC, the Casbah has known several civilizations.'
    },
    horaires: {
      fr: 'Ouvert tous les jours de 9h à 17h. Fermé le vendredi après-midi.',
    },
  },
  monuments: [
    {
      id: 1,
      nom: { fr: 'Palais du Dey' },
      type: 'palais',
      description: { fr: 'Ancienne résidence du Dey d\'Alger, symbole du pouvoir ottoman.' },
    },
    {
      id: 2,
      nom: { fr: 'Mosquée Ketchaoua' },
      type: 'mosquée',
      description: { fr: 'Mosquée emblématique construite au XVIIe siècle.' },
    },
  ],
  vestiges: [
    {
      id: 1,
      nom: { fr: 'Remparts antiques' },
      type: 'rempart',
      description: { fr: 'Tronçons de murailles datant de l\'époque romaine.' },
    },
  ],
  medias: [
    { id: 1, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', type: 'image' },
    { id: 2, url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', type: 'image' },
  ],
  services: [
    { id: 1, nom: { fr: 'Visite guidée' }, disponible: true },
    { id: 2, nom: { fr: 'Boutique de souvenirs' }, disponible: true },
    { id: 3, nom: { fr: 'Cafétéria' }, disponible: false },
  ],
};

// Indicateur pour utiliser ou non les données mockées
// Mettre à true pour utiliser les mock, false pour utiliser le vrai backend
const USE_MOCK = true;

// ============================================================
// API PATRIMOINE
// ============================================================

export const patrimoineApi = {
  // Liste des sites avec filtres
  list: async (params?: {
    type?: string;
    wilaya?: string;
    page?: number;
    limit?: number;
  }) => {
    if (USE_MOCK) {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filtered = [...MOCK_SITES];
      
      // Filtre par type
      if (params?.type) {
        filtered = filtered.filter(s => s.typePatrimoine === params.type);
      }
      
      // Filtre par wilaya
      if (params?.wilaya) {
        filtered = filtered.filter(s => s.wilaya?.nom === params.wilaya);
      }
      
      return {
        data: {
          data: filtered,
          total: filtered.length,
        },
      };
    }
    
    return apiClient.get<{ data: SitePatrimoine[]; total: number }>('/patrimoine', {
      params,
    });
  },

  // Tous les sites pour la carte
  map: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        data: {
          data: MOCK_SITES,
        },
      };
    }
    return apiClient.get<{ data: SitePatrimoine[] }>('/patrimoine/map');
  },

  // Sites proches (GPS)
  nearby: async (latitude: number, longitude: number, rayon = 30) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Simuler des sites proches (retourne tous les sites)
      return {
        data: {
          data: MOCK_SITES,
        },
      };
    }
    return apiClient.get<{ data: SitePatrimoine[] }>('/patrimoine/mobile/nearby', {
      params: { latitude, longitude, rayon },
    });
  },

  // Détail d'un site
  detail: async (id: number) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Si c'est le premier site, retourner le détail complet
      if (id === 1) {
        return {
          data: {
            data: MOCK_SITE_DETAIL,
          },
        };
      }
      
      // Sinon, retourner un site simple
      const site = MOCK_SITES.find(s => s.id_lieu === id);
      if (site) {
        return {
          data: {
            data: {
              ...site,
              DetailLieu: {
                description: { fr: `Description du site ${site.nom.fr || site.nom}` },
                histoire: { fr: `Histoire du site ${site.nom.fr || site.nom}` },
              },
              monuments: [],
              vestiges: [],
              medias: [],
              services: [],
            },
          },
        };
      }
      
      // Site non trouvé
      throw new Error('Site non trouvé');
    }
    return apiClient.get<{ data: SiteDetail }>(`/patrimoine/${id}`);
  },

  // Recherche
  search: async (q: string) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const results = MOCK_SITES.filter(site => {
        const nom = typeof site.nom === 'string' 
          ? site.nom 
          : site.nom?.fr || '';
        return nom.toLowerCase().includes(q.toLowerCase());
      });
      
      return {
        data: {
          data: results,
        },
      };
    }
    return apiClient.get<{ data: SitePatrimoine[] }>('/patrimoine/search', {
      params: { q },
    });
  },

  // Favoris
  addFavori: (id: number) =>
    apiClient.post(`/patrimoine/${id}/favoris`),

  removeFavori: (id: number) =>
    apiClient.delete(`/patrimoine/${id}/favoris`),
};