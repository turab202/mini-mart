export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UserProfileUpdate {
  name?: string;
  phone?: string;
  address?: string;
}