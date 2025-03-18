export interface IAuthState {
  user: User | null;
  token: null | string;
  loading: boolean;
  error: string | null;
  loggedIn: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
