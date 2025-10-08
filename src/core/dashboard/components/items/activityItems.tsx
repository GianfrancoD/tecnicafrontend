import React from "react";

interface ActivityItemProps {
  type: "success" | "info" | "warning" | "error";
  message: React.ReactNode;
  timestamp: string;
}

const colorMap = {
  success: "bg-green-400",
  info: "bg-blue-400",
  warning: "bg-yellow-400",
  error: "bg-red-400",
};

export const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  message,
  timestamp,
}) => (
  <div className="flex items-center space-x-3">
    <div className={`w-2 h-2 ${colorMap[type]} rounded-full`}></div>
    <p className="text-sm text-gray-600 flex-1">{message}</p>
    <span className="text-xs text-gray-400">{timestamp}</span>
  </div>
);
