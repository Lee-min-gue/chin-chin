"use client";

import { useCallback, useEffect, useState } from "react";
import { Ban, UserMinus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toaster";
import { getBlockedUsers, unblockUser } from "@/app/(main)/dashboard/actions";

interface BlockedUser {
  id: string;
  created_at: string;
  blocked: {
    id: string;
    nickname: string | null;
    profile_image_url: string | null;
  };
}

export function BlockedUsers() {
  const { toast } = useToast();
  const [blocks, setBlocks] = useState<BlockedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const result = await getBlockedUsers();
      if (result.blocks) {
        setBlocks(result.blocks as BlockedUser[]);
      }
      setIsLoading(false);
    }
    fetch();
  }, []);

  const handleUnblock = useCallback(
    async (blockId: string) => {
      const result = await unblockUser(blockId);
      if (result.error) {
        toast({
          title: "오류",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      setBlocks((prev) => prev.filter((b) => b.id !== blockId));
      toast({
        title: "차단 해제",
        description: "차단이 해제되었어요",
        variant: "success",
      });
    },
    [toast]
  );

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="flex animate-pulse items-center gap-3 p-3">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="py-8 text-center">
        <Ban className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">차단한 사용자가 없어요</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {blocks.map((block) => (
        <Card key={block.id}>
          <CardContent className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <Avatar
                src={block.blocked.profile_image_url}
                alt=""
                size="sm"
              />
              <span className="text-sm font-medium">
                {block.blocked.nickname || "사용자"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUnblock(block.id)}
            >
              <UserMinus className="mr-1 h-4 w-4" />
              해제
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
