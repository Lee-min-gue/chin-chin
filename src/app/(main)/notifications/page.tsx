"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MessageCircle,
  UserCheck,
  UserX,
  Eye,
  Heart,
  Bell,
  CheckCheck,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-notifications";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "./actions";
import { formatRelativeTime } from "@/lib/utils";
import type { Notification } from "@/types/database";

const NOTIFICATION_ICONS: Record<string, React.ElementType> = {
  chat_requested: Heart,
  chat_accepted: UserCheck,
  chat_rejected: UserX,
  reveal_requested: Eye,
  reveal_accepted: Eye,
  new_message: MessageCircle,
};

function getNotificationIcon(type: string) {
  return NOTIFICATION_ICONS[type] || Bell;
}

function getNotificationColor(type: string) {
  switch (type) {
    case "chat_accepted":
    case "reveal_accepted":
      return "text-green-600 bg-green-50";
    case "chat_rejected":
      return "text-muted-foreground bg-muted";
    case "chat_requested":
    case "reveal_requested":
      return "text-primary bg-primary/10";
    default:
      return "text-foreground bg-muted";
  }
}

export default function NotificationsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
  } = useNotifications(user?.id || "");

  const handleClick = useCallback(
    async (notification: Notification) => {
      if (!notification.is_read) {
        markAsRead(notification.id);
        await markNotificationAsRead(notification.id);
      }
      if (notification.link_url) {
        router.push(notification.link_url);
      }
    },
    [markAsRead, router]
  );

  const handleMarkAllRead = useCallback(async () => {
    markAllAsRead();
    await markAllNotificationsAsRead();
  }, [markAllAsRead]);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold">알림</h1>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
            <CheckCheck className="mr-1 h-4 w-4" />
            모두 읽음
          </Button>
        )}
      </header>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-1 p-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex animate-pulse gap-3 rounded-lg p-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">아직 알림이 없어요</p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification, index) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);

              return (
                <motion.button
                  key={notification.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => handleClick(notification)}
                  className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50 ${
                    !notification.is_read ? "bg-primary/5" : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm ${
                          !notification.is_read
                            ? "font-semibold"
                            : "font-medium"
                        }`}
                      >
                        {notification.title}
                      </p>
                      {!notification.is_read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    {notification.message && (
                      <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatRelativeTime(notification.created_at)}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
