<template>
  <div class="project-page hrjust-mapPage">
    <!-- TOP HERO (COMPACT) -->
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            CURRENT PROJECT
          </div>

          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            <span class="accent">Info</span> Graphics
          </h1>

          <p class="hero-subtitle">
            World map of WTO notifications per member country (zoom, pan, hover for details).
          </p>

          <div class="hero-actions">
            <RouterLink class="btn btn--primary" to="/contact">Any Questions?</RouterLink>
            <RouterLink class="btn btn--ghost" to="/">Back to Home</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset">
          <section class="feature-section" aria-label="Infographics content">
            <h2 class="section-heading">Overview</h2>

            <div class="hrjust-mapPanel" role="region" aria-label="World map: notifications per country">
              <!-- Header row -->
              <div class="hrjust-mapPanel__head">
                <div class="hrjust-mapPanel__title">
                  Notifications per country
                  <span class="hrjust-mapPanel__kpi" aria-label="Countries with at least one notification">
                    {{ countriesWithData }} countries • {{ totalNotifications }} notifications
                  </span>
                </div>

                <div class="hrjust-mapPanel__right">
                  <div class="hrjust-mapPanel__legend" aria-label="Legend">
                    <span class="hrjust-legend__label">Low</span>
                    <span class="hrjust-legend__bar" aria-hidden="true"></span>
                    <span class="hrjust-legend__label">High</span>
                  </div>

                  <div class="hrjust-mapPanel__hint" aria-hidden="true">Scroll to zoom • Drag to move</div>
                </div>
              </div>

              <!-- Map stage -->
              <div ref="mapWrapEl" class="hrjust-mapStage">
                <!-- Controls -->
                <div class="hrjust-mapControls" role="group" aria-label="Map controls">
                  <button class="hrjust-mapBtn" type="button" @click="zoomBy(1.18)" aria-label="Zoom in">
                    +
                  </button>
                  <button class="hrjust-mapBtn" type="button" @click="zoomBy(1 / 1.18)" aria-label="Zoom out">
                    −
                  </button>
                  <button class="hrjust-mapBtn hrjust-mapBtn--reset" type="button" @click="resetView" aria-label="Reset view">
                    Reset
                  </button>
                </div>

                <svg
                  v-if="paths.length"
                  class="hrjust-mapSvg"
                  :class="{ 'is-dragging': drag.on }"
                  :viewBox="`0 0 ${viewBox.w} ${viewBox.h}`"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label="World map (zoom and pan)"
                  @wheel.passive="false"
                  @wheel="onWheel"
                  @pointerdown="onPointerDown"
                  @pointermove="onPointerMove"
                  @pointerup="onPointerUp"
                  @pointercancel="onPointerUp"
                  @pointerleave="onPointerLeave"
                >
                  <!-- Apply zoom/pan here -->
                  <g :transform="`translate(${view.tx} ${view.ty}) scale(${view.scale})`">
                    <path
                      v-for="c in paths"
                      :key="c.key"
                      class="hrjust-country"
                      :class="{ 'is-hasData': c.count > 0 }"
                      :d="c.d"
                      :fill="c.fill"
                      @pointerenter="showTip(c)"
                      @pointerleave="hideTip"
                    />
                  </g>
                </svg>

                <div v-else class="hrjust-mapLoading" role="status" aria-live="polite">
                  Loading map…
                </div>

                <!-- Tooltip -->
                <div
                  v-show="tip.open"
                  class="hrjust-mapTip"
                  role="dialog"
                  aria-label="Country tooltip"
                  :style="{ left: `${tip.x}px`, top: `${tip.y}px` }"
                >
                  <div class="hrjust-mapTip__head">
                    <div class="hrjust-mapTip__pin" aria-hidden="true"></div>
                    <div class="hrjust-mapTip__name" :title="tip.name">{{ tip.name }}</div>

                  </div>

                  <div class="hrjust-mapTip__sub">
                    <span class="hrjust-mapTip__k">Notifications</span>
                    <span class="hrjust-mapTip__v">{{ tip.count }}</span>
                  </div>

                  <div class="hrjust-mapTip__bar" aria-hidden="true">
                    <span class="hrjust-mapTip__barFill" :style="{ width: `${tipBarPct}%` }"></span>
                  </div>
                </div>
              </div>

              <div class="hrjust-mapNote" role="note">
                Data source: <code>/public/WTO_Notifcations.json</code>. Hover a country to see its notification count.
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useWordReveal } from '@/composables/useWordReveal'

