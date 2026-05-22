import { create } from 'zustand';

type TeamStore = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

export const useTeamStore = create<TeamStore>((set) => ({
  favorites: [],
  toggleFavorite: (id) =>
    set((state) => {
      const isAvailable = state.favorites.includes(id);

      if (isAvailable) {
        return { favorites: state.favorites.filter((f) => f !== id) };
      } else {
        return { favorites: [...state.favorites, id] };
      }
    }),
}));
