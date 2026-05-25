import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '../constants/api';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
  };
};

async function loginFn(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export function useLogin() {
  return useMutation({
    mutationFn: loginFn,
  });
}
