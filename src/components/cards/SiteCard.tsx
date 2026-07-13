import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

// Couleurs par type de patrimoine
const TYPE_COLORS: Record<string, string> = {
  ville_village: 'bg-emerald-100 text-emerald-800',
  monument: 'bg-amber-100 text-amber-800',
  musee: 'bg-purple-100 text-purple-800',
  site_naturel: 'bg-green-100 text-green-800',
  site_archeologique: 'bg-orange-100 text-orange-800',
  edifice_religieux: 'bg-indigo-100 text-indigo-800',
  palais_forteresse: 'bg-rose-100 text-rose-800',
};

// Icônes par type
const TYPE_ICONS: Record<string, string> = {
  ville_village: '🏘️',
  monument: '🏛️',
  musee: '🏛️',
  site_naturel: '🌿',
  site_archeologique: '🪨',
  edifice_religieux: '⛪',
  palais_forteresse: '🏰',
};

interface SitePatrimoine {
  id_lieu: number;
  nom: string | { fr?: string; ar?: string; en?: string };
  typePatrimoine?: string;
  mainImage?: string;
  wilaya?: { id_wilaya: number; nom: string };
  typeLieu?: string;
}

interface Props {
  site: SitePatrimoine;
  lang?: string;
}

export function SiteCard({ site, lang = 'fr' }: Props) {
  const router = useRouter();

  // Récupérer le nom
  let nom = '';
  if (typeof site.nom === 'string') {
    nom = site.nom;
  } else if (site.nom) {
    nom = site.nom[lang as keyof typeof site.nom] || site.nom.fr || '';
  }

  const type = site.typePatrimoine || site.typeLieu || 'autre';
  const colorClass = TYPE_COLORS[type] || 'bg-gray-100 text-gray-800';
  const icon = TYPE_ICONS[type] || '📍';

  const handlePress = () => {
    router.push(`/patrimoine/${site.id_lieu}`);
  };

  return (
    <Pressable
      className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden active:opacity-80"
      onPress={handlePress}
    >
      {/* Image */}
      <Image
        source={{
          uri:
            site.mainImage ||
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
        }}
        className="w-full h-44"
        resizeMode="cover"
      />

      {/* Contenu */}
      <View className="p-3">
        <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={1}>
          {nom}
        </Text>

        {/* Badge type */}
        <View className={`self-start px-2 py-0.5 rounded-full ${colorClass}`}>
          <Text className="text-xs font-medium">
            {icon} {type}
          </Text>
        </View>

        {/* Wilaya */}
        {site.wilaya && (
          <Text className="text-xs text-gray-500 mt-1">
            📍 {site.wilaya.nom}
          </Text>
        )}
      </View>
    </Pressable>
  );
}