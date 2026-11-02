import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { SectionRail } from "@/components/SectionRail";
import { Speaking } from "@/components/Speaking";
import { identity, meta } from "@/data/proposal";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: meta.title,
  description: meta.description,
  datePublished: identity.dateIso,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: identity.person,
    url: "https://kristiyanvelkov.com/",
  },
  publisher: {
    "@type": "Organization",
    name: identity.company,
  },
  about: `Developer relations partnership proposal for ${identity.counterparty}.`,
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionRail />
      <p className="site-wrap hidden px-5 pt-6 text-sm print:block">
        {identity.company} ({identity.person}) — DevRel partnership proposal for {identity.counterparty}.{" "}
        {identity.dateLabel}. {identity.termLong}. All prices EUR. Not an official Bright Data website.
      </p>
      <Hero />
      <Speaking />
      <FinalCta />
    </>
  );
}
