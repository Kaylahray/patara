import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  isConnecting: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  const { isLoading } = useQuery({
    queryKey: ["authStatus"],
    queryFn: () => {
      const authStatus = localStorage.getItem("isLoggedIn");

      setIsLoggedIn(authStatus === "true");

      return authStatus;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (isLoading) return;

    if (isLoggedIn && router.pathname === "/login") {
      router.push("/");
    }

    if (router.pathname !== "/login" && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router.pathname, isLoading]);

  const { mutateAsync: loginAsync } = useMutation({
    mutationFn: async () => {
      setIsConnecting(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setTimeout(() => {
        setIsConnecting(false);
      }, 500);

      return true;
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    },
    onError: () => {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      router.push("/login");
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      return Promise.resolve();
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        isConnecting,
        login: loginAsync,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
