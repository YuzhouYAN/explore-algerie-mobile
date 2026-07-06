import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-4xl mb-4">🗺️</Text>
      <Text className="text-xl font-semibold text-gray-800">Carte</Text>
      <Text className="text-gray-500 mt-2">Arrive au TP4</Text>
    </SafeAreaView>
  );
}