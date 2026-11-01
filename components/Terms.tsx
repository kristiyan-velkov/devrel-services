import { SectionHeading } from "@/components/SectionHeading";
import { terms } from "@/data/proposal";

export function Terms() {
  return (
    <section id="terms" className="scroll-mt-28 py-16 md:py-20" aria-labelledby="terms-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="terms-title"
          index="08"
          kicker="Terms"
          title="The commercial fine print."
        />
        <ul className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted">
          {terms.map((term) => (
            <li key={term} className="grid grid-cols-[auto_1fr] gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-blue" />
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
