"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, MessageCircle, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  requiresAuth?: boolean;
  badge?: number;
}

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const supabaseRef = useRef(createClient());

  // Fetch unread notification count
  useEffect(() => {
    if (!user) return;

    async function fetchUnread() {
      const { count } = await supabaseRef.current
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("is_read", false);

      setUnreadCount(count || 0);
    }

    fetchUnread();

    // Subscribe to new notifications
    const supabase = supabaseRef.current;
    const channel = supabase
      .channel("bottom_nav_notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          setUnreadCount((prev) => prev + 1);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchUnread();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Hide on login page and individual chat pages
  if (pathname === "/login" || pathname.startsWith("/chat/")) {
    return null;
  }

  // Hide on profile view pages (m/[shortId])
  if (pathname.startsWith("/m/")) {
    return null;
  }

  // Hide on notifications page
  if (pathname.startsWith("/notifications")) {
    return null;
  }

  const navItems: NavItem[] = [
    { href: "/", icon: Home, label: "홈" },
    { href: "/create", icon: PlusCircle, label: "소개하기", requiresAuth: true },
    { href: "/chat", icon: MessageCircle, label: "채팅", requiresAuth: true },
    {
      href: "/notifications",
      icon: Bell,
      label: "알림",
      requiresAuth: true,
      badge: unreadCount,
    },
    { href: "/dashboard", icon: User, label: "내 정보", requiresAuth: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/95 backdrop-blur-soft safe-bottom">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          // If requires auth and not logged in, redirect to login
          const href =
            item.requiresAuth && !user
              ? `/login?redirect=${item.href}`
              : item.href;

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "relative flex flex-col items-center gap-1 px-3 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <item.icon
                  className={cn("h-6 w-6", isActive && "fill-primary/20")}
                />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
