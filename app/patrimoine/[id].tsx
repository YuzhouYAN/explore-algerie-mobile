import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function PatrimoineDetail() {
  const { id } = useLocalSearchParams();
  
  return (
    <View className="flex-1 bg-white items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">🏛️</Text>
      <Text className="text-xl font-semibold text-gray-800">Détail du site</Text>
      <Text className="text-gray-500 mt-2">ID: {id}</Text>
      <Text className="text-gray-400 mt-4 text-center">Arrive au TP3</Text>
    </View>
  );
}