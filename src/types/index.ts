
export interface RescueLocation {
  id: string;
  latitude: number;
  longitude: number;
  message: string;
  address: string;
  priority: 'high' | 'low';
  isNew: boolean;
  createdAt: Date;
}

export interface FeedbackEntry {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export type PriorityFilter = 'all' | 'high' | 'low';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
