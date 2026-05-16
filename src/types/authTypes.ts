export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}