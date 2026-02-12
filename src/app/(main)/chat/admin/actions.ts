"use server";

import { createClient } from "@/lib/supabase/server";
import { ADMIN_USER_ID } from "@/lib/constants";

export async function getOrCreateAdminChatRoom() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return { error: "로그인이 필요해요" };

    if (!ADMIN_USER_ID) {
      return { error: "관리자 설정이 되어 있지 않아요" };
    }

    if (user.id === ADMIN_USER_ID) {
      return { error: "관리자 계정이에요" };
    }

    // Check if an admin chat room already exists for this user
    const { data: existingRooms } = (await supabase
      .from("chat_rooms")
      .select("id")
      .eq("room_type", "admin")
      .or(
        `requester_id.eq.${user.id},target_id.eq.${user.id}`
      )) as { data: { id: string }[] | null };

    const existingRoom = (existingRooms || [])[0];
    if (existingRoom) {
      return { success: true, roomId: existingRoom.id };
    }

    // Create a new admin chat room
    const { data: newRoom, error: insertError } = (await supabase
      .from("chat_rooms")
      .insert({
        profile_id: null,
        requester_id: user.id,
        target_id: ADMIN_USER_ID,
        room_type: "admin",
        status: "active",
        expires_at: null,
      } as never)
      .select("id")
      .single()) as { data: { id: string } | null; error: Error | null };

    if (insertError || !newRoom) {
      console.error("Admin chat room creation error:", insertError);
      return { error: "피드백 채팅방 생성에 실패했어요" };
    }

    return { success: true, roomId: newRoom.id };
  } catch (error) {
    console.error("Get/create admin chat room error:", error);
    return { error: "알 수 없는 오류가 발생했어요" };
  }
}
