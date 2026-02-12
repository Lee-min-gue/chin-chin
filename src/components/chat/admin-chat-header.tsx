"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquareHeart } from "lucide-react";

export function AdminChatHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] bg-white px-3 py-2">
      <button
        onClick={() => router.push("/chat")}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-50"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <MessageSquareHeart className="h-5 w-5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">친친 팀</p>
        <p className="text-xs text-muted-foreground">Beta Feedback</p>
      </div>
    </header>
  );
}
