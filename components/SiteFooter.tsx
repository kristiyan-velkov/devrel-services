import { identity } from "@/data/proposal";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-faint md:flex-row md:items-end md:justify-between">
        <p>
          {identity.company} · {identity.person}
          <br />
          Proposal for {identity.counterparty} · {identity.dateLabel}
        </p>
        <p className="max-w-md md:text-right">
          Personal proposal from {identity.person} ({identity.company}). Not an official Bright Data
          website, product page or endorsement.
        </p>
      </div>
    </footer>
  );
}
