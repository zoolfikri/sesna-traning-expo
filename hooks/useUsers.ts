import { useQuery } from "@tanstack/react-query";
import type { User } from "../constants/data";

async function fetchUsers(): Promise<User[]> {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	return response.json();
}

export function useUsers() {
	return useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});
}
