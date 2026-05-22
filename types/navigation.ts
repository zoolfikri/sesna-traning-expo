import { Item } from '../constants/data';

export type RootStackParamList = {
  Home: undefined;
  Detail: { item: Item };
  Favorites: undefined;
  Users: undefined;
};
