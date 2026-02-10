-- Atomic increment functions to prevent race conditions on counters
-- Drop existing functions first (parameter names may differ from previous versions)
DROP FUNCTION IF EXISTS increment_view_count(TEXT);
DROP FUNCTION IF EXISTS increment_chat_request_count(UUID);

CREATE OR REPLACE FUNCTION increment_view_count(profile_short_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET view_count = view_count + 1
  WHERE short_id = profile_short_id
    AND is_active = TRUE
    AND expires_at > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_chat_request_count(profile_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET chat_request_count = chat_request_count + 1
  WHERE id = profile_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
