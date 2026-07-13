// Types pour les sites patrimoniaux

export type MultilingualField = {
  fr?: string;
  ar?: string;
  en?: string;
};

export type TypePatrimoine =
  | 'ville_village'
  | 'monument'
  | 'musee'
  | 'site_archeologique'
  | 'site_naturel'
  | 'edifice_religieux'
  | 'palais_forteresse'
  | 'autre';

// Site patrimonial (version liste)
export interface SitePatrimoine {
  id_lieu: number;
  nom: MultilingualField | string;
  adresse?: MultilingualField | string;
  latitude: number;
  longitude: number;
  typePatrimoine?: TypePatrimoine;
  typeLieu: string;
  mainImage?: string;
  wilaya?: {
    id_wilaya: number;
    nom: string;
  };
  commune?: {
    id_commune: number;
    nom: string;
  };
  stats?: {
    noteMoyenne: number | null;
    totalMedias: number;
    totalMonuments: number;
  };
}

// Site détaillé (version complète)
export interface SiteDetail extends SitePatrimoine {
  DetailLieu?: {
    description?: MultilingualField | string;
    histoire?: MultilingualField | string;
    horaires?: MultilingualField | string;
    gastronomie?: MultilingualField | string;
    traditions?: MultilingualField | string;
  };
  monuments?: Array<{
    id: number;
    nom: MultilingualField | string;
    type: string;
    description?: MultilingualField | string;
  }>;
  vestiges?: Array<{
    id: number;
    nom: MultilingualField | string;
    type: string;
    description?: MultilingualField | string;
  }>;
  medias?: Array<{
    id: number;
    url: string;
    type: string;
  }>;
  services?: Array<{
    id: number;
    nom: MultilingualField | string;
    disponible: boolean;
  }>;
}

// Fonction helper pour la traduction
export const t = (
  field: MultilingualField | string | null | undefined,
  lang = 'fr'
): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang as keyof MultilingualField] || field.fr || field.ar || '';
};