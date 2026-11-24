import Image from "next/image";
import type { Photo } from "@/content/site";
import { Wipe } from "./Reveal";

/** A photograph revealed with a clip-path wipe. Explicit dimensions, so there is no layout shift. */
export function OfficePhoto({
  photo,
  caption,
  ratio = "aspect-[3/2]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  position = "center",
  className = "",
}: {
  photo: Photo;
  caption?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <Wipe>
        <div className={`relative w-full overflow-hidden border border-rule ${ratio}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={sizes}
            priority={priority}
            className="h-full w-full object-cover"
            style={{ objectPosition: position }}
          />
        </div>
      </Wipe>
      {caption && <figcaption className="label label-2 mt-3">{caption}</figcaption>}
    </figure>
  );
}
