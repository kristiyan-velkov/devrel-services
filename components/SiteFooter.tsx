import { identity, profiles } from "@/data/proposal";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-5 py-10 md:px-8">
      <div className="site-wrap flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-faint">
          {identity.company} · {identity.person}
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {profiles.map((profile) => (
            <li key={profile.href}>
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="print-url text-sm text-fg hover:text-blue hover:underline"
              >
                {profile.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
