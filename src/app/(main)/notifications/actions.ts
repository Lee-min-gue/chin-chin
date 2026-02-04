"use server";

import { createClient } from "@/lib/supabase/server";

export async function markNotificationAsRead(notificationId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return { error: "로그인이 필요해요" };

    await supabase
      .from("notifications")
      .update({ is_read: true } as never)
      .eq("id", notificationId)
      .eq("user_id", user.id);

    return { success: true };
  } catch (error) {
    console.error("Mark notification as read error:", error);
    return { error: "알 수 없는 오류가 발생했어요" };
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return { error: "로그인이 필요해요" };

    await supabase
      .from("notifications")
      .update({ is_read: true } as never)
      .eq("user_id", user.id)
      .eq("is_read", false);

    return { success: true };
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    return { error: "알 수 없는 오류가 발생했어요" };
  }
}
