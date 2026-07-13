import { useQuery } from '@tanstack/react-query';
import { patrimoineApi } from '../api/patrimoine.api';
import type { UserLocation } from './useLocation';

export function useNearby(location: UserLocation | null, rayon: number) {
  return useQuery({
    queryKey: ['nearby', location?.latitude, location?.longitude, rayon],
    queryFn: () => {
      if (!location) throw new Error('Position non disponible');
      return patrimoineApi.nearby(location.latitude, location.longitude, rayon);
    },
    enabled: !!location,
    staleTime: 2 * 60 * 1000, // 2 minutes
    select: (data) => data.data.data ?? [],
  });
}