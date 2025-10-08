import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  LoginResponse,
  AuthContextType,
  AuthProviderProps,
} from "../types/auth.types";
import { AuthService } from "../validations/auth_service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Cargar usuario al iniciar
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      setIsLoading(true);
      const result = await AuthService.login(email, password);

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      }

      return result;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "Error al iniciar sesión",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
