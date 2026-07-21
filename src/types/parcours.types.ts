// Types pour les parcours

export type TransportMode = 'marche' | 'velo' | 'voiture' | 'transport_public';
export type Difficulte = 'facile' | 'moyen' | 'difficile';

export interface MultilingualField {
  fr?: string;
  ar?: string;
  en?: string;
}

export interface Etape {
  id_parcours_lieu: number;
  ordre: number;
  id_lieu: number;
  duree_estimee?: number;
  distance_precedent?: number;
  temps_trajet?: number;
  transport_mode?: TransportMode;
  notes?: string;
  Lieu?: {
    id_lieu: number;
    nom: MultilingualField | string;
    latitude: number;
    longitude: number;
    mainImage?: string;
  };
  // Champs formatés retournés par le backend
  duree_formatee?: string;
  distance_formatee?: string;
  temps_trajet_formate?: string;
}

export interface Parcours {
  id_parcours: number;
  nom_parcours: MultilingualField | string;
  description?: MultilingualField | string;
  duree_estimee?: number;
  difficulte: Difficulte;
  theme?: string;
  distance_km?: number;
  transport_mode?: TransportMode;
  statut: 'actif' | 'inactif' | 'maintenance';
  Etapes?: Etape[];
  utilisateur?: {
    id_utilisateur: number;
    nom: string;
    prenom: string;
  };
}

// Profils de parcours
export const PROFILS_PARCOURS = [
  {
    key: 'randonneur',
    label: '🥾 Randonnée',
    theme: 'nature',
    difficulte: 'moyen' as Difficulte,
    transport: 'marche' as TransportMode,
    description: 'Découvrez les paysages naturels à travers des sentiers de randonnée',
  },
  {
    key: 'culture',
    label: '🏛 Touriste culturel',
    theme: 'historique',
    difficulte: 'facile' as Difficulte,
    transport: 'voiture' as TransportMode,
    description: 'Visitez les monuments et sites historiques incontournables',
  },
  {
    key: 'histoire',
    label: '📖 Amoureux d\'histoire',
    theme: 'patrimoine',
    difficulte: 'facile' as Difficulte,
    transport: 'voiture' as TransportMode,
    description: 'Plongez dans l\'histoire à travers les vestiges et sites archéologiques',
  },
] as const;

// Fonction helper pour la traduction
export const t = (field: MultilingualField | string | null | undefined, lang = 'fr'): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang as keyof MultilingualField] || field.fr || field.ar || '';
};