"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };

function spherePoints(count: number): Point[] {
  const points: Point[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * index;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }
  return points;
}

function isDarkTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function globePalette(dark: boolean) {
  if (dark) {
    return {
      glow: ["rgba(70, 130, 255, 0.18)", "rgba(40, 90, 200, 0.05)", "rgba(0, 0, 0, 0)"],
      ring: "rgba(150, 186, 255, 0.16)",
      edge: (depth: number) => `rgba(140, 186, 255, ${0.04 + Math.max(0, depth) * 0.32})`,
      node: (hub: boolean, z: number, depth: number) =>
        hub ? `rgba(190, 255, 230, ${0.45 + z * 0.55})` : `rgba(226, 236, 255, ${0.2 + Math.max(0, z) * 0.8})`,
      packet: "rgba(214, 255, 236, 0.95)",
      outline: "rgba(176, 208, 255, 0.35)",
    };
  }
  return {
    glow: ["rgba(48, 104, 214, 0.22)", "rgba(40, 90, 200, 0.08)", "rgba(0, 0, 0, 0)"],
    ring: "rgba(12, 61, 143, 0.14)",
    edge: (depth: number) => `rgba(12, 61, 143, ${0.06 + Math.max(0, depth) * 0.28})`,
    node: (hub: boolean, z: number, depth: number) =>
      hub ? `rgba(12, 107, 66, ${0.55 + z * 0.45})` : `rgba(12, 61, 143, ${0.25 + Math.max(0, z) * 0.65})`,
    packet: "rgba(12, 107, 66, 0.85)",
    outline: "rgba(12, 61, 143, 0.35)",
  };
}

function rotate(point: Point, ay: number): Point {
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  const x = point.x * cy + point.z * sy;
  const z = -point.x * sy + point.z * cy;
  const ax = 0.46;
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  return { x, y: point.y * cx - z * sx, z: point.y * sx + z * cx };
}

export function ProxyGlobe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 760px)").matches;
    const nodes = spherePoints(compact ? 56 : 84);
    const edges: Array<[number, number]> = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        if (!a || !b) continue;
        const distance = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (distance < (compact ? 0.42 : 0.5)) edges.push([i, j]);
      }
    }

    let frame = 0;
    let width = 0;
    let height = 0;
    let onScreen = true;
    let angle = 0.55;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) paint();
    };

    const screenOf = (point: Point) => {
      const fov = 2.45;
      const depth = fov / (fov - point.z);
      const radius = Math.min(width, height) * 0.4;
      return {
        x: width * 0.7 + point.x * depth * radius,
        y: height * 0.46 + point.y * depth * radius,
        z: point.z,
        depth,
      };
    };

    const paint = () => {
      const palette = globePalette(isDarkTheme());
      context.clearRect(0, 0, width, height);
      const originX = width * 0.7;
      const originY = height * 0.46;
      const radius = Math.min(width, height) * 0.4;
      const glow = context.createRadialGradient(originX, originY, radius * 0.15, originX, originY, radius * 1.45);
      glow.addColorStop(0, palette.glow[0]!);
      glow.addColorStop(0.5, palette.glow[1]!);
      glow.addColorStop(1, palette.glow[2]!);
      context.fillStyle = glow;
      context.beginPath();
      context.arc(originX, originY, radius * 1.45, 0, Math.PI * 2);
      context.fill();

      const projected = nodes.map((node) => screenOf(rotate(node, angle)));

      context.lineWidth = 1;
      context.strokeStyle = palette.ring;
      const strokeRing = (samples: Point[]) => {
        let open = false;
        context.beginPath();
        for (const sample of samples) {
          const point = screenOf(rotate(sample, angle));
          if (point.z < -0.08) {
            open = false;
            continue;
          }
          if (!open) {
            context.moveTo(point.x, point.y);
            open = true;
          } else {
            context.lineTo(point.x, point.y);
          }
        }
        context.stroke();
      };

      if (!compact) {
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (lat * Math.PI) / 180;
        const samples: Point[] = [];
        for (let lon = 0; lon <= 360; lon += 10) {
          const lambda = (lon * Math.PI) / 180;
          samples.push({
            x: Math.cos(phi) * Math.cos(lambda),
            y: Math.sin(phi),
            z: Math.cos(phi) * Math.sin(lambda),
          });
        }
        strokeRing(samples);
      }
      for (let lon = 0; lon < 180; lon += 30) {
        const lambda = (lon * Math.PI) / 180;
        const samples: Point[] = [];
        for (let lat = -90; lat <= 90; lat += 10) {
          const phi = (lat * Math.PI) / 180;
          samples.push({
            x: Math.cos(phi) * Math.cos(lambda),
            y: Math.sin(phi),
            z: Math.cos(phi) * Math.sin(lambda),
          });
        }
        strokeRing(samples);
      }
      }

      for (const [from, to] of edges) {
        const a = projected[from];
        const b = projected[to];
        if (!a || !b || (a.z < -0.2 && b.z < -0.2)) continue;
        const depth = (a.z + b.z) / 2;
        context.strokeStyle = palette.edge(depth);
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      projected.forEach((point, index) => {
        if (point.z < -0.15) return;
        const hub = index % 13 === 0;
        context.fillStyle = palette.node(hub, point.z, point.depth);
        context.beginPath();
        context.arc(point.x, point.y, (hub ? 2.5 : 1.35) * point.depth, 0, Math.PI * 2);
        context.fill();
      });

      if (!reduce) {
        const travel = (performance.now() / 2600) % 1;
        for (let packet = 0; packet < 6; packet += 1) {
          const edge = edges[(packet * 17) % edges.length];
          if (!edge) continue;
          const a = nodes[edge[0]];
          const b = nodes[edge[1]];
          if (!a || !b) continue;
          const t = (travel + packet / 6) % 1;
          const point = screenOf(
            rotate(
              {
                x: a.x + (b.x - a.x) * t,
                y: a.y + (b.y - a.y) * t,
                z: a.z + (b.z - a.z) * t,
              },
              angle,
            ),
          );
          if (point.z < 0) continue;
          context.fillStyle = palette.packet;
          context.beginPath();
          context.arc(point.x, point.y, 2.3, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.strokeStyle = palette.outline;
      context.lineWidth = 1.25;
      context.beginPath();
      context.arc(originX, originY, radius, 0, Math.PI * 2);
      context.stroke();
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!onScreen || document.hidden) return;
      angle += 0.0026;
      paint();
    };

    resize();
    const themeObserver = new MutationObserver(() => {
      paint();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
    });
    intersection.observe(canvas);

    if (reduce) paint();
    else window.setTimeout(() => {
      frame = requestAnimationFrame(loop);
    }, compact ? 1200 : 400);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersection.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
}
