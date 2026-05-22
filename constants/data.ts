export type Item = {
  id: string;
  name: string;
  role: string;
};

export const MEMBERS: Item[] = [
  { id: '1', name: 'Budi Santoso', role: 'Developer' },
  { id: '2', name: 'Siti Rahayu', role: 'Designer' },
  { id: '3', name: 'Ahmad Fauzi', role: 'Manager' },
  { id: '4', name: 'Dewi Kusuma', role: 'QA Engineer' },
  { id: '5', name: 'Rizky Pratama', role: 'DevOps' },
  { id: '6', name: 'Nurul Hidayah', role: 'Product Owner' },
  { id: '7', name: 'Hendra Wijaya', role: 'Backend Dev' },
  { id: '8', name: 'Ayu Lestari', role: 'Frontend Dev' },
  { id: '9', name: 'Fajar Ramadhan', role: 'Mobile Dev' },
  { id: '10', name: 'Indah Permata', role: 'UI/UX Designer' },
  { id: '11', name: 'Galih Wicaksono', role: 'Data Engineer' },
  { id: '12', name: 'Rini Anggraeni', role: 'Scrum Master' },
  { id: '13', name: 'Dimas Kurniawan', role: 'System Analyst' },
  { id: '14', name: 'Putri Handayani', role: 'Business Analyst' },
  { id: '15', name: 'Agus Setiawan', role: 'Security Engineer' },
  { id: '16', name: 'Mega Wulandari', role: 'Cloud Architect' },
  { id: '17', name: 'Bayu Nugroho', role: 'Full Stack Dev' },
  { id: '18', name: 'Lina Marlina', role: 'Technical Writer' },
  { id: '19', name: 'Eko Prasetyo', role: 'Database Admin' },
  { id: '20', name: 'Vina Octavia', role: 'Marketing Tech' },
  { id: '21', name: 'Hadi Purnomo', role: 'Network Engineer' },
  { id: '22', name: 'Tari Kuswardani', role: 'ML Engineer' },
  { id: '23', name: 'Wahyu Hidayat', role: 'iOS Developer' },
  { id: '24', name: 'Rina Fitriani', role: 'Android Developer' },
  { id: '25', name: 'Surya Dharma', role: 'Site Reliability Eng' },
];

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
};