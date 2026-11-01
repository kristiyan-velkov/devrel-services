import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { agreement, formatEur, identity } from "@/data/proposal";

export function Agreement() {
  return (
    <section id="agreement" className="scroll-mt-28 py-20 md:py-28" aria-labelledby="agreement-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="agreement-title"
          index="03"
          kicker="Current agreement"
          title="Plan 1 starts from what is already signed."
          lede="The pilot is the baseline. Plan 1 keeps the same monthly rate and scales the quantities to five months."
        />
        <Reveal className="glass mt-10 overflow-hidden rounded-3xl">
          <div className="grid gap-6 border-b border-line p-6 md:grid-cols-[1.4fr_0.8fr] md:p-8">
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-faint uppercase">
                {agreement.name} · pilot
              </p>
              <p className="mt-3 font-display text-3xl">
                {identity.company} for {identity.counterparty}
              </p>
              <p className="mt-2 text-muted">{agreement.pilot}</p>
            </div>
            <div className="rounded-2xl border border-line bg-ink/5 p-5">
              <p className="kicker">Monthly retainer</p>
              <p className="mt-2 font-display text-4xl tabular-nums">{formatEur(agreement.monthly)}</p>
              <p className="mt-1 text-sm text-muted">{agreement.months} months · Oct, Nov, Dec 2026</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Deliverables in the signed pilot agreement</caption>
              <thead className="font-mono text-[11px] tracking-widest text-faint uppercase">
                <tr className="border-b border-line">
                  <th scope="col" className="px-6 py-3 font-medium">Deliverable</th>
                  <th scope="col" className="px-6 py-3 font-medium">Where</th>
                  <th scope="col" className="px-6 py-3 font-medium">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {agreement.deliverables.map((row) => (
                  <tr key={row.name} className="border-b border-line/70 last:border-0">
                    <th scope="row" className="px-6 py-4 font-medium text-fg">
                      {row.name}
                      <span className="mt-1 block font-normal text-faint">{row.basis}</span>
                    </th>
                    <td className="px-6 py-4 text-muted">{row.where}</td>
                    <td className="px-6 py-4 font-mono text-fg">{row.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-6 py-5 text-sm leading-relaxed text-muted md:px-8">
            “Proposed” marks a detail the agreement does not specify. Plan 1 on the next section continues
            this rate for November 2026 – March 2027. November and December are already covered by this
            signature. Anything after 31 December 2026 needs an amendment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
