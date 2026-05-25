import { Item } from '../constants/data';
import { News } from '../hooks/useNews';

export type RootStackParamList = {
  Login: undefined;
  AppHome: undefined;
  Home: undefined;
  Detail: { item: Item };
  Favorites: undefined;
  Users: undefined;
  NewsDetail: { news: News };
  Profile: undefined;
};
