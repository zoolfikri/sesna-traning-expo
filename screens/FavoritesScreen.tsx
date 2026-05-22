import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MEMBERS, type Item } from '../constants/data';
import { useTeamStore } from '../store/teamStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

function FavCard({ item }: { item: Item }) {
  const toggleFavorite = useTeamStore((state) => state.toggleFavorite);

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Text style={styles.removeBtn}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function FavoritesScreen({ navigation }: Props) {
  const favorites = useTeamStore((state) => state.favorites);
  const favoriteMembers = MEMBERS.filter((m) => favorites.includes(m.id));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Favorit ({favoriteMembers.length})</Text>

      {favoriteMembers.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyText}>Belum ada favorit</Text>
          <Text style={styles.emptyHint}>Tap ♥ di halaman detail untuk menambahkan</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMembers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FavCard item={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  backBtn: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#4f46e5',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  role: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  removeBtn: {
    fontSize: 16,
    color: '#9ca3af',
    paddingHorizontal: 4,
  },
  separator: {
    height: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  emptyHint: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
});
