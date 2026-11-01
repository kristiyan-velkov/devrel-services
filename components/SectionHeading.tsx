import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  index,
  kicker,
  title,
  lede,
  id,
}: {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  id: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="kicker">
        {index} / {kicker}
      </p>
      <h2 id={id} className="mt-3 font-display text-4xl leading-[1.05] text-fg sm:text-5xl">
        {title}
      </h2>
      {lede ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p> : null}
    </Reveal>
  );
}
