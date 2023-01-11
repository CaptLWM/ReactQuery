export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  provider: string;
  blocked: null | boolean;
  role: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  title: string;
  body: string;
  user: User;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  message: string;
  user: User;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResult {
  jwt: string;
  user: User;
}
