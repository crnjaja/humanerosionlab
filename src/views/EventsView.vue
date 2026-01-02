<template>
  <div class="events-page">
    <!-- TOP HERO (COMPACT / FLAT) -->
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--events">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            content
          </div>

          <!-- SAME WORD ANIMATION AS HOMEPAGE -->
          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            OUR <span class="accent">events</span>
          </h1>

          <p class="hero-subtitle">
            Conferences, workshops, roundtables and lectures across the network.
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
        <!-- ✅ keep content below banner -->
        <div class="hero-offset events-hero-offset">
          <section class="events-section" aria-labelledby="events-title">
            <h2 id="events-title" class="section-heading">Events</h2>

            <!-- Toolbar -->
            <section class="toolbar" aria-label="Filters and Search">
              <label class="search-input" aria-label="Search events">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"
                  />
                </svg>
                <input
                  id="q"
                  v-model="q"
                  type="search"
                  placeholder="Search title, speakers, location, keywords…"
                  autocomplete="off"
                />
              </label>

              <label class="select" for="year">
                <span class="pill" aria-hidden="true">Year</span>
                <select id="year" v-model="year" aria-label="Filter by year">
                  <option value="">All years</option>
                  <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>
              </label>

              <!-- ✅ Category filter removed -->

              <label class="select" for="location">
                <span class="pill" aria-hidden="true">Location</span>
                <select id="location" v-model="location" aria-label="Filter by location">
                  <option value="">All locations</option>
                  <option v-for="l in locations" :key="l" :value="l">{{ l }}</option>
                </select>
              </label>

              <label class="sort" for="sort">
                <span class="pill" aria-hidden="true">Sort</span>
                <select id="sort" v-model="sort" aria-label="Sort results">
                  <option value="date-desc">Newest first</option>
                  <option value="date-asc">Oldest first</option>
                  <option value="title-asc">Title A–Z</option>
                  <option value="title-desc">Title Z–A</option>
                </select>
              </label>
            </section>

            <div class="stats-row" aria-live="polite">
              <span>{{ totalCount }} result{{ totalCount === 1 ? '' : 's' }}</span>
              <span>Click thumbnails to open the gallery. “Add to Calendar” downloads a .ics.</span>
            </div>

            <!-- Grid -->
            <section class="grid" aria-label="Events list">
              <article
                v-for="(it, idx) in visibleItems"
                :key="keyOf(it)"
                class="event-card"
                :data-k="keyOf(it)"
                :class="{ revealed: revealedKeys.has(keyOf(it)) }"
                :aria-labelledby="`e${idx}-title`"
                ref="cardEls"
              >
                <!-- Meta rail -->
                <aside class="meta">
                  <div class="date-badge" aria-label="Event date">
                    <div class="day">{{ dayOf(it.start) }}</div>
                    <div class="mon">{{ monthOf(it.start) }}</div>
                    <div v-if="timeRange(it.start, it.end)" class="time">
                      {{ timeRange(it.start, it.end) }}
                    </div>
                  </div>

                  <div class="meta-row">
                    <div class="label">Location</div>
                    <div class="value">{{ it.location }}</div>
                  </div>

                  <!-- ✅ Keep category display on card (only the filter was removed) -->
                  <div class="meta-row">
                    <div class="label">Category</div>
                    <div class="value">
                      <span class="cat">{{ it.category }}</span>
                    </div>
                  </div>
                </aside>

                <!-- Content -->
                <div class="content">
                  <h3 :id="`e${idx}-title`" class="title">{{ it.title }}</h3>
                  <p v-if="(it.speakers || []).length" class="speakers">
                    {{ (it.speakers || []).join(', ') }}
                  </p>

                  <div class="summary-wrap" :data-collapsed="isCollapsed(it) ? 'true' : 'false'">
                    <p class="summary" :id="`e${idx}-summary`">{{ it.summary }}</p>
                  </div>

                  <!-- Media strip -->
                  <fieldset class="media-strip">
                    <legend class="visually-hidden">Event media</legend>
                    <a
                      v-if="it.links?.program"
                      class="chip"
                      :href="it.links.program"
                      target="_blank"
                      rel="noopener"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5z"
                        />
                      </svg>
                      Program
                    </a>

                    <a
                      v-if="it.links?.flyer"
                      class="chip"
                      :href="it.links.flyer"
                      target="_blank"
                      rel="noopener"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-4 4 4 4-4 6 6zM8.5 11A1.5 1.5 0 1 1 10 9.5 1.5 1.5 0 0 1 8.5 11z"
                        />
                      </svg>
                      Flyer
                    </a>

                    <button
                      v-if="it.links?.video"
                      class="chip"
                      type="button"
                      @click="openLightbox(it)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M17 10.5V7a2 2 0 0 0-2-2H5A2 2 0 0 0 3 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"
                        />
                      </svg>
                      Video
                    </button>

                    <button
                      v-if="(it.gallery || []).length"
                      class="chip"
                      type="button"
                      @click="openLightbox(it)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 7a2 2 0 0 1 2-2h12v2H3v10h12v2H3a2 2 0 0 1-2-2V7zm20-2h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-3 4 3 4h-6l-2 3-2-3-3 4h12l-2-3-2-2z"
                        />
                      </svg>
                      Gallery ({{ it.gallery.length }})
                    </button>
                  </fieldset>

                  <!-- Thumbs -->
                  <div
                    v-if="(it.gallery || []).length"
                    class="thumbs"
                    aria-label="Gallery previews"
                  >
                    <button
                      v-for="(src, tIdx) in (it.gallery || []).slice(0, 6)"
                      :key="`${src}-${tIdx}`"
                      class="thumb"
                      type="button"
                      :style="{ backgroundImage: `url('${src}')` }"
                      aria-label="Open gallery"
                      @click="openLightbox(it)"
                    />
                  </div>

                  <!-- Actions -->
                  <div class="actions">
                    <button
                      class="expand-btn"
                      type="button"
                      :aria-controls="`e${idx}-summary`"
                      :aria-expanded="String(!isCollapsed(it))"
                      @click="toggle(it)"
                    >
                      <span class="expand-text">{{
                        isCollapsed(it) ? 'Read more' : 'Show less'
                      }}</span>
                      <svg
                        class="expand-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M7 10l5 5 5-5H7z" />
                      </svg>
                    </button>

                    <button class="btn" type="button" @click="downloadICS(it)">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </article>
            </section>

            <!-- Pagination -->
            <nav class="pager" aria-label="Pagination">
              <button
                class="btn"
                type="button"
                @click="loadMore"
                :disabled="totalCount === 0"
                v-show="canLoadMore || totalCount === 0"
              >
                {{
                  totalCount === 0 ? 'No results' : canLoadMore ? 'Load more' : 'All results shown'
                }}
              </button>
            </nav>

            <!-- Lightbox -->
            <dialog class="lightbox" ref="lbEl" @click="onBackdrop" @cancel.prevent="closeLightbox">
              <div class="lightbox-header">
                <h4 class="lightbox-title">{{ lbTitle }}</h4>
                <button
                  class="close-btn"
                  type="button"
                  @click="closeLightbox"
                  aria-label="Close media dialog"
                >
                  Close
                </button>
              </div>

              <div class="lightbox-body">
                <iframe
                  v-if="lbItem?.links?.video"
                  class="video-embed"
                  :src="lbItem.links.video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  title="Event video"
                ></iframe>

                <ul v-if="(lbItem?.gallery || []).length" class="gallery">
                  <li
                    v-for="(src, gIdx) in lbItem.gallery"
                    :key="`${src}-${gIdx}`"
                    class="gallery-item"
                    :style="{ backgroundImage: `url('${src}')` }"
                  ></li>
                </ul>
              </div>
            </dialog>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'

