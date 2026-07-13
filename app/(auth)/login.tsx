import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../src/stores/authStore';

// Écran de connexion
export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Gérer la connexion
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Email et mot de passe requis');
      return;
    }
    try {
      await login({ email, password });
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert(
        'Connexion impossible',
        err.response?.data?.error || 'Vérifiez vos identifiants'
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <Text className="text-3xl font-bold text-primary mb-2">Explore Algérie</Text>
      <Text className="text-gray-500 mb-8">Connectez-vous pour découvrir le patrimoine</Text>

      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-6 text-base"
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        className="bg-primary rounded-xl py-4 items-center active:opacity-80"
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color="white" />
          : <Text className="text-white font-semibold text-base">Se connecter</Text>}
      </Pressable>

      <Pressable 
        className="mt-4 items-center" 
        onPress={() => router.push('/(auth)/register')}
      >
        <Text className="text-gray-500">
          Pas de compte ? <Text className="text-primary font-medium">S'inscrire</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}