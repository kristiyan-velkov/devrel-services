/** ISO 3166-1 alpha-2 — flags live in `/public/flags/{iso}.svg`. */
export const countryIso: Record<string, string> = {
  Germany: "de",
  India: "in",
  Lithuania: "lt",
  Mexico: "mx",
  Netherlands: "nl",
  Poland: "pl",
  Türkiye: "tr",
  "United Kingdom": "gb",
  "United States": "us",
};

export function countryCode(country: string): string | undefined {
  return countryIso[country];
}

export const onlineFlagSrc = "/flags/un.svg";

export function flagSrc(country: string): string {
  const iso = countryIso[country] ?? "un";
  return `/flags/${iso}.svg`;
}

export function eventIsOnline(place: string, onlineOnly?: boolean): boolean {
  return Boolean(onlineOnly || /online/i.test(place));
}

/** Regional-indicator emoji for native `<select>` options. */
export function flagEmoji(country: string): string {
  const iso = countryIso[country];
  if (!iso) return "";
  return iso
    .toUpperCase()
    .replace(/./g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)));
}
