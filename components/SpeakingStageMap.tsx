"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { cities, globeCityClusters, type CityId, type GlobeCityCluster } from "@/data/proposal";
import { cn } from "@/lib/cn";

type SpeakingStageMapProps = {
  city: CityId | "all";
  onSelectCity: (city: CityId | "all") => void;
};

type HtmlCity = GlobeCityCluster & {
  focused: boolean;
  theme: "light" | "dark";
};

type GlobePoint = GlobeCityCluster & {
  color: string;
  size: number;
  altitude: number;
};

type GlobeRing = {
  lat: number;
  lng: number;
  cityId: CityId;
  maxRadius: number;
  propagationSpeed: number;
  repeatPeriod: number;
};

function subscribeTheme(onStoreChange: () => void) {
  const root = document.documentElement;
  const observer = new MutationObserver(onStoreChange);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getThemeSnapshot(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getThemeServerSnapshot(): "light" | "dark" {
  return "light";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function SpeakingStageMap({ city, onSelectCity }: SpeakingStageMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const onSelectCityRef = useRef(onSelectCity);
  const cityRef = useRef(city);
  const [size, setSize] = useState(480);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  onSelectCityRef.current = onSelectCity;
  cityRef.current = city;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      setSize(Math.min(Math.max(Math.min(width, height * 1.08), 300), 680));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clusters = useMemo(() => globeCityClusters(), []);
  const selected = clusters.find((item) => item.cityId === city) ?? null;

  const htmlCities = useMemo((): HtmlCity[] => {
    return clusters.map((cluster) => ({
      ...cluster,
      theme,
      focused: city === "all" || city === cluster.cityId,
    }));
  }, [clusters, city, theme]);

  const points = useMemo((): GlobePoint[] => {
    const hot = theme === "dark" ? "#5ee4a8" : "#1a56c4";
    const cool = theme === "dark" ? "#6d8fbf" : "#6f93d4";
    return clusters.map((cluster) => {
      const focused = city === "all" || city === cluster.cityId;
      return {
        ...cluster,
        color: focused ? hot : cool,
        size: focused ? 0.18 : 0.12,
        altitude: 0.01,
      };
    });
  }, [clusters, city, theme]);

  const rings = useMemo((): GlobeRing[] => {
    return clusters.map((cluster) => ({
      lat: cluster.lat,
      lng: cluster.lng,
      cityId: cluster.cityId,
      maxRadius: city === cluster.cityId ? 5.2 : city === "all" ? 2.6 : 0,
      propagationSpeed: city === cluster.cityId ? 1.6 : 0.85,
      repeatPeriod: city === cluster.cityId ? 900 : 1800,
    }));
  }, [clusters, city]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls();
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 170;
    controls.maxDistance = 520;
    if (city === "all") {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
      globe.pointOfView({ lat: 32, lng: -18, altitude: 2.15 }, 1200);
      return;
    }
    const place = cities.find((item) => item.id === city);
    if (!place) return;
    controls.autoRotate = false;
    globe.pointOfView({ lat: place.lat + 4, lng: place.lon, altitude: 1.48 }, 900);
  }, [city, size]);

  const buildHtmlElement = useCallback((datum: object) => {
    const marker = datum as HtmlCity;
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "globe-city-pin",
      `globe-city-pin--${marker.theme}`,
      marker.focused ? "is-on" : "is-dim",
    ].join(" ");
    button.setAttribute(
      "aria-label",
      `${marker.name}, ${marker.country}: ${marker.conferences.join(", ")}`,
    );
    button.innerHTML = `
      <span class="globe-city-pin__dot" aria-hidden="true"></span>
      <span class="globe-city-pin__row">
        <strong>${escapeHtml(marker.name)}</strong>
        <span class="globe-city-pin__count">${marker.count}</span>
      </span>
    `;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const current = cityRef.current;
      onSelectCityRef.current(current === marker.cityId ? "all" : marker.cityId);
    });
    return button;
  }, []);

  const isDark = theme === "dark";
  const canvasHeight = Math.max(Math.round(size * 0.94), 320);

  return (
    <div ref={containerRef} className="stage-globe-scene stage-globe-scene--embedded stage-globe-scene--hud h-full min-h-[380px]">
      <div className="stage-globe-scene__aurora stage-globe-scene__aurora--soft" aria-hidden="true" />
      <div className="stage-globe-scene__stars" aria-hidden="true" />

      <div className="stage-globe-scene__canvas stage-globe-scene__canvas--wide" style={{ height: canvasHeight }}>
        <div className="stage-globe-scene__glow stage-globe-scene__glow--soft" aria-hidden="true" />
        <Globe
          ref={globeRef}
          width={size}
          height={canvasHeight}
          globeOffset={[0, 8]}
          globeImageUrl={isDark ? "/earth-globe-night.jpg" : "/earth-globe.jpg"}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere
          atmosphereColor={isDark ? "#6eb0ff" : "#4d8fe6"}
          atmosphereAltitude={0.15}
          showGraticules={false}
          labelsData={[]}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointRadius="size"
          pointAltitude="altitude"
          pointResolution={8}
          pointsMerge={false}
          onPointClick={(point) => {
            const marker = point as GlobePoint;
            onSelectCity(city === marker.cityId ? "all" : marker.cityId);
          }}
          htmlElementsData={htmlCities}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.02}
          htmlElement={buildHtmlElement}
          htmlElementVisibilityModifier={(el, visible) => {
            el.style.opacity = visible ? "" : "0";
            el.style.pointerEvents = visible ? "auto" : "none";
          }}
          htmlTransitionDuration={200}
          ringsData={rings.filter((ring) => ring.maxRadius > 0)}
          ringLat="lat"
          ringLng="lng"
          ringMaxRadius="maxRadius"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          ringColor={(ring: object) => {
            const item = ring as GlobeRing;
            return city === item.cityId
              ? ["rgba(94, 228, 168, 0.42)", "rgba(94, 228, 168, 0)"]
              : ["rgba(80, 140, 230, 0.2)", "rgba(80, 140, 230, 0)"];
          }}
        />
      </div>

      {selected ? (
        <aside className="stage-globe-card" aria-live="polite">
          <p className="stage-globe-card__kicker">{selected.country}</p>
          <p className="stage-globe-card__city">{selected.name}</p>
          <ul className="stage-globe-card__list">
            {selected.conferences.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <button type="button" className="stage-globe-card__clear" onClick={() => onSelectCity("all")}>
            Show all cities
          </button>
        </aside>
      ) : (
        <p className="stage-globe-legend">
          {clusters.length} cities · {clusters.reduce((sum, item) => sum + item.count, 0)} conferences
        </p>
      )}

      <div className="stage-globe-scene__footer lg:hidden">
        <div className="stage-globe-scene__chips" role="group" aria-label="Jump to city on globe">
          <button
            type="button"
            className={cn("stage-globe-chip", city === "all" && "stage-globe-chip--active")}
            aria-pressed={city === "all"}
            onClick={() => onSelectCity("all")}
          >
            All
          </button>
          {clusters.map((place) => (
            <button
              key={place.cityId}
              type="button"
              className={cn("stage-globe-chip", city === place.cityId && "stage-globe-chip--active")}
              aria-pressed={city === place.cityId}
              onClick={() => onSelectCity(city === place.cityId ? "all" : place.cityId)}
            >
              {place.name}
              <span className="stage-globe-chip__count">{place.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
