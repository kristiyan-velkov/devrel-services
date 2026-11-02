import { media } from "@/lib/media";
import { cn } from "@/lib/cn";

type BulgariTechLogoProps = {
  className?: string;
};

export function BulgariTechLogo({ className }: BulgariTechLogoProps) {
  return (
    <span className={cn("brand-logo", className)}>
      <img
        src={media.logoBlack}
        alt="BulgariTech"
        width={173}
        height={32}
        decoding="async"
        className="brand-logo__img brand-logo__img--light"
      />
      <img
        src={media.logoWhite}
        alt=""
        width={173}
        height={32}
        decoding="async"
        className="brand-logo__img brand-logo__img--dark"
      />
    </span>
  );
}
