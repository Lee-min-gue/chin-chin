"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { REPORT_REASONS } from "@/lib/constants";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (reason: string, description?: string) => Promise<void>;
}

export function ReportDialog({
  open,
  onOpenChange,
  onSubmit,
}: ReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;
    setIsSubmitting(true);
    try {
      await onSubmit(selectedReason, description || undefined);
    } finally {
      setIsSubmitting(false);
      setSelectedReason("");
      setDescription("");
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSelectedReason("");
      setDescription("");
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>신고하기</DialogTitle>
          <DialogDescription>
            신고 사유를 선택해주세요. 허위 신고 시 불이익이 있을 수 있어요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          {REPORT_REASONS.map((reason) => (
            <label
              key={reason.value}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                selectedReason === reason.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <input
                type="radio"
                name="report-reason"
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="accent-primary"
              />
              <span className="text-sm font-medium">{reason.label}</span>
            </label>
          ))}
        </div>

        {selectedReason && (
          <textarea
            placeholder="상세 내용을 입력해주세요 (선택사항)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            className="w-full resize-none rounded-lg border border-border px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            rows={3}
          />
        )}

        <DialogFooter className="flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!selectedReason || isSubmitting}
            loading={isSubmitting}
          >
            신고하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
