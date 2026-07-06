import { Tabs } from 'expo-router';
import { Compass, Map, Route, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1B6CA8',
        tabBarStyle: { paddingBottom: 5 },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Carte', tabBarIcon: ({ color }) => <Map color={color} size={22} /> }}
      />
      <Tabs.Screen
        name="explorer"
        options={{ title: 'Explorer', tabBarIcon: ({ color }) => <Compass color={color} size={22} /> }}
      />
      <Tabs.Screen
        name="parcours"
        options={{ title: 'Parcours', tabBarIcon: ({ color }) => <Route color={color} size={22} /> }}
      />
      <Tabs.Screen
        name="profil"
        options={{ title: 'Profil', tabBarIcon: ({ color }) => <User color={color} size={22} /> }}
      />
    </Tabs>
  );
}