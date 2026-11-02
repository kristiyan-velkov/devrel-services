"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function PrintPlansOnLoad() {
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("print") !== "1") return;

    const root = document.documentElement;
    const sheet = document.getElementById("plans-print");
    root.classList.add("print-plans");
    sheet?.removeAttribute("aria-hidden");

    const done = () => {
      root.classList.remove("print-plans");
      sheet?.setAttribute("aria-hidden", "true");
      window.removeEventListener("afterprint", done);
      const url = new URL(window.location.href);
      url.searchParams.delete("print");
      const next = `${url.pathname}${url.hash}`;
      window.history.replaceState({}, "", next);
    };

    window.addEventListener("afterprint", done);
    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(() => window.print());
    }, 400);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("afterprint", done);
      root.classList.remove("print-plans");
      sheet?.setAttribute("aria-hidden", "true");
    };
  }, [params]);

  return null;
}
