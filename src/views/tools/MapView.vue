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
            <span class="accent">Interactive</span> Map
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

            <div
              class="hrjust-mapPanel"
              role="region"
              aria-label="World map: notifications per country"
            >
              <!-- Header row -->
              <div class="hrjust-mapPanel__head">
                <div class="hrjust-mapPanel__title">
                  Notifications per country
                  <span
                    class="hrjust-mapPanel__kpi"
                    aria-label="Countries with at least one notification"
                  >
                    {{ countriesWithData }} countries • {{ totalNotifications }} notifications
                  </span>
                </div>

                <div class="hrjust-mapPanel__right">
                  <div class="hrjust-mapPanel__legend" aria-label="Legend">
                    <span class="hrjust-legend__label">Low</span>
                    <span class="hrjust-legend__bar" aria-hidden="true"></span>
                    <span class="hrjust-legend__label">High</span>
                  </div>

                  <div class="hrjust-mapPanel__hint" aria-hidden="true">
                    Scroll to zoom • Drag to move • Click to view details
                  </div>
                </div>
              </div>

              <!-- Map stage -->
              <div ref="mapWrapEl" class="hrjust-mapStage">
                <!-- Controls -->
                <div class="hrjust-mapControls" role="group" aria-label="Map controls">
                  <button
                    class="hrjust-mapBtn"
                    type="button"
                    @click="zoomBy(1.18)"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                  <button
                    class="hrjust-mapBtn"
                    type="button"
                    @click="zoomBy(1 / 1.18)"
                    aria-label="Zoom out"
                  >
                    −
                  </button>
                  <button
                    class="hrjust-mapBtn hrjust-mapBtn--reset"
                    type="button"
                    @click="resetView"
                    aria-label="Reset view"
                  >
                    Reset
                  </button>
                </div>

                <!-- Selected chip (top-left, inside stage) -->
                <div
                  v-if="selectedCountryName"
                  class="hrjust-selectedChip"
                  role="status"
                  aria-live="polite"
                >
                  <div class="hrjust-selectedChip__label">Selected</div>
                  <div class="hrjust-selectedChip__name" :title="selectedCountryName">
                    {{ selectedCountryName }}
                  </div>
                  <button
                    class="hrjust-selectedChip__clear"
                    type="button"
                    @click="clearSelection"
                    aria-label="Clear selection"
                    title="Clear selection"
                  >
                    ✕
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
                      :class="{
                        'is-hasData': c.count > 0,
                        'is-selected':
                          selectedCountryName && norm(c.name) === norm(selectedCountryName),
                      }"
                      :d="c.d"
                      :fill="c.fill"
                      :data-name="c.name"
                      :data-count="c.count"
                      @pointerenter="
                        (e) => {
                          showTip(c)
                          updateTipPositionFromEvent(e)
                        }
                      "
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

                  <div class="hrjust-mapTip__hint" aria-hidden="true">Click to view details</div>
                </div>
              </div>

              <!-- DETAILS PANEL (under map) -->
              <div
                ref="detailsPanelEl"
                class="hrjust-detailsPanel"
                role="region"
                aria-label="Notification details"
              >
                <div class="hrjust-detailsHead">
                  <div class="hrjust-detailsTitle">
                    Notifications
                    <span class="hrjust-detailsKpi">
                      <template v-if="selectedCountryName">
                        {{ filteredRows.length }} shown • {{ baseTotal }} total
                      </template>
                      <template v-else>
                        {{ filteredRows.length }} shown • {{ baseTotal }} total (all countries)
                      </template>
                    </span>
                  </div>

                  <div class="hrjust-detailsRight">
                    <button
                      class="hrjust-pillBtn"
                      type="button"
                      @click="scrollToTopOfPanel"
                      aria-label="Scroll to top of notifications panel"
                      title="Scroll to top"
                    >
                      ↑ Top
                    </button>

                    <button
                      class="hrjust-pillBtn"
                      type="button"
                      @click="resetFilters"
                      aria-label="Reset filters"
                      title="Reset filters"
                    >
                      Reset filters
                    </button>

                    <button
                      class="hrjust-pillBtn hrjust-pillBtn--ghost"
                      type="button"
                      @click="clearSelection"
                      :disabled="!selectedCountryName"
                      aria-label="Clear selected country"
                      title="Clear selection"
                    >
                      Clear selection
                    </button>
                  </div>
                </div>

                <!-- Filters are ALWAYS available (selected country OR all countries) -->
                <div class="hrjust-detailsControls" aria-label="Filters">
                  <div class="hrjust-field">
                    <label class="hrjust-label" for="notifSearch">Search</label>
                    <input
                      ref="notifSearchEl"
                      id="notifSearch"
                      class="hrjust-input"
                      type="search"
                      v-model="ui.q"
                      placeholder="Country, symbol, sector, qualification, mode, measure…"
                      autocomplete="off"
                    />
                  </div>

                  <div class="hrjust-field">
                    <label class="hrjust-label" for="notifYear">Year</label>
                    <select id="notifYear" class="hrjust-select" v-model="ui.year">
                      <option value="all">All</option>
                      <option v-for="y in yearOptions" :key="`y-${y}`" :value="String(y)">
                        {{ y }}
                      </option>
                    </select>
                  </div>

                  <div class="hrjust-field">
                    <label class="hrjust-label" for="notifSector">Sector</label>
                    <select id="notifSector" class="hrjust-select" v-model="ui.sector">
                      <option value="all">All</option>
                      <option v-for="s in sectorOptions" :key="`s-${s}`" :value="s">{{ s }}</option>
                    </select>
                  </div>

                  <div class="hrjust-field">
                    <label class="hrjust-label" for="notifQual">Qualification</label>
                    <select id="notifQual" class="hrjust-select" v-model="ui.qualification">
                      <option value="all">All</option>
                      <option v-for="q in qualificationOptions" :key="`q-${q}`" :value="q">
                        {{ q }}
                      </option>
                    </select>
                  </div>

                  <div class="hrjust-field">
                    <label class="hrjust-label" for="notifMode">Mode</label>
                    <select id="notifMode" class="hrjust-select" v-model="ui.mode">
                      <option value="all">All</option>
                      <option v-for="m in modeOptions" :key="`m-${m}`" :value="m">{{ m }}</option>
                    </select>
                  </div>

                  <div class="hrjust-field">
                    <label class="hrjust-label" for="notifSort">Sort</label>
                    <select id="notifSort" class="hrjust-select" v-model="ui.sort">
                      <option value="date_desc">Date (new → old)</option>
                      <option value="date_asc">Date (old → new)</option>
                      <option value="symbol_asc">Symbol (A → Z)</option>
                      <option value="symbol_desc">Symbol (Z → A)</option>
                    </select>
                  </div>
                </div>

                <div class="hrjust-resultsWrap">
                  <div
                    v-if="!filteredRows.length"
                    class="hrjust-empty"
                    role="status"
                    aria-live="polite"
                  >
                    <div class="hrjust-empty__icon" aria-hidden="true">◎</div>
                    <div class="hrjust-empty__title">No results</div>
                    <div class="hrjust-empty__text">
                      Try clearing search/filters to display notifications
                      <template v-if="selectedCountryName">for {{ selectedCountryName }}.</template>
                      <template v-else>for all countries.</template>
                    </div>
                    <button class="hrjust-pillBtn" type="button" @click="resetFilters">
                      Reset filters
                    </button>
                  </div>

                  <div v-else class="hrjust-cards" aria-label="Notification list">
                    <article
                      v-for="(n, idx) in filteredRows"
                      :key="`${n.member || 'm'}-${n.notification_symbol || 'sym'}-${n.communication_date_iso || ''}-${idx}`"
                      class="hrjust-card"
                    >
                      <div class="hrjust-card__top">
                        <div class="hrjust-card__symbol">
                          <div class="hrjust-card__label">Symbol</div>
                          <!-- Country info BEFORE symbol -->
                          <div class="hrjust-card__value">
                            {{ formatSymbolWithCountry(n) }}
                          </div>
                        </div>

                        <div class="hrjust-card__date">
                          <div class="hrjust-card__label">Date</div>
                          <div class="hrjust-card__value">
                            {{ formatDate(n.communication_date_iso || n.communication_date) }}
                          </div>
                        </div>

                        <div class="hrjust-card__year">
                          <div class="hrjust-card__label">Year</div>
                          <div class="hrjust-card__value">{{ n.year || '—' }}</div>
                        </div>
                      </div>

                      <div class="hrjust-card__grid">
                        <div class="hrjust-kv">
                          <div class="hrjust-k">Sector</div>
                          <div class="hrjust-v">{{ n.sector || '—' }}</div>
                        </div>
                        <div class="hrjust-kv">
                          <div class="hrjust-k">Qualification</div>
                          <div class="hrjust-v">{{ n.qualification || '—' }}</div>
                        </div>
                        <div class="hrjust-kv">
                          <div class="hrjust-k">Mode</div>
                          <div class="hrjust-v">{{ n.mode || '—' }}</div>
                        </div>
                        <div class="hrjust-kv">
                          <div class="hrjust-k">Coverage</div>
                          <div class="hrjust-v">{{ n.coverage || '—' }}</div>
                        </div>
                      </div>

                      <div
                        class="hrjust-card__measure"
                        :class="{ 'is-missing': !safeStr(n.type_of_measure) }"
                      >
                        <div class="hrjust-k">Type of measure</div>
                        <div class="hrjust-v" :class="{ 'is-muted': !safeStr(n.type_of_measure) }">
                          {{ safeStr(n.type_of_measure) || 'Not specified' }}
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>

              <div class="hrjust-mapNote" role="note">
                Data last updated on <strong>Friday, 13 February 2026</strong>. Hover a country to
                see its notification count.
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
const detailsPanelEl = ref(null)
const notifSearchEl = ref(null)

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

