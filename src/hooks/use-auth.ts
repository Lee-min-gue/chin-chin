"use client";

import { useEffect, useRef, useState } from "react";
import type { User } from "@/types/database";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.user) {
          setState({ user: data.user, isLoading: false, error: null });
        } else {
          setState({ user: null, isLoading: false, error: null });
        }
      } catch (error) {
        console.error("[useAuth] error:", error);
        setState({
          user: null,
          isLoading: false,
          error: error as Error,
        });
      }
    }

    fetchUser();
  }, []);

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    setState({ user: null, isLoading: false, error: null });
  };

  return {
    ...state,
    signOut,
    isAuthenticated: !!state.user,
  };
}
