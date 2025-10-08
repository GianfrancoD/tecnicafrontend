import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./core/auth/contexts/AuthContext";
import LoginForm from "./core/auth/components/views/login/LoginForm";
import Dashboard from "./core/dashboard/components/views/Dashboard";
import ProductsView from "./core/products/components/views/ProductsView";
import ProtectedRoute from "./core/auth/components/common/ProtectedRoute";
import "./App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Ruta por defecto redirige al dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Ruta de login */}
            <Route path="/login" element={<LoginForm />} />

            {/* Ruta protegida del dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Ruta protegida de productos */}
            <Route
              path="/productos"
              element={
                <ProtectedRoute>
                  <ProductsView />
                </ProtectedRoute>
              }
            />

            {/* Ruta de fallback para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
