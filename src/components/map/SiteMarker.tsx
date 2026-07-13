import { Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import type { SitePatrimoine } from '../../types/patrimoine.types';

// Couleurs par type
const MARKER_COLORS: Record<string, string> = {
  ville_village: '#10B981',      // Vert
  monument: '#F59E0B',           // Ambre
  musee: '#8B5CF6',              // Violet
  site_archeologique: '#EF4444', // Rouge
  site_naturel: '#22C55E',       // Vert clair
  edifice_religieux: '#6366F1',  // Indigo
  palais_forteresse: '#EC4899',  // Rose
};

// Icônes par type
const MARKER_ICONS: Record<string, string> = {
  ville_village: '🏘️',
  monument: '🏛️',
  musee: '🏛️',
  site_archeologique: '🪨',
  site_naturel: '🌿',
  edifice_religieux: '⛪',
  palais_forteresse: '🏰',
};

interface Props {
  site: SitePatrimoine;
  onPress: (site: SitePatrimoine) => void;
}

export function SiteMarker({ site, onPress }: Props) {
  const type = site.typePatrimoine || 'autre';
  const color = MARKER_COLORS[type] || '#3B82F6';
  const icon = MARKER_ICONS[type] || '📍';
  const nom = typeof site.nom === 'string' ? site.nom : site.nom?.fr || '';

  return (
    <Marker
      coordinate={{
        latitude: site.latitude,
        longitude: site.longitude,
      }}
      onPress={() => onPress(site)}
      title={nom}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: color,
          borderWidth: 2,
          borderColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 18 }}>{icon}</Text>
      </View>
    </Marker>
  );
}