/* Same animation settings as homepage */
const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

/** Data (same content as your HTML page) */
const items = ref([
  {
    title: 'Conference: Climate Litigation Frontiers',
    start: '2025-11-19T09:00',
    end: '2025-11-19T17:30',
    location: 'Geneva, Switzerland',
    category: 'Conference',
    speakers: ['Prof. L. Nguyen', 'Dr. C. Rossi', 'A. Patel'],
    summary:
      'A one-day conference exploring cutting-edge strategies in climate litigation, with sessions on human rights arguments, corporate duties, and cross-border enforcement.',
    links: {
      program: '#',
      flyer: 'https://via.placeholder.com/1200x1600.png?text=Flyer',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    gallery: [
      'https://via.placeholder.com/1200x900.png?text=Stage',
      'https://via.placeholder.com/1200x900.png?text=Panel',
      'https://via.placeholder.com/1200x900.png?text=Audience',
    ],
    tags: ['litigation', 'human rights', 'corporate'],
  },
  {
    title: 'Workshop: Data Validation for Case Repositories',
    start: '2025-10-28T14:00',
    end: '2025-10-28T17:00',
    location: 'Lausanne, Switzerland',
    category: 'Workshop',
    speakers: ['J. Müller', 'P. Alvarez'],
    summary:
      'Hands-on methodologies and tooling for ensuring data quality across multi-source legal case repositories.',
    links: {
      program: '#',
      flyer: 'https://via.placeholder.com/1200x1600.png?text=Workshop+Flyer',
    },
    gallery: [
      'https://via.placeholder.com/1200x900.png?text=Hands-on',
      'https://via.placeholder.com/1200x900.png?text=Group+work',
    ],
    tags: ['data', 'quality'],
  },
  {
    title: 'Roundtable: Corporate Net-Zero Claims',
    start: '2025-09-10T12:00',
    end: '2025-09-10T14:00',
    location: 'Online',
    category: 'Roundtable',
    speakers: ['T. Okafor', 'R. Chen', 'HEL Team'],
    summary:
      'Critical discussion on reliability, verification, and enforcement of corporate net-zero claims.',
    links: { program: '#', video: 'https://www.youtube.com/embed/ysz5S6PUM-U' },
    gallery: ['https://via.placeholder.com/1200x900.png?text=Roundtable+Screenshot'],
    tags: ['corporate', 'net-zero', 'enforcement'],
  },
  {
    title: 'Lecture: Human Rights Arguments in Climate Cases',
    start: '2025-06-05T18:00',
    end: '2025-06-05T19:30',
    location: 'Zurich, Switzerland',
    category: 'Lecture',
    speakers: ['A. Patel'],
    summary:
      'An evening lecture reviewing the rise of human rights arguments in climate litigation (2020–2025), with case studies and visual analytics.',
    links: { program: '#', flyer: 'https://via.placeholder.com/1200x1600.png?text=Lecture+Flyer' },
    gallery: ['https://via.placeholder.com/1200x900.png?text=Lecture+Hall'],
    tags: ['human rights', 'visualization'],
  },
])

/** UI state */
const PAGE_SIZE = 8
const page = ref(1)
const q = ref('')
const year = ref('')
const location = ref('')
const sort = ref('date-desc')

/**
 * ✅ Expand state should be stable across filtering/sorting:
 * store "expanded" by item key, not by index.
 */
const expandedKeys = ref(new Set())

/**
 * ✅ Reveal state should be stable across filtering/sorting:
 * store revealed by item key, not by index.
 */
const revealedKeys = ref(new Set())

/** Dropdowns */
const years = computed(() => {
  const set = new Set(items.value.map((x) => (x.start || '').slice(0, 4)).filter(Boolean))
  return Array.from(set).sort((a, b) => b.localeCompare(a))
})

const locations = computed(() => {
  const set = new Set(items.value.map((x) => x.location).filter(Boolean))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})

/** Filter + sort */
const filtered = computed(() => {
  const qq = q.value.trim().toLowerCase()
  const yy = year.value
  const ll = location.value
  const ss = sort.value

  const arr = items.value
    .map((it) => ({ ...it, y: (it.start || '').slice(0, 4) }))
    .filter((it) => {
      const hay = [
        it.title,
        it.summary || '',
        (it.speakers || []).join(' '),
        it.location || '',
        it.category || '',
        (it.tags || []).join(' '),
      ]
        .join(' ')
        .toLowerCase()

      const mQ = !qq || hay.includes(qq)
      const mY = !yy || it.y === yy
      const mL = !ll || it.location === ll
      return mQ && mY && mL
    })

  arr.sort((A, B) => {
    switch (ss) {
      case 'date-asc':
        return (A.start || '').localeCompare(B.start || '')
      case 'title-asc':
        return (A.title || '').localeCompare(B.title || '')
      case 'title-desc':
        return (B.title || '').localeCompare(A.title || '')
      case 'date-desc':
      default:
        return (B.start || '').localeCompare(A.start || '')
    }
  })

  return arr
})

const totalCount = computed(() => filtered.value.length)

const visibleItems = computed(() => {
  return filtered.value.slice(0, PAGE_SIZE * page.value)
})

const canLoadMore = computed(() => visibleItems.value.length < filtered.value.length)

/**
 * ✅ Stable key for each event card (no index).
 * Add location as a tie-breaker to reduce collisions.
 */
function keyOf(it) {
  return `${it.title}__${it.start}__${it.location || ''}`
}

/** Reset paging/expanded/reveal when filters change */
watch([q, year, location, sort], async () => {
  page.value = 1
  expandedKeys.value = new Set()
  revealedKeys.value = new Set()

  await nextTick()
  observeCards()
})

/** Summary expand/collapse (stable by key) */
function isCollapsed(it) {
  return !expandedKeys.value.has(keyOf(it))
}
function toggle(it) {
  const k = keyOf(it)
  const next = new Set(expandedKeys.value)
  if (next.has(k)) next.delete(k)
  else next.add(k)
  expandedKeys.value = next
}

function loadMore() {
  if (canLoadMore.value) {
    page.value += 1
    nextTick(() => observeCards())
  }
}

/** Date helpers */
function dayOf(iso) {
  const d = new Date(iso)
  return Number.isFinite(d.getTime()) ? String(d.getDate()) : ''
}
function monthOf(iso) {
  const d = new Date(iso)
  if (!Number.isFinite(d.getTime())) return ''
  return d.toLocaleString(undefined, { month: 'short' }).toUpperCase()
}
function timeRange(startISO, endISO) {
  try {
    const s = new Date(startISO)
    const e = endISO ? new Date(endISO) : null
    if (!Number.isFinite(s.getTime())) return ''
    const tf = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' })
    return e && Number.isFinite(e.getTime()) ? `${tf.format(s)}–${tf.format(e)}` : tf.format(s)
  } catch {
    return ''
  }
}

/** Reveal on scroll (IntersectionObserver) */
const cardEls = ref([])
let io = null

function observeCards() {
  if (io) io.disconnect()
  const els = cardEls.value?.filter(Boolean) || []
  if (!els.length) return

  io = new IntersectionObserver(
    (entries) => {
      const next = new Set(revealedKeys.value)
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const k = e.target.dataset.k
          if (k) next.add(k)
          io?.unobserve(e.target)
        }
      })
      revealedKeys.value = next
    },
    { threshold: 0.12 },
  )

  // ✅ No index mapping: the template already has :data-k="keyOf(it)"
  els.forEach((el) => io.observe(el))
}

