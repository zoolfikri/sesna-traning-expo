import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MEMBERS, type Item } from '../constants/data';
import { useTeamStore } from '../store/teamStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function ItemCard({ item, onPress }: { item: Item; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

export default function FlatListScreen({ navigation }: Props) {
  const favorites = useTeamStore((state) => state.favorites);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daftar Anggota Tim</Text>
        <View style={styles.headerBtns}>
          <TouchableOpacity style={styles.favBtn} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.favBtnText}>♥ {favorites.length > 0 ? `(${favorites.length})` : ''}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.apiBtn} onPress={() => navigation.navigate('Users')}>
            <Text style={styles.apiBtnText}>API</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={MEMBERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={() => navigation.navigate('Detail', { item })} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  favBtn: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  favBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ef4444',
  },
  apiBtn: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  apiBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4f46e5',
  },
  list: {
    paddingHorizontal: 16,
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
    backgroundColor: '#4f46e5',
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
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
  },
  separator: {
    height: 8,
  },
});
