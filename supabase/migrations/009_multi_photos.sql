-- ================================================
-- 009_multi_photos.sql
-- 다중 사진 업로드 + 블러 선택 기능 추가
-- ================================================

-- ================================================
-- 1. profiles 테이블에 photos JSONB 컬럼 추가
--    구조: [{url, originalUrl, blurEnabled}]
--    기존 photo_url / original_photo_url은 하위 호환 위해 유지
-- ================================================
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS photos JSONB DEFAULT '[]';

-- ================================================
-- 2. 기존 데이터를 photos 컬럼으로 마이그레이션
-- ================================================
UPDATE profiles
SET photos = jsonb_build_array(
  jsonb_build_object(
    'url', photo_url,
    'originalUrl', COALESCE(original_photo_url, photo_url),
    'blurEnabled', true
  )
)
WHERE photo_url IS NOT NULL
  AND (photos IS NULL OR photos = '[]'::jsonb);
