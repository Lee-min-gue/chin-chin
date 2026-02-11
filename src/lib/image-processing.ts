import sharp from "sharp";
import type { ProfilePhoto } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabaseClient = { storage: any };

interface PhotoInput {
  file: File;
  blurEnabled: boolean;
}

/**
 * 여러 장의 프로필 사진을 처리하고 업로드합니다.
 * blurEnabled가 true인 사진은 블러 처리된 버전도 생성합니다.
 */
export async function processAndUploadProfileImages(
  supabase: AnySupabaseClient,
  photos: PhotoInput[],
  userId: string,
  shortId: string
): Promise<{ photos: ProfilePhoto[]; photoUrl: string; originalPhotoUrl: string }> {
  const results: ProfilePhoto[] = [];

  for (let i = 0; i < photos.length; i++) {
    const { file, blurEnabled } = photos[i];
    const photoBuffer = await file.arrayBuffer();
    const photoExtension = file.type.split("/")[1];
    const photoPath = `${userId}/${shortId}/photo_${i}_original.${photoExtension}`;

    // Upload original photo
    const { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(photoPath, photoBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("사진 업로드에 실패했어요");
    }

    const { data: originalUrl } = supabase.storage
      .from("profiles")
      .getPublicUrl(photoPath);

    let blurredPublicUrl = originalUrl.publicUrl;

    if (blurEnabled) {
      const blurredPath = `${userId}/${shortId}/photo_${i}_blurred.jpeg`;

      const blurredBuffer = await sharp(Buffer.from(photoBuffer))
        .resize(400)
        .blur(30)
        .jpeg({ quality: 60 })
        .toBuffer();

      const { error: blurUploadError } = await supabase.storage
        .from("profiles")
        .upload(blurredPath, blurredBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (blurUploadError) {
        console.error("Blur upload error:", blurUploadError);
        throw new Error("사진 처리에 실패했어요");
      }

      const { data: blurredUrl } = supabase.storage
        .from("profiles")
        .getPublicUrl(blurredPath);

      blurredPublicUrl = blurredUrl.publicUrl;
    }

    results.push({
      url: blurredPublicUrl,
      originalUrl: originalUrl.publicUrl,
      blurEnabled,
    });
  }

  // 하위 호환: 첫 번째 사진의 URL 반환
  const first = results[0];
  return {
    photos: results,
    photoUrl: first.url,
    originalPhotoUrl: first.originalUrl,
  };
}

/**
 * @deprecated processAndUploadProfileImages를 사용하세요
 */
export async function processAndUploadProfileImage(
  supabase: AnySupabaseClient,
  file: File,
  userId: string,
  shortId: string
): Promise<{ photoUrl: string; originalPhotoUrl: string }> {
  const result = await processAndUploadProfileImages(
    supabase,
    [{ file, blurEnabled: true }],
    userId,
    shortId
  );
  return { photoUrl: result.photoUrl, originalPhotoUrl: result.originalPhotoUrl };
}
