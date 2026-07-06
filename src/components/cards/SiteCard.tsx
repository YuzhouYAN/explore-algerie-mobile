import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

const TYPE_COLORS: Record<string, string> = {
  ville_village: 'bg-emerald-100 text-emerald-800',
  monument: 'bg-amber-100 text-amber-800',
  site_naturel: 'bg-green-100 text-green-800',
  site_archeologique: 'bg-orange-100 text-orange-800',
};

interface SitePatrimoine {
  id_lieu: number;
  nom: string | { fr?: string; ar?: string; en?: string };
  typePatrimoine?: string;
  mainImage?: string;
  wilaya?: { id_wilaya: number; nom: string };
}

interface Props {
  site: SitePatrimoine;
  lang?: string;
}

export function SiteCard({ site, lang = 'fr' }: Props) {
  const router = useRouter();
  
  // 处理 nom 字段
  let nom = '';
  if (typeof site.nom === 'string') {
    nom = site.nom;
  } else if (site.nom) {
    nom = site.nom[lang as keyof typeof site.nom] || site.nom.fr || '';
  }
  
  const colorClass = TYPE_COLORS[site.typePatrimoine || ''] || 'bg-gray-100 text-gray-800';

  const handlePress = () => {
    // 使用 as any 绕过类型检查
    router.push(`/patrimoine/${site.id_lieu}` as any);
  };

  return (
    <Pressable
      className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden active:opacity-80"
      onPress={handlePress}
    >
      <Image
        source={{ uri: site.mainImage || 'https://via.placeholder.com/400x200' }}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-base font-semibold text-gray-900 mb-1">{nom}</Text>
        <View className="self-start px-2 py-0.5 rounded-full bg-gray-100">
          <Text className="text-xs font-medium text-gray-800">{site.typePatrimoine || 'Site'}</Text>
        </View>
        {site.wilaya && (
          <Text className="text-xs text-gray-500 mt-1">📍 {site.wilaya.nom}</Text>
        )}
      </View>
    </Pressable>
  );
}