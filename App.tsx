import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { StatusBar } from "expo-status-bar";
import AppHomeScreen from "./screens/AppHomeScreen";
import DetailScreen from "./screens/DetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FlatListScreen from "./screens/FlatListScreen";
import LoginScreen from "./screens/LoginScreen";
import NewsDetailScreen from "./screens/NewsDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UsersScreen from "./screens/UsersScreen";
import { useAuthStore } from "./store/authStore";
import type { RootStackParamList } from "./types/navigation";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	const token = useAuthStore((state) => state.token);

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName={token ? 'AppHome' : 'Login'}
				>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="AppHome" component={AppHomeScreen} />
					<Stack.Screen name="Home" component={FlatListScreen} />
					<Stack.Screen name="Detail" component={DetailScreen} />
					<Stack.Screen name="Favorites" component={FavoritesScreen} />
					<Stack.Screen name="Users" component={UsersScreen} />
					<Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
					<Stack.Screen name="Profile" component={ProfileScreen} />
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style="auto" />
		</QueryClientProvider>
	);
}
