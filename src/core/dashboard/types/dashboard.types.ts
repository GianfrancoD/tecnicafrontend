export interface NavigationHeaderProps {
  title: string;
  subtitle?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalSales: number;
  growthPercent: number;
}

export interface ActivityItem {
  id: string;
  type: 'user' | 'product' | 'order';
  message: string;
  timestamp: Date;
  user?: string;
}
