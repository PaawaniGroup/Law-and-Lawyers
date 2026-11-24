import Image from "next/image";
import type { Partner } from "@/content/site";

/**
 * Partner portrait, 4:5. Until real photographs are supplied (set `photo` in content/site.ts),
 * a designed placeholder shows the partner's initials on paper grain.
 */
export function Portrait({
  partner,
  priority = false,
  sizes,
  small = false,
}: {
  partner: Partner;
  priority?: boolean;
  sizes?: string;
  small?: boolean;
}) {
  if (partner.photo) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={partner.photo.src}
          alt={partner.photo.alt}
          width={partner.photo.width}
          height={partner.photo.height}
          priority={priority}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={small ? "portrait portrait-sm" : "portrait"}
      role="img"
      aria-label={`Placeholder portrait for Advocate ${partner.name}. Photograph to be supplied.`}
    >
      <span className="initials" aria-hidden="true">
        {partner.initials}
      </span>
    </div>
  );
}
