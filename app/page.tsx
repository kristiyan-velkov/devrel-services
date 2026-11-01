import { Agreement } from "@/components/Agreement";
import { Bonus } from "@/components/Bonus";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { Publishing } from "@/components/Publishing";
import { SectionRail } from "@/components/SectionRail";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Speaking } from "@/components/Speaking";
import { Terms } from "@/components/Terms";
import { Why } from "@/components/Why";
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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <SectionRail />
      <main id="content">
        <p className="mx-auto hidden max-w-6xl px-5 pt-6 text-sm print:block">
          {identity.company} ({identity.person}) — DevRel partnership proposal for {identity.counterparty}.{" "}
          {identity.dateLabel}. {identity.termLong}. All prices EUR. Not an official Bright Data website.
        </p>
        <Hero />
        <Why />
        <Speaking />
        <Agreement />
        <Plans />
        <Services />
        <Publishing />
        <Bonus />
        <Terms />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
