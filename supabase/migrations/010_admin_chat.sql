-- ================================================
-- 010_admin_chat.sql
-- Beta Feedback Admin Chat Support
-- ================================================

-- 1. Add room_type column to chat_rooms
ALTER TABLE chat_rooms
  ADD COLUMN IF NOT EXISTS room_type VARCHAR(20) DEFAULT 'normal'
  CHECK (room_type IN ('normal', 'admin'));

-- 2. Make profile_id nullable (currently NOT NULL)
ALTER TABLE chat_rooms ALTER COLUMN profile_id DROP NOT NULL;

-- 3. Drop the existing unique index that includes profile_id
DROP INDEX IF EXISTS idx_chat_rooms_unique;

-- 4. Recreate unique index only for normal rooms
CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_rooms_unique_normal
  ON chat_rooms(profile_id, requester_id)
  WHERE room_type = 'normal' AND profile_id IS NOT NULL;

-- 5. Add unique constraint for admin rooms: one admin room per user pair
CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_rooms_unique_admin
  ON chat_rooms(requester_id, target_id)
  WHERE room_type = 'admin';

-- 6. Add index on room_type for filtered queries
CREATE INDEX IF NOT EXISTS idx_chat_rooms_type ON chat_rooms(room_type);
