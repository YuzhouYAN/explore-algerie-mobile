import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-4xl mb-4">👤</Text>
      <Text className="text-xl font-semibold text-gray-800">Profil</Text>
      <Text className="text-gray-500 mt-2">Le profil arrivera au TP2</Text>
    </SafeAreaView>
  );
}