/** Full data */
const rowsByMember = ref(new Map()) // Map<geoName, rows[]>
const selectedCountryName = ref('')

/* =========================
   Details UI state
   ========================= */
const ui = reactive({
  q: '',
  year: 'all',
  sector: 'all',
  qualification: 'all',
  mode: 'all',
  sort: 'date_desc',
})

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

/* Click-vs-drag handling */
const TAP_THRESHOLD_PX = 6

const tap = reactive({
  on: false,
  pointerId: null,
  sx: 0,
  sy: 0,
  countryName: '',
  countryCount: 0,
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

function displayMember(row) {
  const raw = String(row?.member ?? '').trim()
  return raw ? toGeoName(raw) : ''
}

function formatSymbolWithCountry(row) {
  const country = displayMember(row)
  const symbol = String(row?.notification_symbol ?? '').trim() || '—'
  return country ? `${country} • ${symbol}` : symbol
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

function safeStr(v) {
  return String(v ?? '').trim()
}

function formatDate(raw) {
  const s = safeStr(raw)
  if (!s) return '—'
  const d = new Date(s)

  // If it's a valid date, show "15 Feb" (no year)
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' })
  }

  // Fallback: try to strip year if the string looks like YYYY-MM-DD
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) {
    const mm = Number(m[2])
    const dd = m[3]
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    return `${dd} ${months[mm - 1] || ''}`.trim()
  }

  return s
}

function resetFilters() {
  ui.q = ''
  ui.year = 'all'
  ui.sector = 'all'
  ui.qualification = 'all'
  ui.mode = 'all'
  ui.sort = 'date_desc'
}

function clearSelection() {
  selectedCountryName.value = ''
  resetFilters()
}

/**
 * More precise scroll:
 * - Uses a ref (not querySelector)
 * - Applies fixed header offset (CSS var --header-h)
 * - Adds a small breathing space
 */
function getHeaderOffsetPx() {
  const root = document.documentElement
  const raw = getComputedStyle(root).getPropertyValue('--header-h')?.trim() || ''
  const n = Number(String(raw).replace('px', '').trim())
  // Fallback if var isn't set or isn't numeric
  return Number.isFinite(n) && n > 0 ? n : 0
}

function scrollToTopOfPanel() {
  const el = detailsPanelEl.value
  if (!el) return

  const header = getHeaderOffsetPx()
  const gap = 14 // align with your panel padding rhythm
  const rect = el.getBoundingClientRect()
  const top = window.scrollY + rect.top - header - gap

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

/** Optional: after selecting a country, scroll + focus for a crisp UX */
async function scrollAndFocusDetails() {
  await nextTick()
  scrollToTopOfPanel()
  requestAnimationFrame(() => {
    scrollToTopOfPanel()
    notifSearchEl.value?.focus?.({ preventScroll: true })
  })
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
    return coordinates.map((poly) => poly.map((ring) => ringToPath(ring, w, h)).join(' ')).join(' ')
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

  const byMemberCount = new Map()
  const byMemberRows = new Map()
  let total = 0

  for (const r of rows) {
    const name = toGeoName(r?.member)
    if (!name) continue

    total++
    byMemberCount.set(name, (byMemberCount.get(name) || 0) + 1)

    if (!byMemberRows.has(name)) byMemberRows.set(name, [])
    byMemberRows.get(name).push(r)
  }

  // Sort each member list by date desc (prefer ISO)
  for (const [k, arr] of byMemberRows.entries()) {
    arr.sort((a, b) => {
      const da = safeStr(b?.communication_date_iso || b?.communication_date)
      const db = safeStr(a?.communication_date_iso || a?.communication_date)
      return da.localeCompare(db)
    })
  }

  totalNotifications.value = total
  countriesWithData.value = Array.from(byMemberCount.values()).filter((v) => v > 0).length
  maxCount.value = Math.max(0, ...Array.from(byMemberCount.values()))
  rowsByMember.value = byMemberRows

  return byMemberCount
}

async function loadWorldGeoJSON() {
  const url = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load world geojson (${res.status})`)
  return await res.json()
}

async function buildMap() {
  const [byMember, world] = await Promise.all([loadNotifications(), loadWorldGeoJSON()])
  const feats = Array.isArray(world?.features) ? world.features : []

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
  const w = 260
  const h = 110

  return {
    x: clamp(x, 10, Math.max(10, r.width - w - 10)),
    y: clamp(y, 10, Math.max(10, r.height - h - 10)),
  }
}

function showTip(country) {
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
   Details computed
   - If no country selected => show ALL rows
   - If a country selected => show that country's rows
   ========================= */
const allRows = computed(() => {
  const out = []
  for (const [, arr] of rowsByMember.value.entries()) {
    if (Array.isArray(arr) && arr.length) out.push(...arr)
  }
  // Keep a consistent baseline sort: date desc
  out.sort((a, b) => {
    const da = safeStr(b?.communication_date_iso || b?.communication_date)
    const db = safeStr(a?.communication_date_iso || a?.communication_date)
    return da.localeCompare(db)
  })
  return out
})

const selectedRows = computed(() => {
  const name = selectedCountryName.value
  if (!name) return []

  const direct = rowsByMember.value.get(name)
  if (direct) return direct

  const n = norm(name)
  for (const [k, arr] of rowsByMember.value.entries()) {
    if (norm(k) === n) return arr
  }
  return []
})

const baseRows = computed(() => {
  return selectedCountryName.value ? selectedRows.value : allRows.value
})

const baseTotal = computed(() => baseRows.value.length)

function uniqSorted(list, { numeric = false, desc = false } = {}) {
  const set = new Set()
  for (const v of list) {
    const s = safeStr(v)
    if (!s) continue
    set.add(s)
  }
  const arr = Array.from(set)
  arr.sort((a, b) => {
    if (numeric) {
      const na = Number(a)
      const nb = Number(b)
      return desc ? nb - na : na - nb
    }
    return a.localeCompare(b)
  })
  if (desc && !numeric) arr.reverse()
  return arr
}

const yearOptions = computed(() => {
  const ys = baseRows.value.map((r) => r?.year).filter(Boolean)
  return uniqSorted(ys, { numeric: true, desc: true })
})
const sectorOptions = computed(() =>
  uniqSorted(baseRows.value.map((r) => r?.sector).filter(Boolean)),
)
const qualificationOptions = computed(() =>
  uniqSorted(baseRows.value.map((r) => r?.qualification).filter(Boolean)),
)
const modeOptions = computed(() => uniqSorted(baseRows.value.map((r) => r?.mode).filter(Boolean)))

function matchesQuery(row, q) {
  const s = norm(q)
  if (!s) return true

  const hay = [
    displayMember(row),
    row?.notification_symbol,
    row?.sector,
    row?.qualification,
    row?.mode,
    row?.type_of_measure,
    row?.coverage,
    row?.communication_date_iso,
    row?.communication_date,
    row?.year,
    row?.month,
  ]
    .map((v) => norm(v))
    .join(' • ')

  return hay.includes(s)
}

function parseDateForSort(row) {
  return safeStr(row?.communication_date_iso || row?.communication_date)
}

const filteredRows = computed(() => {
  let arr = [...baseRows.value]

  if (ui.year !== 'all') arr = arr.filter((r) => String(r?.year || '') === String(ui.year))
  if (ui.sector !== 'all') arr = arr.filter((r) => safeStr(r?.sector) === ui.sector)
  if (ui.qualification !== 'all')
    arr = arr.filter((r) => safeStr(r?.qualification) === ui.qualification)
  if (ui.mode !== 'all') arr = arr.filter((r) => safeStr(r?.mode) === ui.mode)
  if (safeStr(ui.q)) arr = arr.filter((r) => matchesQuery(r, ui.q))

  const sort = ui.sort
  arr.sort((a, b) => {
    if (sort === 'date_desc') return parseDateForSort(b).localeCompare(parseDateForSort(a))
    if (sort === 'date_asc') return parseDateForSort(a).localeCompare(parseDateForSort(b))
    if (sort === 'symbol_asc')
      return safeStr(a?.notification_symbol).localeCompare(safeStr(b?.notification_symbol))
    if (sort === 'symbol_desc')
      return safeStr(b?.notification_symbol).localeCompare(safeStr(a?.notification_symbol))
    return 0
  })

  return arr
})

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
  view.tx = cx - k * (cx - view.tx)
  view.ty = cy - k * (cy - view.ty)
  view.scale = nextScale
}

function zoomBy(factor) {
  const cx = viewBox.w * 0.5
  const cy = viewBox.h * 0.5
  zoomAtPoint(view.scale * factor, cx, cy)
}

function resetView() {
  view.scale = 1
  view.tx = 0
  view.ty = 0
}

function countryHasData(name) {
  if (!safeStr(name)) return false

  const direct = rowsByMember.value.get(name)
  if (direct && direct.length) return true

  const n = norm(name)
  for (const [k, arr] of rowsByMember.value.entries()) {
    if (norm(k) === n) return Array.isArray(arr) && arr.length > 0
  }
  return false
}

/* =========================
   Wheel zoom + Pointer pan (touch-friendly)
   + Click selection that works (tap vs drag threshold)
   ========================= */
function onWheel(e) {
  e.preventDefault()
  if (!mapWrapEl.value) return

  const zoomIn = e.deltaY < 0
  const factor = zoomIn ? 1.12 : 1 / 1.12

  const p = screenToSvgPoint(e.clientX, e.clientY)
  zoomAtPoint(view.scale * factor, p.x, p.y)

  updateTipPositionFromEvent(e)
}

function onPointerDown(e) {
  const isCountry = e.target?.classList?.contains('hrjust-country')

  if (isCountry) {
    tap.on = true
    tap.pointerId = e.pointerId
    tap.sx = e.clientX
    tap.sy = e.clientY

    tap.countryName = e.target?.dataset?.name || ''
    tap.countryCount = Number(e.target?.dataset?.count || 0)
    return
  }

  drag.on = true
  drag.pointerId = e.pointerId

  drag.sx = e.clientX
  drag.sy = e.clientY
  drag.stx = view.tx
  drag.sty = view.ty

  hideTip()
  e.currentTarget?.setPointerCapture?.(e.pointerId)
}

function onPointerMove(e) {
  updateTipPositionFromEvent(e)

  if (tap.on && tap.pointerId === e.pointerId) {
    const dx = e.clientX - tap.sx
    const dy = e.clientY - tap.sy
    const dist = Math.hypot(dx, dy)

    if (dist > TAP_THRESHOLD_PX) {
      tap.on = false
      tap.pointerId = null
      tap.countryName = ''

      drag.on = true
      drag.pointerId = e.pointerId
      drag.sx = e.clientX
      drag.sy = e.clientY
      drag.stx = view.tx
      drag.sty = view.ty

      hideTip()
      e.currentTarget?.setPointerCapture?.(e.pointerId)
    } else {
      return
    }
  }

  if (!drag.on || drag.pointerId !== e.pointerId) return
  const wrap = mapWrapEl.value
  if (!wrap) return
  const r = wrap.getBoundingClientRect()

  const dx = ((e.clientX - drag.sx) / r.width) * viewBox.w
  const dy = ((e.clientY - drag.sy) / r.height) * viewBox.h

  view.tx = drag.stx + dx
  view.ty = drag.sty + dy
}

async function onPointerUp(e) {
  if (tap.on && tap.pointerId === e.pointerId) {
    const name = tap.countryName
    const hasData = tap.countryCount > 0 && countryHasData(name)

    tap.on = false
    tap.pointerId = null
    tap.countryName = ''
    tap.countryCount = 0

    if (name && hasData) {
      selectedCountryName.value = name
      resetFilters()
      await scrollAndFocusDetails()
    }
    return
  }

  if (drag.pointerId !== e.pointerId) return
  drag.on = false
  drag.pointerId = null
}

function onPointerLeave(e) {
  hideTip()

  tap.on = false
  tap.pointerId = null
  tap.countryName = ''

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

  --hrjust-field: rgba(10, 34, 59, 0.04);
  --hrjust-field-border: rgba(10, 34, 59, 0.1);
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
  touch-action: none;
  cursor: grab;
}
.hrjust-mapSvg.is-dragging {
  cursor: grabbing;
}

/* Countries */
.hrjust-country {
  stroke: rgba(11, 31, 51, 0.12);
  stroke-width: 1;
  transition:
    filter 140ms ease,
    opacity 140ms ease,
    stroke 140ms ease;
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

.hrjust-country.is-selected {
  stroke: rgba(0, 45, 71, 0.62);
  stroke-width: 1.35;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.12));
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
  transition:
    background 140ms ease,
    border-color 140ms ease,
    transform 140ms ease;
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

/* Selected chip */
.hrjust-selectedChip {
  position: absolute;
  left: 22px;
  top: 22px;
  z-index: 6;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid var(--hrjust-border-soft);
  background: #fff;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
}

.hrjust-selectedChip__label {
  font-weight: 950;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-size: 10px;
  color: rgba(11, 31, 51, 0.55);
}

.hrjust-selectedChip__name {
  font-weight: 950;
  color: var(--hrjust-accent-2);
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hrjust-selectedChip__clear {
  appearance: none;
  border: 1px solid var(--hrjust-border-soft);
  background: rgba(10, 34, 59, 0.03);
  border-radius: 0;
  padding: 4px 8px;
  cursor: pointer;
  font-weight: 950;
  color: rgba(11, 31, 51, 0.72);
}
.hrjust-selectedChip__clear:hover {
  background: rgba(10, 34, 59, 0.05);
}

/* Tooltip — improved display + non-blocking */
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

/* =========================
   DETAILS PANEL (modern, ergonomic)
   ========================= */
.hrjust-detailsPanel {
  border-top: 1px solid var(--hrjust-border-soft);
  background: #fff;
  padding: 14px;
}

.hrjust-detailsHead {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: start;
}

.hrjust-detailsTitle {
  font-weight: 950;
  color: var(--hrjust-text);
  letter-spacing: -0.01em;
  display: grid;
  gap: 6px;
}

.hrjust-detailsKpi {
  font-weight: 750;
  font-size: 12.5px;
  color: var(--hrjust-muted);
}

.hrjust-detailsRight {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: end;
}

.hrjust-pillBtn {
  appearance: none;
  border: 1px solid var(--hrjust-border-soft);
  background: rgba(10, 34, 59, 0.03);
  border-radius: 0;
  padding: 8px 10px;
  font-weight: 950;
  color: rgba(11, 31, 51, 0.78);
  cursor: pointer;
  transition:
    background 140ms ease,
    transform 140ms ease,
    border-color 140ms ease;
}
.hrjust-pillBtn:hover {
  background: rgba(10, 34, 59, 0.05);
  border-color: var(--hrjust-border);
  transform: translateY(-1px);
}
.hrjust-pillBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
.hrjust-pillBtn--ghost {
  background: #fff;
}

.hrjust-detailsControls {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1.6fr repeat(5, 1fr);
  gap: 10px;
  align-items: end;
}

.hrjust-field {
  display: grid;
  gap: 6px;
}

.hrjust-label {
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-size: 10px;
  color: rgba(11, 31, 51, 0.55);
}

.hrjust-input,
.hrjust-select {
  width: 100%;
  border: 1px solid var(--hrjust-field-border);
  background: var(--hrjust-field);
  border-radius: 0;
  padding: 10px 10px;
  font-weight: 750;
  color: rgba(11, 31, 51, 0.88);
  outline: none;
}
.hrjust-input:focus,
.hrjust-select:focus {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
  background: rgba(10, 34, 59, 0.03);
}

.hrjust-resultsWrap {
  margin-top: 14px;
}

/* Empty states */
.hrjust-empty {
  border: 1px dashed var(--hrjust-border);
  background: rgba(10, 34, 59, 0.02);
  padding: 18px;
  display: grid;
  gap: 8px;
  align-content: start;
}

.hrjust-empty__icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid var(--hrjust-border-soft);
  background: #fff;
  font-weight: 950;
  color: rgba(11, 31, 51, 0.7);
}
.hrjust-empty__title {
  font-weight: 950;
  color: rgba(11, 31, 51, 0.88);
}
.hrjust-empty__text {
  color: rgba(11, 31, 51, 0.62);
  font-weight: 650;
  line-height: 1.6;
}

/* Cards list */
.hrjust-cards {
  display: grid;
  gap: 10px;
}

.hrjust-card {
  border: 1px solid var(--hrjust-border-soft);
  background: #fff;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.06);
  padding: 12px;
}

.hrjust-card__top {
  display: grid;
  grid-template-columns: 1.4fr 1fr 120px;
  gap: 10px;
  align-items: start;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--hrjust-border-soft);
}

.hrjust-card__label {
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-size: 10px;
  color: rgba(11, 31, 51, 0.55);
}
.hrjust-card__value {
  font-weight: 950;
  color: rgba(11, 31, 51, 0.9);
  margin-top: 6px;
  word-break: break-word;
}

.hrjust-card__grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.hrjust-v.is-muted {
  color: rgba(11, 31, 51, 0.56);
}

.hrjust-kv {
  display: grid;
  gap: 6px;
  padding: 10px;
  background: rgba(10, 34, 59, 0.03);
  border: 1px solid var(--hrjust-border-soft);
}

.hrjust-k {
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-size: 10px;
  color: rgba(11, 31, 51, 0.55);
}

.hrjust-v {
  font-weight: 800;
  color: rgba(11, 31, 51, 0.86);
  line-height: 1.45;
}

.hrjust-card__measure {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid rgba(174, 12, 54, 0.18);
  background: rgba(174, 12, 54, 0.06);
}

/* Responsive */
@media (max-width: 1200px) {
  .hrjust-detailsControls {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
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

  .hrjust-selectedChip {
    left: 18px;
    top: 18px;
  }

  .hrjust-card__top {
    grid-template-columns: 1fr;
  }
  .hrjust-card__grid {
    grid-template-columns: 1fr;
  }
}

.hrjust-card__measure.is-missing {
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: rgba(10, 34, 59, 0.03);
}
</style>
