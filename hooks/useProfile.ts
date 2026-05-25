import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constants/api';
import { useAuthStore } from '../store/authStore';

async function fetchProfile(token: string) {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  return json.data;
}

export function useProfile() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(token!),
    enabled: !!token,
  });
}
