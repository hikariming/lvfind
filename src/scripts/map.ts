import { Map, NavigationControl, Popup, LngLatBounds, setWorkerUrl, type GeoJSONSource, type MapGeoJSONFeature } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { MapVenue } from '../data/events';
import type { FeatureCollection, Point } from 'geojson';

setWorkerUrl(workerUrl);

const STYLE = { light: 'https://tiles.openfreemap.org/styles/positron', dark: 'https://tiles.openfreemap.org/styles/dark' };
const ASIA_VIEW = { center: [122, 28] as [number, number], zoom: 2.4 };

export interface VenueMapOptions {
  container: HTMLElement;
  venues: MapVenue[];
  counts: Record<string, number>;
  cooperative?: boolean;
  showEmpty?: boolean;
  center?: [number, number];
  zoom?: number;
  route?: [number, number][];
  popupHtml?: (venue: MapVenue) => string;
}

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const theme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function createVenueMap(opts: VenueMapOptions) {
  const byId = Object.fromEntries(opts.venues.map((v) => [v.id, v]));
  let counts = opts.counts;
  let highlighted: string | null = null;

  const map = new Map({
    container: opts.container,
    style: STYLE[theme()],
    center: opts.center ?? ASIA_VIEW.center,
    zoom: opts.zoom ?? ASIA_VIEW.zoom,
    attributionControl: { compact: true },
    cooperativeGestures: opts.cooperative ?? false,
    renderWorldCopies: true,
    locale: {
      'CooperativeGesturesHandler.WindowsHelpText': '按住 Ctrl 并滚动以缩放地图',
      'CooperativeGesturesHandler.MacHelpText': '按住 ⌘ 并滚动以缩放地图',
      'CooperativeGesturesHandler.MobileHelpText': '使用双指移动地图',
      'NavigationControl.ZoomIn': '放大',
      'NavigationControl.ZoomOut': '缩小',
    },
  });
  map.addControl(new NavigationControl({ showCompass: false }), 'top-right');

  const geojson = (): FeatureCollection => ({
    type: 'FeatureCollection',
    features: opts.venues
      .filter((v) => opts.showEmpty || (counts[v.id] ?? 0) > 0)
      .map((v) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [v.lng, v.lat] },
        properties: { id: v.id, count: counts[v.id] ?? 0, label: counts[v.id] ? String(counts[v.id]) : '' },
      })),
  });

  const highlightData = (): FeatureCollection => {
    const v = highlighted ? byId[highlighted] : null;
    return {
      type: 'FeatureCollection',
      features: v ? [{ type: 'Feature', geometry: { type: 'Point', coordinates: [v.lng, v.lat] }, properties: {} }] : [],
    };
  };

  function tintBaseMap() {
    const land = css('--lv-map-land');
    const water = css('--lv-map-water');
    const park = css('--lv-map-park');
    for (const layer of map.getStyle().layers) {
      if (layer.type === 'background') map.setPaintProperty(layer.id, 'background-color', land);
      else if (layer.type === 'fill' && layer.id === 'water') map.setPaintProperty(layer.id, 'fill-color', water);
      else if (layer.type === 'fill' && /park|wood/.test(layer.id)) map.setPaintProperty(layer.id, 'fill-color', park);
      else if (layer.type === 'symbol' && /^(label|place)_/.test(layer.id)) {
        map.setLayoutProperty(layer.id, 'text-field', ['coalesce', ['get', 'name:zh'], ['get', 'name:latin'], ['get', 'name']]);
      }
    }
  }

  function addLayers() {
    const primary = css('--md-sys-color-primary');
    const onPrimary = css('--md-sys-color-on-primary');
    const surface = css('--md-sys-color-surface');

    map.addSource('venues', {
      type: 'geojson',
      data: geojson(),
      cluster: true,
      clusterRadius: 36,
      clusterMaxZoom: 8,
      clusterProperties: { total: ['+', ['get', 'count']] },
    });
    map.addSource('highlight', { type: 'geojson', data: highlightData() });

    if (opts.route && opts.route.length > 1) {
      map.addSource('route', {
        type: 'geojson',
        data: { type: 'Feature', geometry: { type: 'LineString', coordinates: opts.route }, properties: {} },
      });
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': primary, 'line-width': 3, 'line-dasharray': [2, 2.5], 'line-opacity': 0.9 },
      });
    }

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'venues',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': primary,
        'circle-opacity': 0.92,
        'circle-radius': ['step', ['get', 'total'], 16, 5, 20, 12, 26],
        'circle-stroke-width': 4,
        'circle-stroke-color': surface,
        'circle-stroke-opacity': 0.8,
      },
    });
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'venues',
      filter: ['has', 'point_count'],
      layout: { 'text-field': ['get', 'total'], 'text-font': ['Noto Sans Bold'], 'text-size': 13, 'text-allow-overlap': true },
      paint: { 'text-color': onPrimary },
    });
    map.addLayer({
      id: 'venue-halo',
      type: 'circle',
      source: 'venues',
      filter: ['!', ['has', 'point_count']],
      paint: { 'circle-color': primary, 'circle-opacity': 0.18, 'circle-radius': 18 },
    });
    map.addLayer({
      id: 'venue-point',
      type: 'circle',
      source: 'venues',
      filter: ['!', ['has', 'point_count']],
      paint: { 'circle-color': primary, 'circle-radius': 11, 'circle-stroke-width': 2.5, 'circle-stroke-color': surface },
    });
    map.addLayer({
      id: 'venue-count',
      type: 'symbol',
      source: 'venues',
      filter: ['!', ['has', 'point_count']],
      layout: { 'text-field': ['get', 'label'], 'text-font': ['Noto Sans Bold'], 'text-size': 11, 'text-allow-overlap': true },
      paint: { 'text-color': onPrimary },
    });
    map.addLayer({
      id: 'highlight-ring',
      type: 'circle',
      source: 'highlight',
      paint: { 'circle-radius': 20, 'circle-color': 'transparent', 'circle-stroke-width': 3, 'circle-stroke-color': primary },
    });
  }

  map.on('style.load', () => {
    tintBaseMap();
    addLayers();
  });

  // 高亮环呼吸动画
  let t = 0;
  const pulse = () => {
    t += 0.05;
    if (highlighted && map.getLayer('highlight-ring')) {
      map.setPaintProperty('highlight-ring', 'circle-radius', 20 + Math.sin(t) * 4);
    }
    requestAnimationFrame(pulse);
  };
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(pulse);

  map.on('click', 'clusters', async (e) => {
    const f = e.features?.[0] as MapGeoJSONFeature;
    const zoom = await (map.getSource('venues') as GeoJSONSource).getClusterExpansionZoom(f.properties.cluster_id);
    map.easeTo({ center: (f.geometry as Point).coordinates as [number, number], zoom: zoom + 0.5 });
  });

  map.on('click', 'venue-point', (e) => {
    const f = e.features?.[0];
    const v = f && byId[f.properties.id];
    if (!v || !opts.popupHtml) return;
    new Popup({ offset: 14, maxWidth: '300px', className: 'lv-popup' })
      .setLngLat([v.lng, v.lat])
      .setHTML(opts.popupHtml(v))
      .addTo(map);
  });

  for (const layer of ['clusters', 'venue-point']) {
    map.on('mouseenter', layer, () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', layer, () => (map.getCanvas().style.cursor = ''));
  }

  new MutationObserver(() => map.setStyle(STYLE[theme()], { diff: false })).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  return {
    map,
    setCounts(next: Record<string, number>, fit = true) {
      counts = next;
      (map.getSource('venues') as GeoJSONSource | undefined)?.setData(geojson());
      if (!fit) return;
      const ids = Object.keys(next).filter((id) => next[id] > 0);
      if (!ids.length || ids.length === opts.venues.length) {
        map.easeTo({ ...ASIA_VIEW, duration: 800 });
        return;
      }
      const bounds = new LngLatBounds();
      ids.forEach((id) => bounds.extend([byId[id].lng, byId[id].lat]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 11, duration: 800 });
    },
    highlight(id: string | null) {
      highlighted = id;
      (map.getSource('highlight') as GeoJSONSource | undefined)?.setData(highlightData());
    },
  };
}
