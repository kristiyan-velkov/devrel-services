"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { speakingGallery, type SpeakingGalleryItem } from "@/lib/media";
import { cn } from "@/lib/cn";

const spanClass: Record<NonNullable<SpeakingGalleryItem["span"]>, string> = {
  hero: "sm:col-span-2 sm:row-span-2 min-h-[20rem] sm:min-h-[26rem] lg:min-h-[30rem]",
  wide: "sm:col-span-2 min-h-[14rem] sm:min-h-[17rem] lg:min-h-[19rem]",
  tall: "sm:row-span-2 min-h-[20rem] sm:min-h-[26rem]",
};

function SpeakingLightbox({
  item,
  index,
  total,
  zoomed,
  onZoomToggle,
  onClose,
  onPrev,
  onNext,
}: {
  item: SpeakingGalleryItem;
  index: number;
  total: number;
  zoomed: boolean;
  onZoomToggle: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption} — photo ${index + 1} of ${total}`}
      onClick={onClose}
    >
      <div
        className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold text-white sm:text-lg">{item.caption}</p>
          {item.location ? (
            <p className="truncate font-mono text-[10px] tracking-wide text-white/60 uppercase">{item.location}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onZoomToggle}
            className="rounded-full border border-white/20 px-3 py-1.5 font-mono text-[11px] text-white/90 transition hover:bg-white/10"
          >
            {zoomed ? "Fit" : "Zoom"}
          </button>
          <span className="hidden font-mono text-[11px] text-white/50 sm:inline">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        className={cn(
          "relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8",
          zoomed ? "cursor-zoom-out overflow-auto" : "cursor-zoom-in overflow-hidden",
        )}
        onClick={(event) => {
          event.stopPropagation();
          onZoomToggle();
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          className={cn(
            "max-h-full transition-transform duration-300",
            zoomed
              ? "max-h-none max-w-none scale-100 cursor-zoom-out"
              : "max-h-[min(78vh,900px)] w-auto max-w-[min(92vw,1200px)] object-contain",
          )}
          draggable={false}
        />
      </div>

      <div
        className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onPrev}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-40"
          disabled={total <= 1}
        >
          ← Previous
        </button>
        <p className="hidden text-center text-xs text-white/50 sm:block">Click image or use Zoom · Esc to close · ← → to browse</p>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-40"
          disabled={total <= 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export function SpeakingPhotos() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => {
    setActiveIndex(null);
    setZoomed(false);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current - 1 + speakingGallery.length) % speakingGallery.length;
    });
    setZoomed(false);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current + 1) % speakingGallery.length;
    });
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "+" || event.key === "=") setZoomed(true);
      if (event.key === "-") setZoomed(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, goNext, goPrev]);

  const activeItem = activeIndex !== null ? speakingGallery[activeIndex] : null;

  return (
    <Reveal className="mt-8">
      <div className="relative left-1/2 w-[100vw] max-w-[90rem] -translate-x-1/2 px-5 md:px-8">
        <ul className="grid auto-rows-[minmax(13rem,auto)] grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-flow-dense sm:gap-4 lg:grid-cols-3">
          {speakingGallery.map((item, index) => (
            <li
              key={item.src}
              className={cn(
                "group relative min-h-[13rem] overflow-hidden rounded-2xl border border-line bg-bg-raise sm:min-h-[15rem]",
                item.span ? spanClass[item.span] : "",
              )}
            >
              <button
                type="button"
                className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                aria-label={`Open ${item.caption} — zoom`}
                onClick={() => {
                  setActiveIndex(index);
                  setZoomed(false);
                }}
              />
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index < 2}
                sizes={
                  item.span === "hero" || item.span === "wide"
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 100vw, 33vw"
                }
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/25 bg-black/40 px-2 py-1 font-mono text-[10px] text-white/90 opacity-0 backdrop-blur-sm transition group-hover:opacity-100 group-focus-within:opacity-100">
                Zoom
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="font-display text-base font-semibold leading-snug text-white sm:text-lg">{item.caption}</p>
                {item.location ? (
                  <p className="mt-1 font-mono text-[10px] tracking-wide text-white/75 uppercase sm:text-[11px]">
                    {item.location}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {activeItem && activeIndex !== null ? (
        <SpeakingLightbox
          item={activeItem}
          index={activeIndex}
          total={speakingGallery.length}
          zoomed={zoomed}
          onZoomToggle={() => setZoomed((value) => !value)}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
        />
      ) : null}
    </Reveal>
  );
}
