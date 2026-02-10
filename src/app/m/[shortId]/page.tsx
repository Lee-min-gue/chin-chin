import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BlindProfileView } from "@/components/profile/blind-profile-view";
import { ExpiredProfileView } from "@/components/profile/expired-profile-view";
import { isExpired } from "@/lib/utils";
import type { Profile } from "@/types/database";

interface Props {
  params: Promise<{ shortId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shortId } = await params;
  const supabase = await createClient();

  const { data: profileData } = await supabase
    .from("profiles")
    .select("bio, age, gender, interest_tags, photo_url")
    .eq("short_id", shortId)
    .single();

  if (!profileData) {
    return {
      title: "프로필을 찾을 수 없어요",
    };
  }

  const profile = profileData as Pick<Profile, "bio" | "age" | "gender" | "interest_tags" | "photo_url">;
  const genderText = profile.gender === "male" ? "남" : "여";
  const title = `${profile.age}세 ${genderText} | 친친`;
  const description = profile.bio;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [profile.photo_url],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.photo_url],
    },
  };
}

export default async function BlindProfilePage({ params }: Props) {
  const { shortId } = await params;
  const supabase = await createClient();

  // Fetch profile
  const { data: profileData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("short_id", shortId)
    .single();

  if (error || !profileData) {
    notFound();
  }

  const profile = profileData as Profile;

  // Check if expired
  if (isExpired(profile.expires_at) || !profile.is_active) {
    return <ExpiredProfileView />;
  }

  // Increment view count (non-blocking, atomic)
  void supabase.rpc("increment_view_count" as never, { profile_short_id: shortId } as never);

  return <BlindProfileView profile={profile} />;
}
