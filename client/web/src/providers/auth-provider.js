"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

export const AuthContext = createContext(null);

export async function handleLogout() {
  try {
    const resp = await axios.post("/api/auth/logout");
    if (resp.statusText === "OK") {
      localStorage.clear();
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error?.response?.data?.message ?? error?.message ?? "Error");
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      if (isCancelled) return;
      setIsUserLoading(true);
      try {
        // const user = await http().get(endpoints.profile);
        // delete user.password;
        // setUser(user);
        // localStorage.setItem("user", JSON.stringify(user));

        const { data } = await axios.get("/api/auth/profile");

        if (isCancelled) return;

        delete data.user.password;
        setUser(data.user);

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        if (isCancelled) return;
        if (typeof window !== "undefined") {
          localStorage.clear();
        }
        setUser(null);
        console.log(error);
      } finally {
        if (!isCancelled) {
          setIsUserLoading(false);
        }
      }
    }
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
