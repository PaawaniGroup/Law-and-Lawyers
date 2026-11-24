import { Emblem } from "./Emblem";
import { PageHero } from "./PageHero";
import type { EmblemName } from "@/lib/emblems";

interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
  after?: string;
}

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  emblem,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  intro: string;
  sections: LegalSection[];
  emblem?: EmblemName;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} aside={emblem && <Emblem name={emblem} size={200} />} />
      <section className="section tone-2" aria-label={title}>
        <div className="wrap grid12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <div className="prose">
              <p className="t-pull">{intro}</p>
              {updated && (
                <p className="label label-2">
                  Effective: <span className="placeholder">{updated}</span>
                </p>
              )}
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="t-h3">{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p} className="mt-4">
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-4">
                      {s.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                  {s.after && <p className="mt-4">{s.after}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
