import { useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { parcoursApi } from '../../src/api/parcours.api';
import { useAuthStore } from '../../src/stores/authStore';
import { PROFILS_PARCOURS, t } from '../../src/types/parcours.types';
import { useLocation } from '../../src/hooks/useLocation';

export default function ParcoursScreen() {
  const router = useRouter();
  const qc = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const { location } = useLocation();
  const [generating, setGenerating] = useState(false);

  // Récupérer les parcours
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['parcours'],
    queryFn: () => parcoursApi.list(),
    select: d => d.data.data ?? [],
  });

  // Générer un parcours personnalisé
  const generateParcours = async (profil: typeof PROFILS_PARCOURS[number]) => {
    if (!location) {
      Alert.alert('GPS requis', 'Activez le GPS pour générer un parcours');
      return;
    }
    if (!isAuthenticated) {
      Alert.alert('Connexion requise', 'Connectez-vous pour créer un parcours');
      return;
    }

    setGenerating(true);
    try {
      const { data } = await parcoursApi.personnalise({
        latitude: location.latitude,
        longitude: location.longitude,
        rayon: 50,
        theme: profil.theme,
        difficulte: profil.difficulte,
        transport_mode: profil.transport,
      });
      
      qc.invalidateQueries({ queryKey: ['parcours'] });
      
      Alert.alert(
        '✅ Parcours créé !',
        `Votre parcours "${profil.label}" est prêt à être découvert.`,
        [
          { text: 'Voir le détail', onPress: () => router.push(`/parcours/${data.data.id_parcours}` as any) },
          { text: 'OK', style: 'cancel' }
        ]
      );
    } catch (err: any) {
      Alert.alert('Erreur', err.response?.data?.error || 'Impossible de créer le parcours');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-900 mb-4">🧭 Parcours</Text>

        {/* Section : Générer un parcours intelligent */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <Text className="font-semibold text-gray-800 mb-3">
            ✨ Générer un parcours automatique
          </Text>
          
          {generating && (
            <View className="items-center py-2 mb-2">
              <ActivityIndicator color="#1B6CA8" />
              <Text className="text-gray-500 text-sm mt-1">Création en cours...</Text>
            </View>
          )}

          <View className="gap-2">
            {PROFILS_PARCOURS.map((profil) => (
              <Pressable
                key={profil.key}
                className="border border-gray-200 rounded-xl py-3 px-4 active:bg-gray-50 flex-row items-center justify-between"
                onPress={() => generateParcours(profil)}
                disabled={generating}
              >
                <View className="flex-1">
                  <Text className="text-base font-medium">{profil.label}</Text>
                  <Text className="text-xs text-gray-500 mt-0.5">{profil.description}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-xs text-gray-400 capitalize">{profil.difficulte}</Text>
                  <Text className="text-lg">→</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Liste des parcours */}
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => String(item.id_parcours)}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListHeaderComponent={
          <Text className="font-semibold text-gray-700 mb-3">
            📋 Parcours disponibles ({data?.length || 0})
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            className="bg-white rounded-xl p-4 mb-3 shadow-sm active:opacity-80"
            onPress={() => router.push(`/parcours/${item.id_parcours}` as any)}
          >
            <Text className="font-semibold text-base text-gray-900">
              {t(item.nom_parcours)}
            </Text>
            
            {item.description && (
              <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
                {t(item.description)}
              </Text>
            )}

            <View className="flex-row flex-wrap gap-2 mt-3">
              {/* Durée */}
              {item.duree_estimee && (
                <View className="bg-blue-50 px-2 py-1 rounded-full">
                  <Text className="text-xs text-blue-600">⏱ {item.duree_estimee} min</Text>
                </View>
              )}
              
              {/* Distance */}
              {item.distance_km && (
                <View className="bg-green-50 px-2 py-1 rounded-full">
                  <Text className="text-xs text-green-600">📏 {item.distance_km} km</Text>
                </View>
              )}
              
              {/* Difficulté */}
              <View className={`px-2 py-1 rounded-full ${
                item.difficulte === 'facile' ? 'bg-green-50' :
                item.difficulte === 'moyen' ? 'bg-yellow-50' :
                'bg-red-50'
              }`}>
                <Text className={`text-xs ${
                  item.difficulte === 'facile' ? 'text-green-600' :
                  item.difficulte === 'moyen' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {item.difficulte}
                </Text>
              </View>
              
              {/* Thème */}
              {item.theme && (
                <View className="bg-purple-50 px-2 py-1 rounded-full">
                  <Text className="text-xs text-purple-600">#{item.theme}</Text>
                </View>
              )}
            </View>

            {/* Nombre d'étapes */}
            {item.Etapes && (
              <Text className="text-xs text-gray-400 mt-2">
                {item.Etapes.length} étapes
              </Text>
            )}
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-4xl mb-3">🧭</Text>
            <Text className="text-gray-500 text-center">
              Aucun parcours disponible
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              Générez-en un avec les boutons ci-dessus
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}