/* Same animation settings as homepage */
const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

/* =========================
   Map state
   ========================= */
const mapWrapEl = ref(null)

/** Stable viewBox simplifies responsive scaling */
const viewBox = reactive({ w: 1100, h: 560 })

/**
 * paths: rendered SVG path list with computed fill + aggregated counts
 * item: { key, name, count, d, fill }
 */
const paths = ref([])

/** Tooltip */
const tip = reactive({
  open: false,
  name: '',
  count: 0,
  x: 0,
  y: 0,
})

/** Aggregations */
const totalNotifications = ref(0)
const countriesWithData = ref(0)
const maxCount = ref(0)

/* =========================
   Zoom + Pan view
   ========================= */
const view = reactive({
  scale: 1,
  tx: 0,
  ty: 0,
  min: 1,
  max: 9,
})

const drag = reactive({
  on: false,
  pointerId: null,
  sx: 0,
  sy: 0,
  stx: 0,
  sty: 0,
})

/* =========================
   Helpers
   ========================= */
function norm(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[’']/g, "'")
}

const NAME_OVERRIDES = {
  [norm('Russian Federation')]: 'Russia',
  [norm('Korea, Republic of')]: 'South Korea',
  [norm('United States of America')]: 'United States',
  [norm('Venezuela, Bolivarian Republic of')]: 'Venezuela',
  [norm('Czechia')]: 'Czech Republic',
}

function toGeoName(memberName) {
  const n = norm(memberName)
  return NAME_OVERRIDES[n] || memberName
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v))
}

/** Color ramp (0 => subtle gray, >0 => accent intensity) */
function colorForCount(count, max) {
  if (!count) return 'rgba(10, 34, 59, 0.06)'
  const t = max <= 0 ? 1 : count / max
  const a = 0.14 + 0.62 * clamp(t, 0, 1)
  return `rgba(174, 12, 54, ${a.toFixed(3)})`
}

/* =========================
   Geo: minimal projection (no deps)
   ========================= */
function projectLonLat(lon, lat, w, h) {
  const x = ((lon + 180) / 360) * w
  const y = ((90 - lat) / 180) * h
  return [x, y]
}

function ringToPath(ring, w, h) {
  let d = ''
  for (let i = 0; i < ring.length; i++) {
    const [lon, lat] = ring[i]
    const [x, y] = projectLonLat(lon, lat, w, h)
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`
  }
  return d + ' Z'
}

function geomToPath(geometry, w, h) {
  if (!geometry) return ''
  const { type, coordinates } = geometry
  if (type === 'Polygon') {
    return coordinates.map((ring) => ringToPath(ring, w, h)).join(' ')
  }
  if (type === 'MultiPolygon') {
    return coordinates
      .map((poly) => poly.map((ring) => ringToPath(ring, w, h)).join(' '))
      .join(' ')
  }
  return ''
}

/* =========================
   Data loading
   ========================= */
async function loadNotifications() {
  const res = await fetch('/WTO_Notifcations.json')
  if (!res.ok) throw new Error(`Failed to load /WTO_Notifcations.json (${res.status})`)
  const rows = await res.json()

  const byMember = new Map()
  let total = 0

  for (const r of rows) {
    const name = toGeoName(r?.member)
    if (!name) continue
    total++
    byMember.set(name, (byMember.get(name) || 0) + 1)
  }

  totalNotifications.value = total
  countriesWithData.value = Array.from(byMember.values()).filter((v) => v > 0).length
  maxCount.value = Math.max(0, ...Array.from(byMember.values()))

  return byMember
}

async function loadWorldGeoJSON() {
  // If you prefer: download and host locally in /public and fetch('/countries.geo.json')
  const url = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load world geojson (${res.status})`)
  return await res.json()
}

