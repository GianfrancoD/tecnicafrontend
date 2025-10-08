// src/core/auth/services/auth.service.ts
import { User, LoginResponse } from "../types/auth.types";

// Datos de ejemplo
const MOCK_USERS: User[] = [
  {
    id: 1,
    email: "admin@test.com",
    name: "Admin User",
    role: "admin",
    permissions: ["view_dashboard", "manage_products"],
  },
];

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    // Simular tiempo de respuesta
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find((u) => u.email === email);

    if (!user || password !== "password") {
      return {
        success: false,
        error: "Credenciales inválidas",
      };
    }

    localStorage.setItem("user", JSON.stringify(user));
    return { success: true, user };
  }

  static logout(): void {
    localStorage.removeItem("user");
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}
