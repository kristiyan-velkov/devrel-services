export type NavLink = {
  href: string;
  label: string;
  /** Match pathname exactly (e.g. home). */
  exact?: boolean;
};

export const primaryNav: NavLink[] = [
  { href: "/", label: "Overview", exact: true },
  { href: "/why", label: "Why Kristiyan" },
  { href: "/#speaking", label: "Stage" },
  { href: "/conferences", label: "Conferences" },
  { href: "/plans", label: "Plans" },
  { href: "/services", label: "Services" },
  { href: "/calendar", label: "Calendar" },
];

export function navLinkIsActive(pathname: string, link: NavLink): boolean {
  if (link.href === "/#speaking") {
    return pathname === "/";
  }
  const path = link.href.replace(/#.*$/, "");
  if (link.exact) return pathname === path;
  return pathname === path;
}
