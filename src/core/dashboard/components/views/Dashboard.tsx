// src/core/dashboard/components/views/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../auth/contexts/AuthContext";
import { NavigationHeader } from "../.././shared/components/NavigationHeader";
import { StatCard } from "../../cards/StatCard";
import { ActivityItem } from "../items/ActivityItem";
import { WelcomeBanner } from "../banners/WelcomeBanner";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Productos",
      value: "567",
      icon: (
        <div className="w-10 h-10 bg-brand-secondary rounded-lg flex items-center justify-center">
          <span className="text-white">📦</span>
        </div>
      ),
      onClick: () => navigate("/productos"),
      showClickHint: true,
    },
    {
      title: "Ventas",
      value: "$12,345",
      icon: (
        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
          <span className="text-white">💰</span>
        </div>
      ),
    },
    {
      title: "Crecimiento",
      value: "+23%",
      icon: (
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white">📈</span>
        </div>
      ),
    },
  ];

  const activities = [
    {
      id: 1,
      type: "success" as const,
      message: "Usuario Juan Pérez se registró",
      timestamp: "hace 2 min",
    },
    {
      id: 2,
      type: "info" as const,
      message: "Nuevo producto iPhone 15 agregado",
      timestamp: "hace 15 min",
    },
    {
      id: 3,
      type: "warning" as const,
      message: "Pedido #ORD-1234 procesado",
      timestamp: "hace 1 hora",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader
        title="Dashboard"
        subtitle="Panel de control principal del sistema"
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          <WelcomeBanner user={user} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                onClick={stat.onClick}
                showClickHint={stat.showClickHint}
              />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Actividad Reciente
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  type={activity.type}
                  message={activity.message}
                  timestamp={activity.timestamp}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
