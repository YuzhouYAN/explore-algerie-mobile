import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';
import { useAuthStore } from '../src/stores/authStore';

// Client React Query pour le cache des données
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

// Layout principal de l'application
export default function RootLayout() {
  const { loadFromStorage } = useAuthStore();

  // Charger le token au démarrage
  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Routes d'authentification */}
          <Stack.Screen name="(auth)" />
          {/* Routes principales avec onglets */}
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}