import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { parcoursApi } from '../../src/api/parcours.api';
import { t } from '../../src/types/parcours.types';

export default function ParcoursDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['parcours', id],
    queryFn: () => parcoursApi.detail(Number(id)),
    enabled: !!id,
  });

  const parcours = data?.data?.data;

  // Chargement
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#1B6CA8" />
        <Text className="text-gray-500 mt-3">Chargement du parcours...</Text>
      </SafeAreaView>
    );
  }

  // Erreur
  if (error || !parcours) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center p-4">
        <Text className="text-4xl mb-4">😢</Text>
        <Text className="text-xl font-semibold text-gray-800 mb-2">Parcours non trouvé</Text>
        <Text className="text-gray-500 text-center mb-6">Ce parcours n'existe pas ou a été supprimé.</Text>
        <Pressable className="bg-primary rounded-xl px-6 py-3" onPress={() => router.back()}>
          <Text className="text-white font-semibold">Retour</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const nom = t(parcours.nom_parcours);
  const description = t(parcours.description);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* En-tête */}
      <View className="flex-row items-center px-4 pt-2 pb-4 border-b border-gray-100">
        <Pressable className="p-2 -ml-2" onPress={() => router.back()}>
          <ChevronLeft size={24} color="#1F2937" />
        </Pressable>
        <Text className="text-lg font-semibold text-gray-900 flex-1 ml-1" numberOfLines={1}>
          {nom}
        </Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Description */}
        {description && (
          <View className="mb-4">
            <Text className="text-gray-600 leading-6">{description}</Text>
          </View>
        )}

        {/* Informations */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          {parcours.duree_estimee && (
            <View className="bg-blue-50 px-3 py-1.5 rounded-full">
              <Text className="text-sm text-blue-600">⏱ {parcours.duree_estimee} min</Text>
            </View>
          )}
          {parcours.distance_km && (
            <View className="bg-green-50 px-3 py-1.5 rounded-full">
              <Text className="text-sm text-green-600">📏 {parcours.distance_km} km</Text>
            </View>
          )}
          <View className={`px-3 py-1.5 rounded-full ${
            parcours.difficulte === 'facile' ? 'bg-green-50' :
            parcours.difficulte === 'moyen' ? 'bg-yellow-50' :
            'bg-red-50'
          }`}>
            <Text className={`text-sm ${
              parcours.difficulte === 'facile' ? 'text-green-600' :
              parcours.difficulte === 'moyen' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {parcours.difficulte}
            </Text>
          </View>
          {parcours.theme && (
            <View className="bg-purple-50 px-3 py-1.5 rounded-full">
              <Text className="text-sm text-purple-600">#{parcours.theme}</Text>
            </View>
          )}
        </View>

        {/* Étapes */}
        {parcours.Etapes && parcours.Etapes.length > 0 && (
          <View>
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              🗺️ Étapes ({parcours.Etapes.length})
            </Text>

            {parcours.Etapes.map((etape, index) => {
              const nomLieu = etape.Lieu ? t(etape.Lieu.nom) : `Étape ${index + 1}`;
              return (
                <View key={etape.id_parcours_lieu} className="bg-gray-50 rounded-xl p-4 mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                      <Text className="text-white font-bold text-sm">{index + 1}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-800">{nomLieu}</Text>
                      {etape.duree_estimee && (
                        <Text className="text-xs text-gray-500">
                          ⏱ {etape.duree_estimee} min
                          {etape.distance_precedent && ` · 📏 ${etape.distance_precedent} km`}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}