async function buildMap() {
  const [byMember, world] = await Promise.all([loadNotifications(), loadWorldGeoJSON()])

  const feats = Array.isArray(world?.features) ? world.features : []

  // Build normalized index for matching
  const byMemberNorm = new Map()
  for (const [k, v] of byMember.entries()) byMemberNorm.set(norm(k), v)

  const out = []
  for (const f of feats) {
    const name = f?.properties?.name || f?.properties?.ADMIN || ''
    const count = byMemberNorm.get(norm(name)) || 0

    const d = geomToPath(f?.geometry, viewBox.w, viewBox.h)
    if (!d) continue

    out.push({
      key: `${name}-${count}`,
      name,
      count,
      d,
      fill: colorForCount(count, maxCount.value),
    })
  }

  // Put low counts first; high counts render later (on top)
  out.sort((a, b) => a.count - b.count)
  paths.value = out
}

/* =========================
   Tooltip (improved display + safe positioning)
   ========================= */
const tipBarPct = computed(() => {
  if (!maxCount.value) return 0
  return Math.round((tip.count / maxCount.value) * 100)
})

function clampTipToWrap(x, y) {
  const wrap = mapWrapEl.value
  if (!wrap) return { x, y }
  const r = wrap.getBoundingClientRect()

  // Tooltip footprint approximation (CSS max-width etc.)
  const w = 260
  const h = 92

  return {
    x: clamp(x, 10, Math.max(10, r.width - w - 10)),
    y: clamp(y, 10, Math.max(10, r.height - h - 10)),
  }
}

function showTip(country) {
  // Don’t pop tooltip while dragging (feels messy)
  if (drag.on || country.count === 0) return
  tip.open = true
  tip.name = country.name
  tip.count = country.count
}

function hideTip() {
  tip.open = false
}

function updateTipPositionFromEvent(e) {
  if (!tip.open) return
  const wrap = mapWrapEl.value
  if (!wrap) return
  const r = wrap.getBoundingClientRect()

  const px = Math.round(e.clientX - r.left + 14)
  const py = Math.round(e.clientY - r.top + 14)
  const p = clampTipToWrap(px, py)
  tip.x = p.x
  tip.y = p.y
}

/* =========================
   Zoom helpers
   ========================= */
function screenToSvgPoint(clientX, clientY) {
  const wrap = mapWrapEl.value
  if (!wrap) return { x: viewBox.w / 2, y: viewBox.h / 2 }
  const r = wrap.getBoundingClientRect()
  const x = ((clientX - r.left) / r.width) * viewBox.w
  const y = ((clientY - r.top) / r.height) * viewBox.h
  return { x, y }
}

function zoomAtPoint(nextScale, cx, cy) {
  nextScale = clamp(nextScale, view.min, view.max)
  const k = nextScale / view.scale

  // Keep cursor point stable under zoom:
  view.tx = cx - k * (cx - view.tx)
  view.ty = cy - k * (cy - view.ty)
  view.scale = nextScale
}

function zoomBy(factor) {
  const wrap = mapWrapEl.value
  if (!wrap) return
  const r = wrap.getBoundingClientRect()
  const cx = r.width ? (viewBox.w * 0.5) : viewBox.w * 0.5
  const cy = r.height ? (viewBox.h * 0.5) : viewBox.h * 0.5
  zoomAtPoint(view.scale * factor, cx, cy)
}

function resetView() {
  view.scale = 1
  view.tx = 0
  view.ty = 0
}

/* =========================
   Wheel zoom + Pointer pan (touch-friendly)
   ========================= */
function onWheel(e) {
  e.preventDefault()
  if (!mapWrapEl.value) return

  // smooth wheel zoom
  const zoomIn = e.deltaY < 0
  const factor = zoomIn ? 1.12 : 1 / 1.12

  const p = screenToSvgPoint(e.clientX, e.clientY)
  zoomAtPoint(view.scale * factor, p.x, p.y)

  // keep tooltip following cursor if open
  updateTipPositionFromEvent(e)
}

function onPointerDown(e) {
  // left mouse / touch / pen
  drag.on = true
  drag.pointerId = e.pointerId

  drag.sx = e.clientX
  drag.sy = e.clientY
  drag.stx = view.tx
  drag.sty = view.ty

  hideTip()

  // capture pointer for stable pan
  e.currentTarget?.setPointerCapture?.(e.pointerId)
}

