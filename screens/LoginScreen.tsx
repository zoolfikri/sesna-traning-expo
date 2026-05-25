import { zodResolver } from "@hookform/resolvers/zod";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { z } from "zod";

import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/authStore";
import type { RootStackParamList } from "../types/navigation";

const loginSchema = z.object({
	email: z.email("Format email tidak valid").min(1, "Email wajib diisi"),
	password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginForm = z.infer<typeof loginSchema>;

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
	const setAuth = useAuthStore((state) => state.setAuth);
	const { mutate: login, isPending } = useLogin();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	function onSubmit(values: LoginForm) {
		login(values, {
			onSuccess: (data) => {
				setAuth(data.token, data.user);
				navigation.replace("AppHome");
			},
			onError: (err) => {
				Alert.alert("Gagal", err.message);
			},
		});
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sesna</Text>
			<Text style={styles.subtitle}>Masuk ke akun kamu</Text>

			<Controller
				control={control}
				name="email"
				render={({ field: { value, onChange, onBlur } }) => (
					<View style={styles.fieldWrap}>
						<TextInput
							style={[styles.input, errors.email && styles.inputError]}
							placeholder="Email"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email.message}</Text>
						)}
					</View>
				)}
			/>

			<Controller
				control={control}
				name="password"
				render={({ field: { value, onChange, onBlur } }) => (
					<View style={styles.fieldWrap}>
						<TextInput
							style={[styles.input, errors.password && styles.inputError]}
							placeholder="Password"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							secureTextEntry
						/>
						{errors.password && (
							<Text style={styles.errorText}>{errors.password.message}</Text>
						)}
					</View>
				)}
			/>

			<TouchableOpacity
				style={[styles.btn, isPending && styles.btnDisabled]}
				onPress={handleSubmit(onSubmit)}
				disabled={isPending}
			>
				{isPending ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.btnText}>Masuk</Text>
				)}
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 24,
		justifyContent: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "800",
		color: "#4f46e5",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#6b7280",
		marginBottom: 32,
	},
	fieldWrap: {
		marginBottom: 12,
	},
	input: {
		borderWidth: 1,
		borderColor: "#e5e7eb",
		borderRadius: 10,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 15,
		backgroundColor: "#f9fafb",
	},
	inputError: {
		borderColor: "#ef4444",
	},
	errorText: {
		color: "#ef4444",
		fontSize: 12,
		marginTop: 4,
	},
	btn: {
		backgroundColor: "#4f46e5",
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: "center",
		marginTop: 8,
	},
	btnDisabled: {
		opacity: 0.6,
	},
	btnText: {
		color: "#fff",
		fontWeight: "700",
		fontSize: 15,
	},
});
