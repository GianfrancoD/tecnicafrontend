import React from "react";

interface NavigationHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <header className={`bg-white shadow ${className}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
    </header>
  );
};