function onPointerMove(e) {
  // tooltip position
  updateTipPositionFromEvent(e)

  if (!drag.on || drag.pointerId !== e.pointerId) return
  const wrap = mapWrapEl.value
  if (!wrap) return
  const r = wrap.getBoundingClientRect()

  // convert screen px drag into SVG px drag
  const dx = ((e.clientX - drag.sx) / r.width) * viewBox.w
  const dy = ((e.clientY - drag.sy) / r.height) * viewBox.h

  view.tx = drag.stx + dx
  view.ty = drag.sty + dy
}

function onPointerUp(e) {
  if (drag.pointerId !== e.pointerId) return
  drag.on = false
  drag.pointerId = null
}

function onPointerLeave(e) {
  // leaving the SVG area should stop dragging and hide tooltip
  hideTip()
  if (drag.on) onPointerUp(e)
}

/* =========================
   Lifecycle
   ========================= */
let ro = null

onMounted(async () => {
  await nextTick()
  await buildMap()

  const el = mapWrapEl.value
  if (el && 'ResizeObserver' in window) {
    ro = new ResizeObserver(() => {
      // viewBox scaling handles responsiveness; no rebuild needed.
    })
    ro.observe(el)
  }
})

onBeforeUnmount(() => {
  ro?.disconnect?.()
  ro = null
})
</script>

<style scoped>
/* Keep your flat banner rules */
:deep(.stage--top--flat) {
  min-height: clamp(320px, 46vh, 520px);
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px;
}
:deep(.stage--top--flat::after) {
  content: none !important;
}
:deep(.project-page .hero-offset) {
  margin-top: 0;
}

/* =========================
   Map panel (square, modern)
   ========================= */
.hrjust-mapPage {
  --hrjust-surface: #ffffff;
  --hrjust-border: rgba(10, 34, 59, 0.12);
  --hrjust-border-soft: rgba(10, 34, 59, 0.08);
  --hrjust-text: rgba(11, 31, 51, 0.92);
  --hrjust-muted: rgba(11, 31, 51, 0.62);
  --hrjust-muted-2: rgba(11, 31, 51, 0.48);
  --hrjust-hover: rgba(10, 34, 59, 0.035);
  --hrjust-active: rgba(174, 12, 54, 0.08);

  --hrjust-accent: #ae0c36;
  --hrjust-accent-2: #002d47;
}

.hrjust-mapPanel {
  border: 1px solid var(--hrjust-border);
  background: var(--hrjust-surface);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  border-radius: 0;
  overflow: hidden;
  margin-top: 14px;
}

.hrjust-mapPanel__head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px 14px;
  border-bottom: 1px solid var(--hrjust-border-soft);
}

.hrjust-mapPanel__title {
  font-weight: 950;
  color: var(--hrjust-text);
  letter-spacing: -0.01em;
  display: grid;
  gap: 4px;
}

.hrjust-mapPanel__kpi {
  font-weight: 750;
  font-size: 12.5px;
  color: var(--hrjust-muted);
}

.hrjust-mapPanel__right {
  display: grid;
  justify-items: end;
  gap: 6px;
}

.hrjust-mapPanel__legend {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  font-weight: 800;
  font-size: 10.5px;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--hrjust-muted-2);
}

.hrjust-mapPanel__hint {
  font-size: 12px;
  color: rgba(11, 31, 51, 0.56);
  font-weight: 650;
}

.hrjust-legend__bar {
  width: 120px;
  height: 10px;
  border: 1px solid var(--hrjust-border-soft);
  background: linear-gradient(90deg, rgba(10, 34, 59, 0.06), rgba(174, 12, 54, 0.75));
  border-radius: 0;
}

/* Map stage */
.hrjust-mapStage {
  position: relative;
  padding: 14px;
  background: #fff;
}

.hrjust-mapSvg {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid var(--hrjust-border-soft);
  background: linear-gradient(180deg, rgba(10, 34, 59, 0.02), rgba(10, 34, 59, 0.01));
  touch-action: none; /* important for pointer pan on touch devices */
  cursor: grab;
}
.hrjust-mapSvg.is-dragging {
  cursor: grabbing;
}

