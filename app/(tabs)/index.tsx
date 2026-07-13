import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SiteMarker } from '../../src/components/map/SiteMarker';
import { useLocation } from '../../src/hooks/useLocation';
import { useNearby } from '../../src/hooks/useNearby';
import type { SitePatrimoine } from '../../src/types/patrimoine.types';

const RAYONS = [
  { km: 5, label: '5 km' },
  { km: 20, label: '20 km' },
  { km: 50, label: '50 km' },
];

// Position par défaut : Alger
const DEFAULT_REGION = {
  latitude: 36.7538,
  longitude: 3.0588,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [rayon, setRayon] = useState(20);
  const { location, loading: locLoading } = useLocation();
  const { data: sites = [], isLoading } = useNearby(location, rayon);

  const handleMarkerPress = (site: SitePatrimoine) => {
    router.push(`/patrimoine/${site.id_lieu}`);
  };

  const centerOnUser = () => {
    if (!location) return;
    mapRef.current?.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      800
    );
  };

  // Chargement de la localisation
  if (locLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#1B6CA8" />
        <Text className="text-gray-500 mt-3">Recherche de votre position...</Text>
      </SafeAreaView>
    );
  }

  const region: Region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }
    : DEFAULT_REGION;

  return (
    <View className="flex-1">
      {/* Carte */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        className="flex-1"
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {sites.map((site) => (
          <SiteMarker key={site.id_lieu} site={site} onPress={handleMarkerPress} />
        ))}
      </MapView>

      {/* Filtres rayon - en haut */}
      <View className="absolute top-14 left-0 right-0 px-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {RAYONS.map((r) => {
            const isSelected = rayon === r.km;
            return (
              <Pressable
                key={r.km}
                onPress={() => setRayon(r.km)}
                style={{
                  marginRight: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: isSelected ? '#1B6CA8' : 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? 'white' : '#374151',
                    fontWeight: isSelected ? '600' : '400',
                  }}
                >
                  {r.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Compteur de sites */}
      <View className="absolute top-28 right-4">
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#1B6CA8" />
          ) : (
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#1B6CA8' }}>
              {sites.length} sites
            </Text>
          )}
        </View>
      </View>

      {/* Bouton Ma position */}
      <Pressable
        style={{
          position: 'absolute',
          bottom: 32,
          right: 16,
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={centerOnUser}
      >
        <Text style={{ fontSize: 22 }}>📍</Text>
      </Pressable>
    </View>
  );
}