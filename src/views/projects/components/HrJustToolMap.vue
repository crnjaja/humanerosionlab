<template>
  <div class="hrjust-content hrjust-map">
    <header class="hrjust-content__head"></header>

    <div class="hrjust-tool hrjust-tool--map">
      <div class="hrjust-tool__head">
        <div class="hrjust-tool__titleWrap">
          <span class="hrjust-tool__icon" aria-hidden="true">i</span>
          <h4 class="hrjust-tool__title">Worldwide cases visualization</h4>
        </div>

        <!-- ✅ Legend removed: simple note instead -->
        <p class="hrjust-tool__note">
          Note: Click a country to open its case list, then select a case to view details below. Map
          is zoomable. <span class="hrjust-accentText">Blue countries</span> are
          <strong>Core Case Countries</strong>.
        </p>

        <!-- Debug-friendly status -->
        <p v-if="isLoading" class="hrjust-map__status">Loading map…</p>
        <p v-else-if="loadError" class="hrjust-map__status hrjust-map__status--error">
          Map failed to load: {{ loadError }}
        </p>
      </div>

      <!-- Stage -->
      <div class="hrjust-map__stage">
        <div class="hrjust-map__col">
          <div ref="mapEl" class="hrjust-map__map" aria-label="Interactive world map"></div>
        </div>
      </div>

      <!-- Case details output -->
      <div ref="caseEl" class="hrjust-map__case" aria-live="polite"></div>
    </div>

    <!-- Popup -->
    <div v-show="isPopupOpen" class="hrjust-map__popupOverlay" @click.self="closePopup">
      <div class="hrjust-map__popup" role="dialog" aria-modal="true" aria-label="Cases list">
        <button class="hrjust-map__popupClose" type="button" @click="closePopup" aria-label="Close">
          ×
        </button>

        <div class="hrjust-map__popupHeader">{{ popupHeader }}</div>

        <ul class="hrjust-map__caseList" role="list">
          <li
            v-for="c in popupCases"
            :key="c"
            class="hrjust-map__caseItem"
            role="button"
            tabindex="0"
            @click="showCase(c)"
            @keydown.enter="showCase(c)"
          >
            <span class="hrjust-map__caseItemIcon" aria-hidden="true">⚖</span>
            <span class="hrjust-map__caseItemTitle">{{ c }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Tooltip -->
    <div ref="tooltipEl" class="hrjust-map__tooltip" role="tooltip" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as d3 from 'd3'

/* =========================
   Refs
   ========================= */
const mapEl = ref(null)
const caseEl = ref(null)
const tooltipEl = ref(null)

/* =========================
   Status
   ========================= */
const isLoading = ref(true)
const loadError = ref('')

/* =========================
   Popup state
   ========================= */
const isPopupOpen = ref(false)
const popupHeader = ref('')
const popupCases = ref([])

function closePopup() {
  isPopupOpen.value = false
}

/* =========================
   Data state
   ========================= */
const coreCountries = ['Sweden', 'Finland', 'Ukraine', 'India', 'Taiwan']
const coreColor = '#002d47'

let svg = null
let g = null
let zoomBehavior = null

let respondentCountries = new Set()
let countryCaseMap = new Map()
let caseDetailsMap = new Map()

function htmlEscape(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatJustifications(input) {
  if (!input)
    return 'This case lacks guiding document or explicit argument from the state concerning the allegations made.'
  return input
    .split(',')
    .map((j) => j.trim().toLowerCase())
    .map((j) => j.charAt(0).toUpperCase() + j.slice(1))
    .join(', ')
}

function showTooltip(html, pageX, pageY) {
  const el = tooltipEl.value
  if (!el) return
  el.style.display = 'block'
  el.innerHTML = html
  el.style.left = `${pageX + 15}px`
  el.style.top = `${pageY + 15}px`
}

function moveTooltip(pageX, pageY) {
  const el = tooltipEl.value
  if (!el || el.style.display !== 'block') return
  el.style.left = `${pageX + 15}px`
  el.style.top = `${pageY + 15}px`
}

function hideTooltip() {
  const el = tooltipEl.value
  if (!el) return
  el.style.display = 'none'
}

function showCase(caseName) {
  const d = caseDetailsMap.get(caseName)
  if (!d || !caseEl.value) return

  const proc = []
  if (d.submissionYear)
    proc.push(
      `<div class="hrjust-case__highlight"><strong>Submission Year:</strong> ${htmlEscape(d.submissionYear)}</div>`,
    )
  if (d.decisionDate)
    proc.push(
      `<div class="hrjust-case__highlight"><strong>Decision Date:</strong> ${htmlEscape(d.decisionDate)}</div>`,
    )
  if (d.courtType)
    proc.push(
      `<div class="hrjust-case__highlight"><strong>Court Type:</strong> ${htmlEscape(d.courtType)}</div>`,
    )
  if (d.status)
    proc.push(
      `<div class="hrjust-case__highlight"><strong>Proceedings Status:</strong> ${htmlEscape(d.status)}</div>`,
    )

  const refs = []
  if (d.externalLink) {
    refs.push(`
      <div class="hrjust-case__highlight">
        <strong>External Case Link:</strong>
        <code class="hrjust-case__code">${htmlEscape(String(d.externalLink).trim())}</code>
      </div>
    `)
  }
  if (d.literatureReference) {
    refs.push(`
      <div class="hrjust-case__highlight">
        <strong>Literature Reference:</strong>
        <code class="hrjust-case__code">${htmlEscape(String(d.literatureReference).trim())}</code>
      </div>
    `)
  }

  caseEl.value.innerHTML = `
    <div class="hrjust-case">
      <div class="hrjust-case__title">
        ${htmlEscape(d.caseName || 'Untitled')},
        <span class="hrjust-case__country">${htmlEscape(d.country || 'Unknown')}</span>
      </div>

      <div class="hrjust-case__section">
        <div class="hrjust-case__sectionTitle"><span class="hrjust-case__sectionIcon">📘</span> Summary</div>
        <div class="hrjust-case__highlight">${htmlEscape(d.summary || 'No summary provided.')}</div>
      </div>

      <div class="hrjust-case__divider"></div>

      <div class="hrjust-case__section">
        <div class="hrjust-case__sectionTitle"><span class="hrjust-case__sectionIcon">👥</span> Parties involved</div>
        <div class="hrjust-case__grid">
          <div class="hrjust-case__party">
            <div class="hrjust-case__partyRole">Claimant</div>
            <div class="hrjust-case__partyType">${htmlEscape(d.claimantType || 'N/A')}</div>
            <div class="hrjust-case__partyName">${htmlEscape(d.claimant || 'N/A')}</div>
          </div>
          <div class="hrjust-case__party">
            <div class="hrjust-case__partyRole">Respondent</div>
            <div class="hrjust-case__partyType">${htmlEscape(d.respondentType || 'N/A')}</div>
            <div class="hrjust-case__partyName">${htmlEscape(d.respondent || 'N/A')}</div>
          </div>
        </div>
      </div>

      ${
        proc.length
          ? `
        <div class="hrjust-case__divider"></div>
        <div class="hrjust-case__section">
          <div class="hrjust-case__sectionTitle"><span class="hrjust-case__sectionIcon">⚖</span> Proceedings details</div>
          <div class="hrjust-case__grid">${proc.join('')}</div>
        </div>
      `
          : ''
      }

      <div class="hrjust-case__divider"></div>
      <div class="hrjust-case__section">
        <div class="hrjust-case__sectionTitle"><span class="hrjust-case__sectionIcon">🤝</span> Civil society engagement</div>
        <div class="hrjust-case__highlight">${htmlEscape(d.civilSociety || 'N/A')}</div>
      </div>

      <div class="hrjust-case__divider"></div>
      <div class="hrjust-case__section">
        <div class="hrjust-case__sectionTitle"><span class="hrjust-case__sectionIcon">⚖️</span> Human rights</div>
        <div class="hrjust-case__highlight"><strong>Catalogue:</strong> ${htmlEscape(d.rightsCatalogue || 'N/A')}</div>
        <div class="hrjust-case__highlight"><strong>Violated Rights:</strong> ${htmlEscape(d.humanRightsViolated || 'N/A')}</div>
      </div>

      <div class="hrjust-case__divider"></div>
      <div class="hrjust-case__section">
        <div class="hrjust-case__sectionTitle"><span class="hrjust-case__sectionIcon">🧩</span> Typology</div>
        <div class="hrjust-case__highlight"><strong>Justification Typology:</strong> ${htmlEscape(formatJustifications(d.justification))}</div>
        ${d.subtypology ? `<div class="hrjust-case__highlight"><strong>Subtypology:</strong> ${htmlEscape(d.subtypology)}</div>` : ''}
      </div>

      ${
        refs.length
          ? `
        <div class="hrjust-case__divider"></div>
        <div class="hrjust-case__section">
          <div class="hrjust-case__sectionTitle"><span class="hrjust-case__sectionIcon">📚</span> References</div>
          ${refs.join('')}
        </div>
      `
          : ''
      }
    </div>
  `

  closePopup()
  caseEl.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  setTimeout(() => window.scrollBy({ top: -60, behavior: 'smooth' }), 450)
}

async function buildMap() {
  isLoading.value = true
  loadError.value = ''

  try {
    if (!mapEl.value) throw new Error('Map container ref is null.')

    // Clear previous
    d3.select(mapEl.value).selectAll('*').remove()
    respondentCountries = new Set()
    countryCaseMap = new Map()
    caseDetailsMap = new Map()

    // Create SVG
    svg = d3
      .select(mapEl.value)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 1400 700')
      .attr('preserveAspectRatio', 'xMidYMid meet')

    const projection = d3
      .geoMercator()
      .scale(165)
      .translate([1400 / 2, 700 / 1.5])
    const path = d3.geoPath(projection)
    g = svg.append('g')

    // IMPORTANT:
    // If CORS blocks this in dev, replace dbURL/worldURL with proxy paths (see below).
    const worldURL = '/world-geo/holtzy/D3-graph-gallery/master/DATA/world.geojson'
    const dbURL = '/hrjust-json/includes/JSON/climate_cases2_new.json'

    const [worldData, db] = await Promise.all([d3.json(worldURL), d3.json(dbURL)])

    if (!worldData?.features?.length) throw new Error('World GeoJSON loaded but has no features.')
    if (!Array.isArray(db)) throw new Error('Cases JSON loaded but is not an array.')

    const table = db.find((d) => d.type === 'table' && d.name === 'climate_cases2')
    const rows = table?.data ?? []

    if (!rows.length) throw new Error('climate_cases2 table not found or empty in JSON.')

    rows.forEach((row) => {
      const country = row.respondent_country
      const caseName = row.case_name
      if (!country || !caseName) return

      if (!countryCaseMap.has(country)) countryCaseMap.set(country, [])
      countryCaseMap.get(country).push(caseName)

      respondentCountries.add(country)

      caseDetailsMap.set(caseName, {
        country,
        caseName,
        claimant: row.claimant,
        claimantType: row.claimant_type,
        respondent: row.respondent,
        respondentType: row.respondent_type,
        summary: row.summary,
        courtType: row.court_type,
        status: row.proceedings_status,
        submissionYear: row.submission_year,
        decisionDate: row.decision_date,
        civilSociety: row.civil_society_engagement,
        rightsCatalogue: row.rights_catalogue,
        humanRightsViolated: row.humanrights_violated,
        justification: row.justification_typology,
        subtypology: row.subtypology,
        externalLink: row.external_case_link,
        literatureReference: row.literature_reference,
      })
    })

    const maxCases = Math.max(1, ...Array.from(countryCaseMap.values()).map((c) => c.length))
    const colorScale = d3.scaleLinear().domain([1, maxCases]).range(['#fdd', '#58001c'])

    g.selectAll('path')
      .data(worldData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'hrjust-map__country')
      .attr('fill', (d) => {
        const name = d.properties.name
        if (coreCountries.includes(name)) return coreColor
        const cases = countryCaseMap.get(name)
        return cases ? colorScale(cases.length) : '#E6E6E6'
      })
      .on('mouseover', (event, d) => {
        const name = d.properties.name
        const cases = countryCaseMap.get(name)
        if (!cases) return
        const star = coreCountries.includes(name) ? ' ⭐' : ''
        const plural = cases.length > 1 ? 's' : ''
        showTooltip(
          `<strong>${htmlEscape(name)}${star}</strong><br>${cases.length} case${plural}`,
          event.pageX,
          event.pageY,
        )
      })
      .on('mousemove', (event) => moveTooltip(event.pageX, event.pageY))
      .on('mouseout', hideTooltip)
      .on('click', (event, d) => {
        const name = d.properties.name
        if (!respondentCountries.has(name)) return

        const cases = countryCaseMap.get(name) ?? []
        popupHeader.value = `${name} — ${cases.length} case${cases.length > 1 ? 's' : ''}`
        popupCases.value = cases
        isPopupOpen.value = true
      })

    // Zoom
    zoomBehavior = d3
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', ({ transform }) => g.attr('transform', transform))

    svg.call(zoomBehavior)
  } catch (e) {
    console.error(e)
    loadError.value = e?.message || String(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await buildMap()
})

onBeforeUnmount(() => {
  hideTooltip()
  try {
    if (svg) svg.on('.zoom', null)
  } catch {}
})
</script>

<style scoped>
.hrjust-map {
  /* ✅ Accent variable requested */
  --accent: #d84b8b;

  --ig-border: var(--hrjust-border, rgba(10, 34, 59, 0.12));
  --ig-border-soft: var(--hrjust-border-soft, rgba(10, 34, 59, 0.08));
  --ig-text: var(--hrjust-text, rgba(11, 31, 51, 0.92));
  --ig-muted: var(--hrjust-muted, rgba(11, 31, 51, 0.62));
  --ig-hover: var(--hrjust-hover, rgba(10, 34, 59, 0.035));

  /* ✅ Use --accent for all “colored text” accents */
  --ig-accent: var(--hrjust-accent-3);

  /* keep the blue for core countries */
  --ig-accent-2: var(--hrjust-accent-2, #002d47);
}

.hrjust-tool--map {
  border: 1px solid var(--ig-border);
  background: #fff;
  border-radius: 0;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
}

.hrjust-tool__head {
  display: grid;
  gap: 8px;
  margin-bottom: 14px;
}

.hrjust-tool__titleWrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.hrjust-tool__title {
  margin: 0;
}

.hrjust-tool__icon {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  background: var(--ig-accent);
  color: #fff;
  font-weight: 900;
  font-size: 13px;
  border-radius: 50%;
}

.hrjust-tool__note {
  margin: 0;
  font-size: 13px;
  color: rgba(11, 31, 51, 0.78);
}

.hrjust-accentText {
  color: var(--ig-accent-3);
  font-weight: 900;
}

.hrjust-map__status {
  font-size: 13px;
  color: rgba(11, 31, 51, 0.75);
  margin: 2px 0 0;
}
.hrjust-map__status--error {
  color: var(--ig-accent);
  font-weight: 900;
}

.hrjust-map__stage {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.hrjust-map__col {
  display: grid;
  gap: 12px;
}

/* ✅ GUARANTEED HEIGHT: without this you can get “nothing visible” */
.hrjust-map__map {
  height: clamp(420px, 55vh, 560px);
  min-height: 420px;
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  overflow: hidden;
}

/* Countries (needs :deep because SVG nodes are created by d3) */
:deep(.hrjust-map__country) {
  stroke: rgba(0, 0, 0, 0.15);
  stroke-width: 0.7;
  cursor: pointer;
  transition: filter 120ms ease;
}
:deep(.hrjust-map__country:hover) {
  filter: brightness(0.95);
}

/* Tooltip */
.hrjust-map__tooltip {
  position: absolute;
  display: none;
  z-index: 9999;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.18);
  padding: 6px 10px;
  font-size: 12.5px;
  pointer-events: none;
  border-radius: 0;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.hrjust-map__case {
  margin-top: 14px;
}

/* Case card (innerHTML) -> needs :deep */
:deep(.hrjust-case) {
  border: 1px solid var(--ig-border);
  background: #fff;
  border-radius: 0;
  padding: 14px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
}
:deep(.hrjust-case__title) {
  font-size: 18px;
  font-weight: 950;
  /* ✅ “Colored text” -> accent */
  color: var(--ig-accent);
  text-align: center;
  margin-bottom: 14px;
}
:deep(.hrjust-case__country) {
  /* keep country in accent too, for consistency */
  color: var(--ig-accent);
}
:deep(.hrjust-case__sectionTitle) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 950;
  /* ✅ headings in accent */
  color: var(--ig-accent);
  margin-bottom: 10px;
}
:deep(.hrjust-case__grid) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 14px;
}
:deep(.hrjust-case__party) {
  background: rgba(10, 34, 59, 0.03);
  border-left: 1px solid var(--ig-accent);
  padding: 12px;
}
:deep(.hrjust-case__partyRole) {
  font-weight: 950;
  /* ✅ role label in accent */
  color: var(--ig-accent);
}
:deep(.hrjust-case__partyType) {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
  font-style: italic;
}
:deep(.hrjust-case__partyName) {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.78);
}
:deep(.hrjust-case__highlight) {
  background: rgba(10, 34, 59, 0.03);
  border-left: 1px solid var(--ig-accent);
  padding: 10px 12px;
  color: rgba(0, 0, 0, 0.78);
  font-size: 13.5px;
  line-height: 1.55;
}
:deep(.hrjust-case__divider) {
  border-bottom: 1px solid color-mix(in srgb, var(--ig-accent) 35%, transparent);
  margin: 14px 0;
}
:deep(.hrjust-case__code) {
  margin-left: 10px;
  word-break: break-all;
  font-size: 12.5px;
  background: rgba(0, 0, 0, 0.06);
  padding: 2px 6px;
  border-radius: 0;
  /* ✅ code text in accent (requested) */
  color: var(--ig-accent);
}

/* Popup */
.hrjust-map__popupOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
  z-index: 3000;
  display: grid;
  place-items: center;
  padding: 18px;
}
.hrjust-map__popup {
  width: min(820px, 92vw);
  max-height: 72vh;
  overflow: auto;
  background: #fff;
  border: 1px solid var(--ig-border);
  border-radius: 0;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.22);
  position: relative;
  padding: 14px;
}
.hrjust-map__popupClose {
  position: absolute;
  top: 10px;
  right: 12px;
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
}
.hrjust-map__popupHeader {
  border-bottom: 2px solid var(--ig-accent-2);
  padding-bottom: 10px;
  margin-bottom: 12px;
  font-weight: 950;
  /* ✅ header “colored text” -> accent */
  color: var(--ig-accent);
  font-size: 16px;
}
.hrjust-map__caseList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}
.hrjust-map__caseItem {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-left: 3px solid var(--ig-accent);
  padding: 12px 14px;
  cursor: pointer;
  border-radius: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  align-items: center;
}
.hrjust-map__caseItem:hover {
  background: rgba(10, 34, 59, 0.02);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.hrjust-map__caseItemIcon {
  /* ✅ icon accent */
  color: var(--ig-accent);
  font-weight: 900;
  display: inline-grid;
  place-items: center;
}
.hrjust-map__caseItemTitle {
  font-size: 14px;
  font-weight: 900;
  /* ✅ case list title “colored text” -> accent */
  color: var(--ig-accent);
  line-height: 1.35;
}

@media (max-width: 980px) {
  .hrjust-map__stage {
    grid-template-columns: 1fr;
  }
  .hrjust-map__side {
    position: static;
  }
  :deep(.hrjust-case__grid) {
    grid-template-columns: 1fr;
  }
}
</style>
