import Link from "next/link";
import { Seal } from "@/components/Seal";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative">
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
        </filter>
      </svg>
      <div className="wrap grid12 items-center gap-y-12 py-[clamp(56px,9vw,128px)]">
        <div className="col-span-12 lg:col-span-7">
          <p className="label label-brass">Error 404</p>
          <h1 id="nf-title" className="t-display mt-6">
            This record could not be located.
          </h1>
          <div className="mt-12">
            <span className="rubber">Not on file</span>
          </div>
          <p className="mt-12">
            <Link href="/" className="btn">
              <span className="btn-label">Return to the home page</span>
              <span className="arr" aria-hidden="true" />
            </Link>
          </p>
          <p className="t-small ink-2 mt-8 max-w-[44ch]">
            If you were looking for something in particular, please telephone {site.contact.phoneDisplay}.
          </p>
        </div>
        <div className="col-span-12 flex justify-center lg:col-span-4 lg:col-start-9">
          <Seal size={280} className="text-evergreen" decorative />
        </div>
      </div>
    </section>
  );
}
