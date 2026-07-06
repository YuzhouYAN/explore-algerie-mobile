import { View } from 'react-native';

export function SkeletonCard() {
  return (
    <View className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden">
      <View className="w-full h-40 bg-gray-200" />
      <View className="p-3">
        <View className="w-3/4 h-5 bg-gray-200 rounded mb-2" />
        <View className="w-1/3 h-4 bg-gray-200 rounded mb-1" />
        <View className="w-1/2 h-3 bg-gray-200 rounded" />
      </View>
    </View>
  );
}