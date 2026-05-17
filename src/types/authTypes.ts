export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  //name: string;
  //surname?: string;
  username?: string;
  //email: string;
  rol: string;
}

export interface LoginResponse {
  token: string;
  user: User | null;
}