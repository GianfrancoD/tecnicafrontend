export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface LoginResponse {
  user?: User;
  success: boolean;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface LoginFormData {
  email: string;
  password: string;
}
