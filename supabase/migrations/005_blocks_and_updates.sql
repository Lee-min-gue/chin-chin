-- ================================================
-- Phase 4: Blocks Table + Reports Index
-- ================================================

-- 1. Blocks table (사용자 차단)
CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT blocks_different_users CHECK (blocker_id != blocked_id),
  UNIQUE(blocker_id, blocked_id)
);

-- 2. Blocks RLS
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own blocks"
ON blocks FOR SELECT
USING (blocker_id = auth.uid());

CREATE POLICY "Users can create blocks"
ON blocks FOR INSERT
WITH CHECK (blocker_id = auth.uid());

CREATE POLICY "Users can delete own blocks"
ON blocks FOR DELETE
USING (blocker_id = auth.uid());

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_blocks_blocker ON blocks(blocker_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocked ON blocks(blocked_id);
CREATE INDEX IF NOT EXISTS idx_reports_reporter ON reports(reporter_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- 4. Enable Realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
