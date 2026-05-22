import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTeamStore } from '../store/teamStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { item } = route.params;
  const favorites = useTeamStore((state) => state.favorites);
  const toggleFavorite = useTeamStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(item.id);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Text style={[styles.favIcon, isFavorite && styles.favIconActive]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={[styles.avatar, isFavorite && styles.avatarFav]}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>ID Anggota</Text>
          <Text style={styles.value}>#{item.id.padStart(4, '0')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <Text style={styles.value}>{item.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Jabatan</Text>
          <Text style={styles.value}>{item.role}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Aktif</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Favorit</Text>
          <Text style={styles.value}>{isFavorite ? 'Ya' : 'Tidak'}</Text>
        </View>
      </View>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {},
  backText: {
    fontSize: 16,
    color: '#4f46e5',
    fontWeight: '600',
  },
  favIcon: {
    fontSize: 28,
    color: '#d1d5db',
  },
  favIconActive: {
    color: '#ef4444',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarFav: {
    backgroundColor: '#ef4444',
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  badge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 99,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
  },
});
