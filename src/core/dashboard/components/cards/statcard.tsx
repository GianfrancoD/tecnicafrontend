import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  onClick?: () => void;
  showClickHint?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  onClick,
  showClickHint = false,
}) => (
  <div
    className={`bg-white rounded-lg shadow p-6 ${
      onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {showClickHint && (
          <p className="text-xs text-blue-600 hover:text-blue-800">
            👆 Click para gestionar
          </p>
        )}
      </div>
    </div>
  </div>
);
