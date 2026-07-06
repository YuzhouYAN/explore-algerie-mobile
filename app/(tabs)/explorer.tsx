import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SiteCard } from '../../src/components/cards/SiteCard';
import { SkeletonCard } from '../../src/components/ui/SkeletonCard';

interface SitePatrimoine {
  id_lieu: number;
  nom: string | { fr?: string; ar?: string; en?: string };
  typePatrimoine?: string;
  mainImage?: string;
  wilaya?: { id_wilaya: number; nom: string };
}

const TYPES = [
  { key: '', label: 'Tous' },
  { key: 'ville_village', label: 'Villes' },
  { key: 'monument', label: 'Monuments' },
  { key: 'site_archeologique', label: 'Vestiges' },
  { key: 'site_naturel', label: 'Nature' },
];

const MOCK_SITES: SitePatrimoine[] = [
  {
    id_lieu: 1,
    nom: "Casbah d'Alger",
    typePatrimoine: 'monument',
    mainImage: 'https://via.placeholder.com/400x200',
    wilaya: { id_wilaya: 16, nom: 'Alger' }
  },
  {
    id_lieu: 2,
    nom: 'Timgad',
    typePatrimoine: 'site_archeologique',
    mainImage: 'https://via.placeholder.com/400x200',
    wilaya: { id_wilaya: 5, nom: 'Batna' }
  },
  {
    id_lieu: 3,
    nom: 'Tipaza',
    typePatrimoine: 'site_archeologique',
    mainImage: 'https://via.placeholder.com/400x200',
    wilaya: { id_wilaya: 42, nom: 'Tipaza' }
  },
];

export default function ExplorerScreen() {
  const [selectedType, setSelectedType] = useState('');
  const [search, setSearch] = useState('');

  const isLoading = false;
  const sites = MOCK_SITES;

  const filtered = search.trim()
    ? sites.filter(s => {
        const nom = typeof s.nom === 'string' ? s.nom : s.nom?.fr || '';
        return nom.toLowerCase().includes(search.toLowerCase());
      })
    : sites;

  const filteredByType = selectedType
    ? filtered.filter(s => s.typePatrimoine === selectedType)
    : filtered;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-900 mb-3">Explorer</Text>

        <TextInput
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-3"
          placeholder="Rechercher un site..."
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TYPES.map((type) => {
            const isSelected = selectedType === type.key;
            return (
              <Pressable
                key={type.key}
                onPress={() => setSelectedType(type.key)}
                style={{
                  marginRight: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: isSelected ? '#1B6CA8' : '#e5e7eb',
                  backgroundColor: isSelected ? '#1B6CA8' : 'white',
                }}
              >
                <Text style={{
                  color: isSelected ? 'white' : '#374151',
                  fontWeight: isSelected ? '600' : '400',
                }}>
                  {type.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={isLoading ? Array(4).fill(null) : filteredByType}
        keyExtractor={(item, i) => item ? String(item.id_lieu) : String(i)}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        renderItem={({ item }) =>
          isLoading || !item
            ? <SkeletonCard />
            : <SiteCard site={item} />
        }
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-4xl mb-3">🏛</Text>
            <Text className="text-gray-500 text-center">Aucun site trouvé</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}