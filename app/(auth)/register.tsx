import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../src/stores/authStore';

// Écran d'inscription
export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Gérer l'inscription
  const handleRegister = async () => {
    if (!nom || !prenom || !email || !password) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }
    try {
      await register({ nom, prenom, email, password });
      Alert.alert(
        'Inscription réussie !',
        'Vous pouvez maintenant vous connecter',
        [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
      );
    } catch (err: any) {
      Alert.alert(
        'Inscription impossible',
        err.response?.data?.error || 'Veuillez réessayer'
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <Text className="text-3xl font-bold text-primary mb-2">Créer un compte</Text>
      <Text className="text-gray-500 mb-8">Rejoignez la communauté Explore Algérie</Text>

      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
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
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color="white" />
          : <Text className="text-white font-semibold text-base">S'inscrire</Text>}
      </Pressable>

      <Pressable 
        className="mt-4 items-center" 
        onPress={() => router.push('/(auth)/login')}
      >
        <Text className="text-gray-500">
          Déjà un compte ? <Text className="text-primary font-medium">Se connecter</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}