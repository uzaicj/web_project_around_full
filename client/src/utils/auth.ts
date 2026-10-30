
const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthUser {
  _id: string;
  email: string;
}

interface RegisterResponse {
  data: AuthUser;
}

interface LoginResponse {
  token: string;
}

interface CheckTokenResponse {
  data: AuthUser;
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
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
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function authorize({
  email,
  password,
}: AuthCredentials): Promise<LoginResponse> {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken(token: string): Promise<CheckTokenResponse> {
  return request(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
