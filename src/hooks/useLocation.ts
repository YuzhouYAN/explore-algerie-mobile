import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        // Demander la permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setError('Permission GPS refusée');
          setLoading(false);
          // Position par défaut : Alger
          setLocation({ latitude: 36.7538, longitude: 3.0588 });
          return;
        }

        // Position initiale
        const initial = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        setLocation({
          latitude: initial.coords.latitude,
          longitude: initial.coords.longitude,
        });
        setLoading(false);

        // Mise à jour en temps réel (toutes les 10 secondes)
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 10000,
            distanceInterval: 50,
          },
          (pos) => {
            setLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          }
        );
      } catch (err) {
        setError('Erreur de localisation');
        setLoading(false);
        // Position par défaut
        setLocation({ latitude: 36.7538, longitude: 3.0588 });
      }
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { location, error, loading };
}