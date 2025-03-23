import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { AuthState, User } from "@/types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Create an auth context to share authentication state across the application
const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}>({
  authState: initialState,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// Mock users for demo purposes
const mockUsers: User[] = [
  { id: "1", email: "admin@gmail.com", name: "Admin" },

  { id: "3", email: "tailoi1606@gmail.com", name: "Tailoi" },
  { id: "4", email: "khoi123@gmail.com", name: "Khoi" },
];

// Mock passwords for demo users
const mockPasswords: Record<string, string> = {
  "admin@gmail.com": "password123",
  "tailoi1606@gmail.com": "tailoi123",
  "khoi123@gmail.com": "khoi123",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Check for existing login on app load
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("rescueUser");

      if (savedUser) {
        try {
          const user = JSON.parse(savedUser) as User;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          // Handle parsing error
          localStorage.removeItem("rescueUser");
          setAuthState({
            ...initialState,
            isLoading: false,
          });
        }
      } else {
        setAuthState({
          ...initialState,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if user exists and password matches
    const foundUser = mockUsers.find((user) => user.email === email);
    if (foundUser && mockPasswords[email] === password) {
      // Store user in localStorage for persistence
      localStorage.setItem("rescueUser", JSON.stringify(foundUser));

      setAuthState({
        user: foundUser,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }

    return false;
  };

  // Mock register function
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if user already exists
    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      name,
    };

    // In a real app, you would save this to a database
    mockUsers.push(newUser);
    // @ts-ignore - This is a mock implementation
    mockPasswords[email] = password;

    // Store user in localStorage for persistence
    localStorage.setItem("rescueUser", JSON.stringify(newUser));

    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });

    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("rescueUser");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
