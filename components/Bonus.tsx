import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { bonus, competitors, formatEur } from "@/data/proposal";

export function Bonus() {
  return (
    <section id="bonus" className="scroll-mt-28 py-20 md:py-28" aria-labelledby="bonus-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="bonus-title"
          index="07"
          kicker="If you choose by 15 Nov"
          title="Plan 2 or higher, before the window closes."
          lede={`Choose Plan 2 or higher by ${bonus.deadlineLabel} and three things come with it. The India stage is the same month.`}
        />
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {bonus.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="h-full">
              <article className="glass h-full rounded-3xl p-6">
                <p className="font-mono text-xs text-blue">0{index + 1}</p>
                <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-muted">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-faint">
          The free Recipe is worth {formatEur(bonus.recipeValue)} at list. Exclusivity covers{" "}
          {competitors.join(", ")}.
        </p>
      </div>
    </section>
  );
}
