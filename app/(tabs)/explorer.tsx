import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { patrimoineApi } from '../../src/api/patrimoine.api';
import { SiteCard } from '../../src/components/cards/SiteCard';
import { SkeletonCard } from '../../src/components/ui/SkeletonCard';
import { SitePatrimoine } from '../../src/types/patrimoine.types';

// Types de filtres
const TYPES = [
  { key: '', label: 'Tous' },
  { key: 'ville_village', label: '🏘 Villes' },
  { key: 'monument', label: '🏛 Monuments' },
  { key: 'musee', label: '🏛️ Musées' },
  { key: 'site_archeologique', label: '🪨 Vestiges' },
  { key: 'site_naturel', label: '🌿 Nature' },
  { key: 'edifice_religieux', label: '⛪ Religieux' },
  { key: 'palais_forteresse', label: '🏰 Palais' },
];

export default function ExplorerScreen() {
  const [selectedType, setSelectedType] = useState('');
  const [search, setSearch] = useState('');

  // Récupération des données depuis l'API
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['patrimoine', selectedType],
    queryFn: () => patrimoineApi.list({ type: selectedType || undefined }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const sites = data?.data?.data ?? [];

  // Filtrage par recherche (frontend)
  const filtered = search.trim()
    ? sites.filter((site: SitePatrimoine) => {
        const nom = typeof site.nom === 'string' ? site.nom : site.nom?.fr || '';
        return nom.toLowerCase().includes(search.toLowerCase());
      })
    : sites;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* En-tête */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-900 mb-3">Explorer</Text>

        {/* Barre de recherche */}
        <TextInput
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-3 text-base"
          placeholder="🔍 Rechercher un site..."
          value={search}
          onChangeText={setSearch}
        />

        {/* Filtres par type */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-1"
        >
          {TYPES.map((type) => {
            const isSelected = selectedType === type.key;
            return (
              <Pressable
                key={type.key}
                onPress={() => setSelectedType(type.key)}
                className={`mr-2 px-4 py-2 rounded-full border ${
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={
                    isSelected ? 'text-white font-medium' : 'text-gray-700'
                  }
                >
                  {type.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Liste des sites */}
      <FlatList
        data={isLoading ? Array(6).fill(null) : filtered}
        keyExtractor={(item, index) =>
          item ? String(item.id_lieu) : `skeleton-${index}`
        }
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({ item }) =>
          isLoading || !item ? (
            <SkeletonCard />
          ) : (
            <SiteCard site={item} />
          )
        }
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-4xl mb-3">🏛️</Text>
            <Text className="text-gray-500 text-center">
              {search.trim()
                ? 'Aucun site ne correspond à votre recherche'
                : 'Aucun site trouvé'}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}