onMounted(() => nextTick(() => observeCards()))
onBeforeUnmount(() => {
  if (io) io.disconnect()
})

/** Lightbox */
const lbEl = ref(null)
const lbItem = ref(null)
const lbTitle = ref('')

function openLightbox(item) {
  lbItem.value = item
  lbTitle.value = item?.title || 'Event media'
  lbEl.value?.showModal?.()
}
function closeLightbox() {
  lbEl.value?.close?.()
  lbItem.value = null
  lbTitle.value = ''
}
function onBackdrop(e) {
  if (e.target === lbEl.value) closeLightbox()
}

/** ICS download */
function slugify(s) {
  return String(s)
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/(^-|-$)/g, '')
}
function escapeICS(s) {
  return String(s)
    .replaceAll('\\', '\\\\')
    .replaceAll('\n', String.raw`\n`)
    .replaceAll(',', String.raw`\,`)
    .replaceAll(';', String.raw`\;`)
}
function toICSDate(iso) {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
    d.getUTCHours(),
  )}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
}
function randomUID() {
  if (globalThis.crypto?.getRandomValues) {
    const a = new Uint32Array(4)
    globalThis.crypto.getRandomValues(a)
    return Array.from(a)
      .map((x) => x.toString(16))
      .join('')
  }
  return String(Math.random()).slice(2)
}
function downloadICS(it) {
  const uid = randomUID()
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HEL//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(it.start)}`,
    `DTEND:${toICSDate(it.end || it.start)}`,
    `SUMMARY:${escapeICS(it.title || 'Event')}`,
    it.location ? `LOCATION:${escapeICS(it.location)}` : '',
    `DESCRIPTION:${escapeICS(
      (it.summary || '') + (it.links?.program ? `\nProgram: ${it.links.program}` : ''),
    )}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${slugify(it.title || 'event')}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 3000)
}
</script>

<style scoped>
/* =========================
   EVENTS PAGE – your theme (square, accent rails, quiet UI)
   ========================= */

/* ✅ keep content below banner */
.events-hero-offset {
  margin-top: -40px;
  position: relative;
  z-index: 2;
}

/* Heading (same as Publications) */
.section-heading {
  position: relative;
  display: inline-block;
  font-size: clamp(38px, 8vw, 86px);
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 800;
  color: rgba(11, 42, 74, 0.16);
  margin: 0 0 clamp(18px, 3vw, 36px);
}
.section-heading::after {
  content: '';
  display: block;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
  margin-top: clamp(6px, 0.9cqw, 10px);
}

/* Toolbar (✅ category removed => 1fr + 3 controls) */
.toolbar {
  background: var(--white);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
  padding: 12px;
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: 1fr auto auto auto;
}
@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr auto;
  }
}
@media (max-width: 700px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
}

.search-input {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #fff;
  padding: 10px 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}
.search-input input {
  border: 0;
  outline: 0;
  width: 100%;
  font-size: 15px;
  background: transparent;
  color: var(--ink);
}

.select,
.sort {
  display: flex;
  gap: 8px;
  align-items: center;
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #fff;
  padding: 8px 10px;
  font-weight: 900;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}
.select select,
.sort select {
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  color: var(--ink);
}

.pill {
  display: inline-block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 10px;
  border: 1px solid rgba(216, 75, 139, 0.55);
  color: var(--accent);
  background: #fff;
  font-weight: 900;
}

/* Stats row */
.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(11, 31, 51, 0.65);
  font-size: 13px;
  margin-top: clamp(10px, 2vw, 14px);
}
@media (max-width: 720px) {
  .stats-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}

/* Grid */
.grid {
  margin-top: clamp(14px, 2.6vw, 28px);
  display: grid;
  gap: clamp(14px, 2.6vw, 28px);
}
@media (min-width: 760px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Event card */
.event-card {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 18px;
  background: var(--white);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
  padding: clamp(14px, 2.2cqw, 20px);

  opacity: 0;
  transform: translateY(12px);
}
@media (max-width: 820px) {
  .event-card {
    grid-template-columns: 1fr;
  }
}

.event-card.revealed {
  opacity: 1 !important;
  transform: none !important;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

/* Meta rail */
.meta {
  display: grid;
  align-content: start;
  gap: 12px;
  border-right: 1px solid var(--border);
  padding-right: 16px;
}
@media (max-width: 820px) {
  .meta {
    border-right: 0;
    padding-right: 0;
    border-bottom: 1px solid var(--border);
    padding-bottom: 12px;
  }
}

.date-badge {
  display: grid;
  place-items: center;
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #f6fbff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 14px 10px;
  text-align: center;
}
.date-badge .day {
  font-size: 28px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: -0.02em;
}
.date-badge .mon {
  font-weight: 950;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--accent);
}
.date-badge .time {
  font-size: 12px;
  color: rgba(11, 31, 51, 0.55);
  margin-top: 6px;
}

.meta-row {
  display: grid;
  gap: 6px;
}
.meta .label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(11, 31, 51, 0.55);
}
.meta .value {
  font-weight: 900;
  color: var(--ink);
}

.cat {
  display: inline-block;
  border: 1px solid rgba(10, 34, 59, 0.14);
  padding: 6px 8px;
  font-weight: 950;
  background: #fff;
}

/* Content */
.title {
  margin: 0;
  font-size: clamp(18px, 2.6cqw, 22px);
  font-weight: 950;
  color: var(--ink);
}
.speakers {
  color: rgba(11, 31, 51, 0.86);
  font-weight: 800;
  margin: 2px 0 0;
}
.summary {
  color: rgba(11, 31, 51, 0.7);
  margin: 8px 0 0;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  text-align-last: left;
}
.summary-wrap[data-collapsed='true'] .summary {
  display: -webkit-box;
  line-clamp: 6;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Media strip */
.media-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.chip {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #fff;
  padding: 7px 10px;
  font-weight: 900;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: var(--ink);
  cursor: pointer;
}
.chip:hover {
  background: #f7fbff;
}
.chip svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* utility: visually hidden but available to assistive tech */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* Thumbs */
.thumbs {
  display: flex;
  gap: 8px;
  overflow: auto;
  margin-top: 8px;
}
.thumb {
  flex: 0 0 92px;
  aspect-ratio: 4/3;
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #eef6fd;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}
.thumb:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}

/* Actions */
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.events-section {
  padding: clamp(12px, 4vw, 32px) 0;
  container-type: inline-size; /* if you want it consistent with pubs */
}

.events-section .btn {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--ink);
  padding: 9px 12px;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.events-section .btn:hover {
  background: #f7fbff;
}

.expand-btn {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  font-weight: 950;
  color: var(--accent);
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.expand-btn:hover {
  border-bottom-color: var(--accent);
}

.expand-icon {
  width: 16px;
  height: 16px;
  vertical-align: -2px;
  transition: transform 0.2s ease;
  fill: currentColor;
}
.expand-btn[aria-expanded='true'] .expand-icon {
  transform: rotate(180deg);
}

/* Pager */
.pager {
  display: flex;
  justify-content: center;
  margin-top: clamp(14px, 2.6vw, 28px);
}

/* Lightbox */
dialog.lightbox {
  border: 0;
  width: min(1100px, 94vw);
  max-height: 90vh;
  background: var(--white);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
  padding: 0;
}
.lightbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: 10px 12px;
}
.lightbox-title {
  font-weight: 950;
  margin: 0;
  color: var(--ink);
}
.lightbox-body {
  padding: 12px;
}
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
@media (max-width: 720px) {
  .gallery {
    grid-template-columns: 1fr;
  }
}
.gallery-item {
  background: #eef6fd;
  border: 1px solid var(--border);
  aspect-ratio: 4/3;
  background-size: cover;
  background-position: center;
}
.video-embed {
  width: 100%;
  aspect-ratio: 16/9;
  border: 0;
  background: #000;
  margin-bottom: 10px;
}

.events-section .close-btn {
  border: 1px solid var(--border);
  background: #fff;
  font-weight: 950;
  padding: 6px 10px;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.events-section .close-btn:hover {
  background: #f7fbff;
}

/* Motion preference */
@media (prefers-reduced-motion: reduce) {
  .event-card {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* Hero tune (same as your inner pages) */
:deep(.stage--top--flat) {
  min-height: clamp(320px, 46vh, 520px);
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px;
}
:deep(.stage--top--flat::after) {
  content: none !important;
}
</style>
