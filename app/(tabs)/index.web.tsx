import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function MapScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-4">
      <Text className="text-4xl mb-4">🗺️</Text>
      <Text className="text-xl font-semibold text-gray-800">Carte</Text>
      <Text className="text-gray-500 text-center mt-2">
        La carte est disponible sur mobile uniquement.
      </Text>
      <Text className="text-gray-400 text-sm mt-1">
        Testez sur l'application mobile pour voir les fonctionnalités GPS.
      </Text>
      <Pressable 
        className="mt-6 bg-primary px-6 py-3 rounded-xl"
        onPress={() => router.push('/explorer')}
      >
        <Text className="text-white font-semibold">Voir les sites</Text>
      </Pressable>
    </SafeAreaView>
  );
}