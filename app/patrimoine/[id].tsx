import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { patrimoineApi } from '../../src/api/patrimoine.api';

export default function PatrimoineDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['patrimoine', id],
    queryFn: () => patrimoineApi.detail(Number(id)),
    enabled: !!id,
  });

  const site = data?.data?.data;

  // Chargement
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#1B6CA8" />
        <Text className="text-gray-500 mt-3">Chargement du site...</Text>
      </SafeAreaView>
    );
  }

  // Erreur
  if (error || !site) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center p-4">
        <Text className="text-4xl mb-4">😢</Text>
        <Text className="text-xl font-semibold text-gray-800 mb-2">
          Site non trouvé
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          Ce site patrimonial n'existe pas ou a été supprimé.
        </Text>
        <Pressable
          className="bg-primary rounded-xl px-6 py-3"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Retour</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // Récupérer les données
  const nom = typeof site.nom === 'string' ? site.nom : site.nom?.fr || '';
  const description =
    typeof site.DetailLieu?.description === 'string'
      ? site.DetailLieu.description
      : site.DetailLieu?.description?.fr || '';
  const histoire =
    typeof site.DetailLieu?.histoire === 'string'
      ? site.DetailLieu.histoire
      : site.DetailLieu?.histoire?.fr || '';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image de couverture */}
        <View className="relative">
          <Image
            source={{
              uri:
                site.mainImage ||
                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
            }}
            className="w-full h-72"
            resizeMode="cover"
          />

          {/* Bouton retour */}
          <Pressable
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#1F2937" />
          </Pressable>
        </View>

        {/* Contenu */}
        <View className="p-4">
          {/* Nom */}
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {nom}
          </Text>

          {/* Localisation */}
          {site.wilaya && (
            <Text className="text-gray-500 text-sm mb-3">
              📍 {site.wilaya.nom}
              {site.commune && `, ${site.commune.nom}`}
            </Text>
          )}

          {/* Type */}
          {site.typePatrimoine && (
            <View className="bg-primary/10 self-start px-3 py-1 rounded-full mb-4">
              <Text className="text-primary text-xs font-medium">
                {site.typePatrimoine}
              </Text>
            </View>
          )}

          {/* Description */}
          {description && (
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                Description
              </Text>
              <Text className="text-gray-600 leading-6">{description}</Text>
            </View>
          )}

          {/* Histoire */}
          {histoire && (
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                Histoire
              </Text>
              <Text className="text-gray-600 leading-6">{histoire}</Text>
            </View>
          )}

          {/* Monuments / Vestiges */}
          {site.monuments && site.monuments.length > 0 && (
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                🏛️ Monuments associés
              </Text>
              {site.monuments.map((monument: any, index: number) => (
                <View key={index} className="bg-gray-50 rounded-xl p-3 mb-2">
                  <Text className="font-medium text-gray-800">
                    {typeof monument.nom === 'string'
                      ? monument.nom
                      : monument.nom?.fr || ''}
                  </Text>
                  {monument.description && (
                    <Text className="text-gray-500 text-sm mt-1">
                      {typeof monument.description === 'string'
                        ? monument.description
                        : monument.description?.fr || ''}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {site.vestiges && site.vestiges.length > 0 && (
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                🪨 Vestiges
              </Text>
              {site.vestiges.map((vestige: any, index: number) => (
                <View key={index} className="bg-gray-50 rounded-xl p-3 mb-2">
                  <Text className="font-medium text-gray-800">
                    {typeof vestige.nom === 'string'
                      ? vestige.nom
                      : vestige.nom?.fr || ''}
                  </Text>
                  {vestige.description && (
                    <Text className="text-gray-500 text-sm mt-1">
                      {typeof vestige.description === 'string'
                        ? vestige.description
                        : vestige.description?.fr || ''}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}