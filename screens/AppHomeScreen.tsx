import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useBanners } from '../hooks/useBanners';
import { useNews, type News } from '../hooks/useNews';
import { useAuthStore } from '../store/authStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AppHome'>;

function NewsCard({ news, onPress }: { news: News; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.newsCard} onPress={onPress} activeOpacity={0.8}>
      {news.image && (
        <Image source={{ uri: news.image }} style={styles.newsImage} />
      )}
      <View style={styles.newsBody}>
        {news.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{news.category}</Text>
          </View>
        )}
        <Text style={styles.newsTitle} numberOfLines={2}>{news.title}</Text>
        <Text style={styles.newsDate}>{news.created_at}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function AppHomeScreen({ navigation }: Props) {
  const user = useAuthStore((state) => state.user);
  const { data: banners } = useBanners();
  const { data: newsList, isLoading: newsLoading } = useNews();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, {user?.name ?? 'User'} 👋</Text>
          <Text style={styles.subGreeting}>Selamat datang di Sesna</Text>
        </View>
        <TouchableOpacity
          style={styles.avatarBtn}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.avatarText}>{user?.name?.[0] ?? 'U'}</Text>
        </TouchableOpacity>
      </View>

      {/* Banners */}
      {banners && banners.length > 0 && (
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {banners.map((banner) => (
              <View key={banner.id} style={styles.bannerCard}>
                <Image source={{ uri: banner.image }} style={styles.bannerImage} />
                <Text style={styles.bannerTitle} numberOfLines={1}>{banner.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* News */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Berita Terbaru</Text>

        {newsLoading && (
          <ActivityIndicator color="#4f46e5" style={{ marginTop: 20 }} />
        )}

        {newsList?.map((news) => (
          <NewsCard
            key={news.id}
            news={news}
            onPress={() => navigation.navigate('NewsDetail', { news })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subGreeting: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  bannerCard: {
    width: 280,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: 280,
    height: 120,
  },
  bannerTitle: {
    padding: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 160,
  },
  newsBody: {
    padding: 12,
  },
  categoryBadge: {
    backgroundColor: '#ede9fe',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4f46e5',
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
