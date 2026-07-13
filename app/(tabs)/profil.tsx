import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../src/stores/authStore';

// Écran Profil
export default function ProfilScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Gérer la déconnexion
  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Se déconnecter', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.push('/(auth)/login');
          }
        }
      ]
    );
  };

  // Si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center p-4">
        <Text className="text-4xl mb-4">👤</Text>
        <Text className="text-xl font-semibold text-gray-800 mb-2">Non connecté</Text>
        <Text className="text-gray-500 mb-6 text-center">Connectez-vous pour accéder à votre profil</Text>
        <Pressable
          className="bg-primary rounded-xl px-8 py-3"
          onPress={() => router.push('/(auth)/login')}
        >
          <Text className="text-white font-semibold">Se connecter</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // Profil utilisateur connecté
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="items-center pt-8 pb-6">
        <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-3">
          <Text className="text-4xl">👤</Text>
        </View>
        <Text className="text-xl font-bold text-gray-900">
          {user?.prenom} {user?.nom}
        </Text>
        <Text className="text-gray-500">{user?.email}</Text>
      </View>

      <View className="border-t border-gray-200 pt-4 mt-4">
        <Pressable
          className="bg-red-500 rounded-xl py-4 items-center active:opacity-80"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold">Se déconnecter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}