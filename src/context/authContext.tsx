import {
    createContext,
    useState,
    useEffect,
  } from "react";
  
  import type { User } from "../types/authTypes";
  
  interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (
      token: string,
      user: User | null
    ) => void;
    logout: () => void;
  }
  
  export const AuthContext =
    createContext<AuthContextType>(
      {} as AuthContextType
    );
  
  export const AuthProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  
    const [user, setUser] =
      useState<User | null>(null);
  
    const [token, setToken] =
      useState<string | null>(null);
  
    useEffect(() => {
      const savedToken =
        localStorage.getItem("token");
  
      const savedUser =
        localStorage.getItem("user");
  
      if (savedToken) {
        setToken(savedToken);

        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser) as User);
          } catch {
            localStorage.removeItem("user");
          }
        }
      }
    }, []);
  
    const handleLogin = (
      token: string,
      user: User | null
    ) => {
      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }

      setToken(token);
      setUser(user);
    };
  
    const logout = () => {
      localStorage.clear();
  
      setToken(null);
      setUser(null);
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          login: handleLogin,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };