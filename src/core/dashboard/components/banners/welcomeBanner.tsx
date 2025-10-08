import React from "react";
import { User } from "../../../auth/types/auth.types";

interface WelcomeBannerProps {
  user: User | null;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ user }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      ¡Bienvenido al Sistema! 🎉
    </h2>
    <p className="text-gray-600 mb-4">
      Has iniciado sesión exitosamente. Este es tu dashboard principal donde
      podrás acceder a todas las funcionalidades del sistema.
    </p>
    {user && (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">✓</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Sesión iniciada correctamente
            </p>
            <p className="text-sm text-green-700">Email: {user.email}</p>
          </div>
        </div>
      </div>
    )}
  </div>
);
