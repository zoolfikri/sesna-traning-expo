import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constants/api';

export type News = {
  id: number;
  title: string;
  content: string;
  image: string | null;
  category: string | null;
  created_at: string;
};

async function fetchNews(): Promise<News[]> {
  const res = await fetch(`${BASE_URL}/news`);
  const json = await res.json();
  return json.data;
}

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 5,
  });
}
