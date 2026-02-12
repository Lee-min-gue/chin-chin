import { ADMIN_USER_ID } from "@/lib/constants";
import type { ChatRoom } from "@/types/database";

export function isAdminChat(room: Pick<ChatRoom, "room_type">): boolean {
  return room.room_type === "admin";
}

export function isAdminUser(userId: string): boolean {
  return userId === ADMIN_USER_ID;
}
