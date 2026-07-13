import type { SiteDetail, SitePatrimoine } from '../types/patrimoine.types';
import { apiClient } from './client';

// ============================================================
// MOCK DATA - À SUPPRIMER QUAND LE BACKEND EST DISPONIBLE
// ============================================================
const MOCK_SITES: SitePatrimoine[] = [
  // ========== ALGER (16) ==========
  {
    id_lieu: 1,
    nom: { fr: 'Casbah d\'Alger', ar: 'قصبة الجزائر', en: 'Casbah of Algiers' },
    typePatrimoine: 'monument',
    typeLieu: 'monument',
    mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
    latitude: 36.7850,
    longitude: 3.0642,
    wilaya: { id_wilaya: 16, nom: 'Alger' },
    commune: { id_commune: 1, nom: 'Casbah' },
    stats: { noteMoyenne: 4.8, totalMedias: 45, totalMonuments: 12 },
  },
  {
    id_lieu: 2,
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
  {
    id_lieu: 3,
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
    id_lieu: 4,
    nom: { fr: 'Jardin d\'Essai du Hamma', ar: 'حديقة التجارب', en: 'Hamma Experimental Garden' },
    typePatrimoine: 'site_naturel',
    typeLieu: 'site_naturel',
    mainImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
    latitude: 36.7450,
    longitude: 3.0720,
    wilaya: { id_wilaya: 16, nom: 'Alger' },
    commune: { id_commune: 2, nom: 'Belouizdad' },
    stats: { noteMoyenne: 4.4, totalMedias: 15, totalMonuments: 2 },
  },

  // ========== BATNA (5) ==========
  {
    id_lieu: 5,
    nom: { fr: 'Timgad', ar: 'تيمقاد', en: 'Timgad' },
    typePatrimoine: 'site_archeologique',
    typeLieu: 'site_archeologique',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 35.4844,
    longitude: 6.4683,
    wilaya: { id_wilaya: 5, nom: 'Batna' },
    commune: { id_commune: 3, nom: 'Timgad' },
    stats: { noteMoyenne: 4.9, totalMedias: 32, totalMonuments: 8 },
  },
  {
    id_lieu: 6,
    nom: { fr: 'Lambaesis', ar: 'لمبازي', en: 'Lambaesis' },
    typePatrimoine: 'site_archeologique',
    typeLieu: 'site_archeologique',
    mainImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400',
    latitude: 35.4889,
    longitude: 6.2600,
    wilaya: { id_wilaya: 5, nom: 'Batna' },
    commune: { id_commune: 4, nom: 'Batna' },
    stats: { noteMoyenne: 4.3, totalMedias: 12, totalMonuments: 4 },
  },

  // ========== TIPAZA (42) ==========
  {
    id_lieu: 7,
    nom: { fr: 'Tipaza', ar: 'تيبازة', en: 'Tipasa' },
    typePatrimoine: 'site_archeologique',
    typeLieu: 'site_archeologique',
    mainImage: 'https://images.unsplash.com/photo-1590060350618-8c6c2f9d7e63?w=400',
    latitude: 36.5897,
    longitude: 2.4472,
    wilaya: { id_wilaya: 42, nom: 'Tipaza' },
    commune: { id_commune: 5, nom: 'Tipaza' },
    stats: { noteMoyenne: 4.7, totalMedias: 28, totalMonuments: 6 },
  },
  {
    id_lieu: 8,
    nom: { fr: 'Tombeau de la Chrétienne', ar: 'قبر الرومية', en: 'Royal Mausoleum of Mauretania' },
    typePatrimoine: 'monument',
    typeLieu: 'monument',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 36.6389,
    longitude: 2.4361,
    wilaya: { id_wilaya: 42, nom: 'Tipaza' },
    commune: { id_commune: 6, nom: 'Sidi Rached' },
    stats: { noteMoyenne: 4.5, totalMedias: 16, totalMonuments: 3 },
  },

  // ========== SETIF (19) ==========
  {
    id_lieu: 9,
    nom: { fr: 'Djemila', ar: 'جميلة', en: 'Djemila' },
    typePatrimoine: 'site_archeologique',
    typeLieu: 'site_archeologique',
    mainImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400',
    latitude: 36.3203,
    longitude: 5.7367,
    wilaya: { id_wilaya: 19, nom: 'Sétif' },
    commune: { id_commune: 7, nom: 'Djemila' },
    stats: { noteMoyenne: 4.6, totalMedias: 25, totalMonuments: 5 },
  },
  {
    id_lieu: 10,
    nom: { fr: 'Ain El Fouara', ar: 'عين الفوارة', en: 'Ain El Fouara' },
    typePatrimoine: 'monument',
    typeLieu: 'monument',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 36.1880,
    longitude: 5.4073,
    wilaya: { id_wilaya: 19, nom: 'Sétif' },
    commune: { id_commune: 8, nom: 'Sétif' },
    stats: { noteMoyenne: 4.2, totalMedias: 10, totalMonuments: 2 },
  },

  // ========== TAMANRASSET (11) ==========
  {
    id_lieu: 11,
    nom: { fr: 'Tassili n\'Ajjer', ar: 'طاسيلي ناجر', en: 'Tassili n\'Ajjer' },
    typePatrimoine: 'site_naturel',
    typeLieu: 'site_naturel',
    mainImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
    latitude: 25.2000,
    longitude: 8.5000,
    wilaya: { id_wilaya: 11, nom: 'Tamanrasset' },
    commune: { id_commune: 9, nom: 'Tamanrasset' },
    stats: { noteMoyenne: 4.9, totalMedias: 56, totalMonuments: 3 },
  },
  {
    id_lieu: 12,
    nom: { fr: 'Assekrem', ar: 'أسكرام', en: 'Assekrem' },
    typePatrimoine: 'site_naturel',
    typeLieu: 'site_naturel',
    mainImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
    latitude: 23.2725,
    longitude: 5.6433,
    wilaya: { id_wilaya: 11, nom: 'Tamanrasset' },
    commune: { id_commune: 9, nom: 'Tamanrasset' },
    stats: { noteMoyenne: 4.7, totalMedias: 22, totalMonuments: 1 },
  },

  // ========== GHARDAIA (47) ==========
  {
    id_lieu: 13,
    nom: { fr: 'Vallée du M\'zab', ar: 'وادي مزاب', en: 'M\'zab Valley' },
    typePatrimoine: 'ville_village',
    typeLieu: 'ville_village',
    mainImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
    latitude: 32.4833,
    longitude: 3.6833,
    wilaya: { id_wilaya: 47, nom: 'Ghardaïa' },
    commune: { id_commune: 10, nom: 'Ghardaïa' },
    stats: { noteMoyenne: 4.8, totalMedias: 38, totalMonuments: 9 },
  },
  {
    id_lieu: 14,
    nom: { fr: 'Beni Isguen', ar: 'بني يزقن', en: 'Beni Isguen' },
    typePatrimoine: 'ville_village',
    typeLieu: 'ville_village',
    mainImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
    latitude: 32.4667,
    longitude: 3.6833,
    wilaya: { id_wilaya: 47, nom: 'Ghardaïa' },
    commune: { id_commune: 10, nom: 'Ghardaïa' },
    stats: { noteMoyenne: 4.5, totalMedias: 14, totalMonuments: 4 },
  },

  // ========== ORAN (31) ==========
  {
    id_lieu: 15,
    nom: { fr: 'Santa Cruz', ar: 'سانتا كروز', en: 'Santa Cruz' },
    typePatrimoine: 'monument',
    typeLieu: 'monument',
    mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
    latitude: 35.7120,
    longitude: -0.6470,
    wilaya: { id_wilaya: 31, nom: 'Oran' },
    commune: { id_commune: 11, nom: 'Oran' },
    stats: { noteMoyenne: 4.4, totalMedias: 18, totalMonuments: 3 },
  },
  {
    id_lieu: 16,
    nom: { fr: 'Le Château Neuf', ar: 'القلعة الجديدة', en: 'The New Castle' },
    typePatrimoine: 'palais_forteresse',
    typeLieu: 'palais_forteresse',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 35.7060,
    longitude: -0.6430,
    wilaya: { id_wilaya: 31, nom: 'Oran' },
    commune: { id_commune: 11, nom: 'Oran' },
    stats: { noteMoyenne: 4.3, totalMedias: 12, totalMonuments: 2 },
  },

  // ========== CONSTANTINE (25) ==========
  {
    id_lieu: 17,
    nom: { fr: 'Pont Sidi M\'Cid', ar: 'جسر سيدي مسيد', en: 'Sidi M\'Cid Bridge' },
    typePatrimoine: 'monument',
    typeLieu: 'monument',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 36.3650,
    longitude: 6.6147,
    wilaya: { id_wilaya: 25, nom: 'Constantine' },
    commune: { id_commune: 12, nom: 'Constantine' },
    stats: { noteMoyenne: 4.6, totalMedias: 20, totalMonuments: 4 },
  },
  {
    id_lieu: 18,
    nom: { fr: 'Médersa de Constantine', ar: 'المدرسة القسنطينية', en: 'Constantine Medersa' },
    typePatrimoine: 'edifice_religieux',
    typeLieu: 'edifice_religieux',
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    latitude: 36.3670,
    longitude: 6.6120,
    wilaya: { id_wilaya: 25, nom: 'Constantine' },
    commune: { id_commune: 12, nom: 'Constantine' },
    stats: { noteMoyenne: 4.5, totalMedias: 14, totalMonuments: 3 },
  },

  // ========== BECHAR (8) ==========
  {
    id_lieu: 19,
    nom: { fr: 'Taghit', ar: 'تاغيت', en: 'Taghit' },
    typePatrimoine: 'ville_village',
    typeLieu: 'ville_village',
    mainImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
    latitude: 30.9000,
    longitude: -2.0500,
    wilaya: { id_wilaya: 8, nom: 'Béchar' },
    commune: { id_commune: 13, nom: 'Taghit' },
    stats: { noteMoyenne: 4.4, totalMedias: 16, totalMonuments: 3 },
  },
  {
    id_lieu: 20,
    nom: { fr: 'Oued Guir', ar: 'وادي غير', en: 'Oued Guir' },
    typePatrimoine: 'site_naturel',
    typeLieu: 'site_naturel',
    mainImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
    latitude: 31.0000,
    longitude: -2.5000,
    wilaya: { id_wilaya: 8, nom: 'Béchar' },
    commune: { id_commune: 14, nom: 'Béchar' },
    stats: { noteMoyenne: 4.2, totalMedias: 10, totalMonuments: 1 },
  },
];

// Mock pour un site détaillé (Casbah d'Alger)
const MOCK_SITE_DETAIL: SiteDetail = {
  ...MOCK_SITES[0],
  DetailLieu: {
    description: {
      fr: 'La Casbah d\'Alger est un site historique exceptionnel classé au patrimoine mondial de l\'UNESCO. Elle témoigne de l\'histoire riche et complexe de l\'Algérie à travers les siècles, avec ses ruelles étroites, ses maisons traditionnelles et ses monuments historiques.',
      ar: 'قصبة الجزائر هي موقع تاريخي استثنائي مصنف ضمن التراث العالمي لليونسكو. إنها تشهد على التاريخ الغني والمعقد للجزائر عبر القرون، بأزقتها الضيقة ومنازلها التقليدية ومعالمها التاريخية.',
      en: 'The Casbah of Algiers is an exceptional historical site classified as a UNESCO World Heritage site. It bears witness to the rich and complex history of Algeria through the centuries, with its narrow alleys, traditional houses, and historical monuments.'
    },
    histoire: {
      fr: 'Construite au VIe siècle avant J.-C. sur les ruines d\'un comptoir phénicien, la Casbah a connu plusieurs civilisations : Romains, Vandales, Byzantins, Arabes et Ottomans. Elle a été le cœur de la résistance algérienne pendant la guerre d\'indépendance (1954-1962).',
      ar: 'بنيت في القرن السادس قبل الميلاد على أنقاض مركز تجاري فينيقي، وعرفت القصبة عدة حضارات: الرومان، الوندال، البيزنطيون، العرب والعثمانيون. كانت قلب المقاومة الجزائرية خلال حرب الاستقلال (1954-1962).',
      en: 'Built in the 6th century BC on the ruins of a Phoenician trading post, the Casbah has known several civilizations: Romans, Vandals, Byzantines, Arabs, and Ottomans. It was the heart of the Algerian resistance during the war of independence (1954-1962).'
    },
    horaires: {
      fr: 'Ouvert tous les jours de 9h à 17h. Fermé le vendredi après-midi et les jours fériés.',
      ar: 'مفتوح يومياً من الساعة 9 صباحاً إلى 5 مساءً. مغلق بعد ظهر يوم الجمعة وفي أيام العطل.',
      en: 'Open daily from 9 AM to 5 PM. Closed on Friday afternoons and public holidays.'
    },
    traditions: {
      fr: 'La Casbah est réputée pour son artisanat traditionnel : poterie, bijouterie, vannerie et tissage. Les habitants perpétuent des traditions culinaires comme la couscous, les tajines et les pâtisseries orientales.',
      ar: 'تشتهر القصبة بحرفها التقليدية: الفخار، المجوهرات، صناعة السلال والنسيج. يحافظ السكان على التقاليد الطهوية مثل الكسكس والطواجن والحلويات الشرقية.',
      en: 'The Casbah is renowned for its traditional crafts: pottery, jewelry, basketry, and weaving. The inhabitants perpetuate culinary traditions such as couscous, tagines, and oriental pastries.'
    },
  },
  monuments: [
    {
      id: 1,
      nom: { fr: 'Palais du Dey', ar: 'قصر الداي', en: 'Palace of the Dey' },
      type: 'palais',
      description: {
        fr: 'Ancienne résidence du Dey d\'Alger, symbole du pouvoir ottoman. Construit au XVIe siècle, il offre une vue imprenable sur la baie d\'Alger.',
        ar: 'المقر السابق لداي الجزائر، رمز السلطة العثمانية. بني في القرن السادس عشر، ويوفر إطلالة خلابة على خليج الجزائر.',
        en: 'Former residence of the Dey of Algiers, symbol of Ottoman power. Built in the 16th century, it offers a breathtaking view of the Bay of Algiers.'
      },
    },
    {
      id: 2,
      nom: { fr: 'Mosquée Ketchaoua', ar: 'مسجد كتشاوة', en: 'Ketchaoua Mosque' },
      type: 'mosquée',
      description: {
        fr: 'Mosquée emblématique construite au XVIIe siècle. Elle est caractérisée par son architecture mauresque et ses colonnes de marbre.',
        ar: 'مسجد مميز بني في القرن السابع عشر. يتميز بهندسته المعمارية المغربية وأعمدته الرخامية.',
        en: 'Iconic mosque built in the 17th century. It is characterized by its Moorish architecture and marble columns.'
      },
    },
    {
      id: 3,
      nom: { fr: 'Maison de la Photographie', ar: 'بيت التصوير', en: 'House of Photography' },
      type: 'musée',
      description: {
        fr: 'Espace culturel dédié à la photographie ancienne et contemporaine, installé dans une demeure traditionnelle de la Casbah.',
        ar: 'فضاء ثقافي مخصص للتصوير الفوتوغرافي القديم والمعاصر، يقع في منزل تقليدي في القصبة.',
        en: 'Cultural space dedicated to ancient and contemporary photography, housed in a traditional Casbah mansion.'
      },
    },
  ],
  vestiges: [
    {
      id: 1,
      nom: { fr: 'Remparts antiques', ar: 'الأسوار القديمة', en: 'Ancient Ramparts' },
      type: 'rempart',
      description: {
        fr: 'Tronçons de murailles datant de l\'époque romaine, vestiges de l\'ancienne ville d\'Icosium.',
        ar: 'أجزاء من الأسوار تعود إلى العصر الروماني، بقايا مدينة إيكوزيوم القديمة.',
        en: 'Sections of walls dating from the Roman era, vestiges of the ancient city of Icosium.'
      },
    },
    {
      id: 2,
      nom: { fr: 'Citerne romaine', ar: 'الصهريج الروماني', en: 'Roman Cistern' },
      type: 'citerne',
      description: {
        fr: 'Citerne souterraine de l\'époque romaine, parfaitement conservée, témoignant du génie hydraulique antique.',
        ar: 'صهريج تحت أرضي من العصر الروماني، محفوظ بشكل ممتاز، يشهد على العبقرية الهيدروليكية القديمة.',
        en: 'Underground cistern from the Roman era, perfectly preserved, testifying to ancient hydraulic engineering.'
      },
    },
  ],
  medias: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      type: 'image'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      type: 'image'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800',
      type: 'image'
    },
  ],
  services: [
    { id: 1, nom: { fr: 'Visite guidée' }, disponible: true },
    { id: 2, nom: { fr: 'Boutique de souvenirs' }, disponible: true },
    { id: 3, nom: { fr: 'Cafétéria' }, disponible: false },
    { id: 4, nom: { fr: 'Accès PMR' }, disponible: false },
    { id: 5, nom: { fr: 'Parking' }, disponible: true },
  ],
};

// Indicateur pour utiliser ou non les données mockées
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
      await new Promise(resolve => setTimeout(resolve, 800));

      let filtered = [...MOCK_SITES];

      if (params?.type) {
        filtered = filtered.filter(s => s.typePatrimoine === params.type);
      }

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

      // Simuler la distance : retourner les sites dans un rayon approximatif
      const filtered = MOCK_SITES.filter(site => {
        const distance = calculateDistance(
          latitude,
          longitude,
          site.latitude,
          site.longitude
        );
        return distance <= rayon;
      });

      return {
        data: {
          data: filtered,
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

      // Si c'est le premier site (Casbah), retourner le détail complet
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
                description: {
                  fr: `Description du site ${typeof site.nom === 'string' ? site.nom : site.nom.fr || ''}`,
                },
                histoire: {
                  fr: `Histoire du site ${typeof site.nom === 'string' ? site.nom : site.nom.fr || ''}`,
                },
              },
              monuments: [],
              vestiges: [],
              medias: [],
              services: [],
            },
          },
        };
      }

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

// ============================================================
// UTILITAIRE : Calcul de distance (Haversine)
// ============================================================
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}