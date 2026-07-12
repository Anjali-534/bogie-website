"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const OLA_KEY = process.env.NEXT_PUBLIC_OLA_MAPS_KEY || "";
const OLA_STYLE = `https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json?api_key=${OLA_KEY}`;

// Renders even without an Ola key so the page never shows a dead box.
const OSM_FALLBACK_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

const BEFORE_PICKUP_COLOR = "#22c55e";
const IN_RIDE_COLOR = "#ff6b2b";
const DRIVER_ANIM_MS = 900;

const CATEGORY_EMOJI: Record<string, string> = {
  cab: "🚗",
  truck: "🚚",
  ambulance: "🚑",
};

export type MapLatLng = { lat: number; lng: number };

type Props = {
  pickup: MapLatLng | null;
  drop: MapLatLng | null;
  driver: (MapLatLng & { heading?: number }) | null;
  routeCoords: MapLatLng[];
  beforePickup: boolean;
  category: string;
  className?: string;
};

function pinElement(color: string) {
  const el = document.createElement("div");
  el.style.cssText = "display:flex;flex-direction:column;align-items:center;";
  el.innerHTML =
    `<div style="width:16px;height:16px;border-radius:50%;background:${color};` +
    `border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.35);"></div>`;
  return el;
}

function driverElement(category: string) {
  const el = document.createElement("div");
  el.style.cssText =
    "width:38px;height:38px;border-radius:50%;background:#fff;display:flex;" +
    "align-items:center;justify-content:center;font-size:21px;" +
    "box-shadow:0 2px 8px rgba(0,0,0,0.3);border:2px solid #fff;";
  el.textContent = CATEGORY_EMOJI[category] || CATEGORY_EMOJI.cab;
  return el;
}

export default function TrackingMap({
  pickup,
  drop,
  driver,
  routeCoords,
  beforePickup,
  category,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const styleReadyRef = useRef(false);
  const pickupMarkerRef = useRef<maplibregl.Marker | null>(null);
  const dropMarkerRef = useRef<maplibregl.Marker | null>(null);
  const driverMarkerRef = useRef<maplibregl.Marker | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const didFitRef = useRef(false);

  // Latest render props, readable from the style "load" callback.
  const latestRef = useRef({ routeCoords, beforePickup });
  latestRef.current = { routeCoords, beforePickup };

  // ── Map init (once) ────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: OLA_KEY ? OLA_STYLE : OSM_FALLBACK_STYLE,
      center: [pickup?.lng ?? 77.209, pickup?.lat ?? 28.6139],
      zoom: 13,
      attributionControl: { compact: true },
      // Ola's style references sprites/glyphs/tiles that also need the key.
      transformRequest: (url) => {
        if (OLA_KEY && url.includes("olamaps.io") && !url.includes("api_key=")) {
          return { url: `${url}${url.includes("?") ? "&" : "?"}api_key=${OLA_KEY}` };
        }
        return { url };
      },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      styleReadyRef.current = true;
      syncRoute(map, latestRef.current.routeCoords, latestRef.current.beforePickup);
    });

    mapRef.current = map;
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      map.remove();
      mapRef.current = null;
      styleReadyRef.current = false;
      pickupMarkerRef.current = null;
      dropMarkerRef.current = null;
      driverMarkerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Pickup / drop markers ──────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (pickup) {
      if (!pickupMarkerRef.current) {
        pickupMarkerRef.current = new maplibregl.Marker({ element: pinElement("#22c55e") })
          .setLngLat([pickup.lng, pickup.lat])
          .addTo(map);
      } else {
        pickupMarkerRef.current.setLngLat([pickup.lng, pickup.lat]);
      }
    }
    if (drop) {
      if (!dropMarkerRef.current) {
        dropMarkerRef.current = new maplibregl.Marker({ element: pinElement("#ff6b2b") })
          .setLngLat([drop.lng, drop.lat])
          .addTo(map);
      } else {
        dropMarkerRef.current.setLngLat([drop.lng, drop.lat]);
      }
    }
    if (!didFitRef.current && pickup && drop && !driver) {
      didFitRef.current = true;
      map.fitBounds(
        new maplibregl.LngLatBounds([pickup.lng, pickup.lat], [drop.lng, drop.lat]),
        { padding: 60, maxZoom: 15, duration: 600 }
      );
    }
  }, [pickup?.lat, pickup?.lng, drop?.lat, drop?.lng, driver]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Driver marker: create, then glide to each new position ────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!driver?.lat || !driver?.lng) {
      if (driverMarkerRef.current) {
        driverMarkerRef.current.remove();
        driverMarkerRef.current = null;
      }
      return;
    }

    const target: [number, number] = [driver.lng, driver.lat];

    if (!driverMarkerRef.current) {
      driverMarkerRef.current = new maplibregl.Marker({
        element: driverElement(category),
        rotationAlignment: "map",
      })
        .setLngLat(target)
        .addTo(map);
    } else {
      // Glide from the current position to the new one instead of snapping.
      const from = driverMarkerRef.current.getLngLat();
      const marker = driverMarkerRef.current;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DRIVER_ANIM_MS);
        const ease = 1 - (1 - t) * (1 - t);
        marker.setLngLat([
          from.lng + (target[0] - from.lng) * ease,
          from.lat + (target[1] - from.lat) * ease,
        ]);
        if (t < 1) animFrameRef.current = requestAnimationFrame(step);
      };
      animFrameRef.current = requestAnimationFrame(step);
    }

    // Camera follows the driver.
    map.easeTo({ center: target, zoom: Math.max(map.getZoom(), 14), duration: 800 });
  }, [driver?.lat, driver?.lng, category]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Route polyline ─────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReadyRef.current) return;
    syncRoute(map, routeCoords, beforePickup);
  }, [routeCoords, beforePickup]);

  return <div ref={containerRef} className={className} />;
}

function syncRoute(map: maplibregl.Map, coords: MapLatLng[], beforePickup: boolean) {
  const data: GeoJSON.Feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coords.map((c) => [c.lng, c.lat]),
    },
  };
  const source = map.getSource("route") as maplibregl.GeoJSONSource | undefined;
  if (source) {
    source.setData(data);
  } else {
    map.addSource("route", { type: "geojson", data });
    map.addLayer({
      id: "route-line",
      type: "line",
      source: "route",
      layout: { "line-cap": "round", "line-join": "round" },
      paint: { "line-width": 4 },
    });
  }
  map.setPaintProperty(
    "route-line",
    "line-color",
    beforePickup ? BEFORE_PICKUP_COLOR : IN_RIDE_COLOR
  );
  map.setPaintProperty(
    "route-line",
    "line-dasharray",
    beforePickup ? [1.5, 1.5] : [1, 0]
  );
}
