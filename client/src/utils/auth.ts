
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthUser {
  _id: string;
  email: string;
  name: string;
  about: string;
  avatar: string;
}

type RegisterResponse = AuthUser;

interface LoginResponse {
  token: string;
  user: AuthUser;
}

type CheckTokenResponse = AuthUser;

async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function register({
  email,
  password,
}: AuthCredentials): Promise<RegisterResponse> {
  return request(`${API_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function authorize({
  email,
  password,
}: AuthCredentials): Promise<LoginResponse> {
  return request(`${API_URL}/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken(token: string): Promise<CheckTokenResponse> {
  return request(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}