/* Countries */
.hrjust-country {
  stroke: rgba(11, 31, 51, 0.12);
  stroke-width: 1;
  transition: filter 140ms ease, opacity 140ms ease;
  opacity: 0.92;
  cursor: default;
}

.hrjust-country.is-hasData {
  stroke: rgba(174, 12, 54, 0.18);
  opacity: 1;
  cursor: pointer;
}

.hrjust-country:hover {
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.12));
  opacity: 1;
}

/* Controls */
.hrjust-mapControls {
  position: absolute;
  right: 22px;
  top: 22px;
  z-index: 5;
  display: inline-flex;
  gap: 8px;
}

.hrjust-mapBtn {
  appearance: none;
  border: 1px solid var(--hrjust-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 8px 10px;
  font-weight: 950;
  color: rgba(11, 31, 51, 0.78);
  cursor: pointer;
  line-height: 1;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
  transition: background 140ms ease, border-color 140ms ease, transform 140ms ease;
}
.hrjust-mapBtn:hover {
  background: var(--hrjust-hover);
  border-color: var(--hrjust-border);
  transform: translateY(-1px);
}
.hrjust-mapBtn:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
.hrjust-mapBtn--reset {
  font-weight: 900;
}

/* Tooltip — improved display */
.hrjust-mapTip {
  position: absolute;
  z-index: 20;
  width: min(280px, 78vw);

  border: 1px solid var(--hrjust-border);
  background: #fff;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.12);
  border-radius: 0;

  padding: 10px 10px;
  pointer-events: none;
}

.hrjust-mapTip__head {
  display: grid;
  grid-template-columns: 12px 1fr auto;
  gap: 10px;
  align-items: center;
}

.hrjust-mapTip__pin {
  width: 10px;
  height: 10px;
  background: linear-gradient(180deg, var(--hrjust-accent), var(--hrjust-accent-2));
}

.hrjust-mapTip__name {
  font-weight: 950;
  color: var(--hrjust-accent-2);
  letter-spacing: -0.01em;
  line-height: 1.15;
  min-width: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hrjust-mapTip__badge {
  min-width: 44px;
  text-align: center;
  padding: 6px 8px;
  border: 1px solid rgba(174, 12, 54, 0.24);
  background: rgba(174, 12, 54, 0.08);
  color: rgba(11, 31, 51, 0.92);
  font-weight: 950;
  font-size: 12.5px;
}
.hrjust-mapTip__badge.is-zero {
  border-color: rgba(10, 34, 59, 0.14);
  background: rgba(10, 34, 59, 0.04);
  color: rgba(11, 31, 51, 0.72);
}

.hrjust-mapTip__sub {
  margin-top: 10px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.hrjust-mapTip__k {
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-size: 10px;
  color: var(--hrjust-muted-2);
}

.hrjust-mapTip__v {
  font-weight: 950;
  color: var(--hrjust-text);
  font-size: 13px;
}

.hrjust-mapTip__bar {
  margin-top: 10px;
  height: 8px;
  border: 1px solid var(--hrjust-border-soft);
  background: rgba(10, 34, 59, 0.03);
  position: relative;
  overflow: hidden;
}
.hrjust-mapTip__barFill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0%;
  background: linear-gradient(90deg, rgba(174, 12, 54, 0.35), rgba(174, 12, 54, 0.85));
}

/* Loading + Note */
.hrjust-mapLoading {
  border: 1px dashed var(--hrjust-border);
  background: rgba(10, 34, 59, 0.02);
  padding: 18px;
  color: rgba(11, 31, 51, 0.72);
}

.hrjust-mapNote {
  border-top: 1px solid var(--hrjust-border-soft);
  padding: 12px 14px;
  color: rgba(11, 31, 51, 0.72);
  font-size: 13px;
  line-height: 1.6;
}
.hrjust-mapNote code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  font-size: 12px;
  color: rgba(11, 31, 51, 0.86);
}

/* Responsive */
@media (max-width: 980px) {
  .hrjust-mapPanel__head {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .hrjust-mapPanel__right {
    justify-items: start;
  }

  .hrjust-legend__bar {
    width: min(220px, 70vw);
  }

  .hrjust-mapControls {
    right: 18px;
    top: 18px;
  }
}
</style>
