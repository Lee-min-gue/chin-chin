import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  asLink?: boolean;
}

const sizeConfig = {
  sm: { height: 24, width: 120 },
  md: { height: 32, width: 160 },
  lg: { height: 48, width: 240 },
  xl: { height: 64, width: 320 },
};

export function Logo({ size = "md", className, asLink = true }: LogoProps) {
  const { height, width } = sizeConfig[size];

  const content = (
    <Image
      src="/logo.png"
      alt="친구의 친구"
      width={width}
      height={height}
      className={cn("object-contain block mx-auto", className)}
      priority
    />
  );

  if (asLink) {
    return (
      <Link href="/" className="block">
        {content}
      </Link>
    );
  }

  return content;
}
