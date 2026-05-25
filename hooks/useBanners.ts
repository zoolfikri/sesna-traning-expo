import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constants/api';

export type Banner = {
  id: number;
  title: string;
  image: string;
  link: string | null;
  order: number;
};

async function fetchBanners(): Promise<Banner[]> {
  const res = await fetch(`${BASE_URL}/banners`);
  const json = await res.json();
  return json.data;
}

export function useBanners() {
  return useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
    staleTime: 1000 * 60 * 10,
  });
}
