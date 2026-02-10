"use client";

import { useContext } from "react";
import { AuthContext } from "@/components/providers";
import type { AuthContextValue } from "@/components/providers";

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
