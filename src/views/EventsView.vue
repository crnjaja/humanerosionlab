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
        <!-- ✅ lowered content (no overlap on banner) -->
        <div class="hero-offset events-hero-offset">
          <section class="events-section" aria-labelledby="events-title">
            <!-- ✅ Publications-like head (title + actions) -->
            <div class="section-head">
              <h2 id="events-title" class="section-heading">Events</h2>

              <div class="section-actions" aria-label="View options">
                <button
                  class="chip chip--ghost"
                  type="button"
                  @click="toggleCompact"
                  :aria-pressed="String(compact)"
                  title="Toggle compact/comfort view"
                >
                  {{ compact ? 'Comfort view' : 'Compact view' }}
                </button>

                <button
                  class="chip chip--ghost"
                  type="button"
                  @click="clearAll"
                  :disabled="!hasActiveFilters"
                  title="Clear filters"
                >
                  Clear filters
                </button>
              </div>
            </div>

            <!-- ===== Toolbar: search + filters + sort (SAME AS PUBLICATIONS FILTERBAR) ===== -->
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
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  />
                </svg>

                <input
                  id="q"
                  v-model="q"
                  type="search"
                  placeholder="Search title, speakers, location, keywords…"
                  autocomplete="off"
                  @keydown.esc.prevent="q = ''"
                />

                <button
                  v-if="q"
                  class="icon-btn"
                  type="button"
                  aria-label="Clear search"
                  @click="q = ''"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29l6.3 6.31 6.3-6.31z"
                    />
                  </svg>
                </button>
              </label>

              <label class="select" for="year">
                <span class="pill" aria-hidden="true">Year</span>
                <select id="year" v-model="year" aria-label="Filter by year">
                  <option value="">All years</option>
                  <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>
              </label>

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

            <!-- ✅ Active filters chips (same behavior as Publications) -->
            <div v-if="hasActiveFilters" class="active-filters" aria-label="Active filters">
              <button v-if="year" class="chip" type="button" @click="year = ''">
                Year: {{ year }} <span class="chip-x" aria-hidden="true">×</span>
              </button>
              <button v-if="location" class="chip" type="button" @click="location = ''">
                Location: {{ location }} <span class="chip-x" aria-hidden="true">×</span>
              </button>
              <button v-if="q" class="chip" type="button" @click="q = ''">
                Search: “{{ q }}” <span class="chip-x" aria-hidden="true">×</span>
              </button>
            </div>

            <!-- ✅ Stats row (same as Publications) -->
            <div class="stats-row" aria-live="polite">
              <span class="stat">
                <strong>{{ totalCount }}</strong>
                result{{ totalCount === 1 ? '' : 's' }}
              </span>
              <span class="hint"
                >Tip: click “Read more” to expand. “Add to Calendar” downloads a .ics.</span
              >
            </div>

            <!-- ===== Grid ===== -->
            <section class="grid" :class="{ compact }" aria-label="Events list">
              <article
                v-for="(it, idx) in visibleItems"
                :key="keyOf(it)"
                class="event-card"
                :data-k="keyOf(it)"
                :class="{
                  revealed: revealedKeys.has(keyOf(it)),
                  expanded: !isCollapsed(it),
                }"
                :aria-labelledby="`e${idx}-title`"
                ref="cardEls"
              >
                <!-- ✅ Solid banner like Publications -->
                <header class="event-banner">
                  <div class="banner-inner">
                    <h3 :id="`e${idx}-title`" class="event-title">
                      {{ it.title }}
                    </h3>

                    <div class="event-meta">
                      <span class="event-speakers" v-if="(it.speakers || []).length">
                        {{ (it.speakers || []).join(', ') }}
                      </span>
                      <span class="event-date">· {{ formatDateRange(it.start, it.end) }}</span>
                      <span v-if="timeRange(it.start, it.end)" class="event-time">
                        · {{ timeRange(it.start, it.end) }}
                      </span>
                    </div>
                  </div>
                </header>

                <div class="event-body">
                  <!-- Meta pills row -->
                  <div class="meta-row meta-row--pills" aria-label="Event meta">
                    <span class="pill-chip">
                      <span class="pill-label">Location</span>
                      <span class="pill-value">{{ it.location }}</span>
                    </span>

                    <span class="pill-chip">
                      <span class="pill-label">Category</span>
                      <span class="pill-value">{{ it.category }}</span>
                    </span>
                  </div>

                  <div v-if="(it.tags || []).length" class="tags-row" aria-label="Tags">
                    <span v-for="t in it.tags" :key="t" class="tag">{{ t }}</span>
                  </div>

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

                  <!-- Publications-like bottom actions -->
                  <footer class="event-actions event-actions--split" aria-label="Event actions">
                    <button
                      class="action action--read"
                      type="button"
                      :aria-controls="`e${idx}-summary`"
                      :aria-expanded="String(!isCollapsed(it))"
                      @click="toggle(it)"
                    >
                      <span class="action-label">{{
                        isCollapsed(it) ? 'Read more' : 'Show less'
                      }}</span>
                      <svg
                        class="action-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M7 10l5 5 5-5H7z" />
                      </svg>
                    </button>

                    <button class="action action--ics" type="button" @click="downloadICS(it)">
                      <span class="action-label">Add to Calendar</span>
                      <svg
                        class="action-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4V2zm14 8H3v10h18V10zM5 12h4v4H5v-4z"
                        />
                      </svg>
                    </button>
                  </footer>
                </div>
              </article>
            </section>

            <!-- ===== Pagination ===== -->
            <nav class="pager" aria-label="Pagination">
              <button
                class="btn btn--load"
                type="button"
                @click="loadMore"
                :disabled="totalCount === 0 || !canLoadMore"
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

/** Density toggle (match Publications) */
const compact = ref(false)
function toggleCompact() {
  compact.value = !compact.value
}

/** Active filters (pubs-like) */
const hasActiveFilters = computed(() => !!q.value || !!year.value || !!location.value)
function clearAll() {
  q.value = ''
  year.value = ''
  location.value = ''
  sort.value = 'date-desc'
  page.value = 1
}

/** Expand state stable across filtering/sorting */
const expandedKeys = ref(new Set())

/** Reveal state stable across filtering/sorting */
const revealedKeys = ref(new Set())

/** Dropdown values */
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

      const matchQ = !qq || hay.includes(qq)
      const matchY = !yy || it.y === yy
      const matchL = !ll || it.location === ll
      return matchQ && matchY && matchL
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

const visibleItems = computed(() => filtered.value.slice(0, PAGE_SIZE * page.value))

const canLoadMore = computed(() => visibleItems.value.length < filtered.value.length)

/** Stable key for each event card (no index). */
function keyOf(it) {
  return `${it.title}__${it.start}__${it.location || ''}`
}

/** Reset paging/reveal/expand when filters change */
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

/** Dates */
function formatDateRange(startISO, endISO) {
  const s = new Date(startISO)
  if (!Number.isFinite(s.getTime())) return startISO

  const df = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
  const sTxt = df.format(s)

  if (!endISO) return sTxt
  const e = new Date(endISO)
  if (!Number.isFinite(e.getTime())) return sTxt
  const eTxt = df.format(e)

  return sTxt === eTxt ? sTxt : `${sTxt} – ${eTxt}`
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
   EVENTS PAGE – filterbar EXACTLY like Publications filterbar
   (square corners, sticky glass toolbar, aligned heights)
   ========================= */

/* Lower content (avoid overlapping hero/banner) */
.events-hero-offset {
  margin-top: -40px;
  position: relative;
  z-index: 2;
}

/* Section head (title + actions) */
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.section-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Heading */
.section-heading {
  position: relative;
  font-size: clamp(38px, 8vw, 86px);
  line-height: 1;
  letter-spacing: -0.02em;
  color: rgba(11, 42, 74, 0.16);
  font-weight: 800;
  margin: 0 0 clamp(18px, 3vw, 36px);
  display: inline-block;
}
.section-heading::after {
  content: '';
  display: block;
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  margin-top: clamp(6px, 0.9cqw, 10px);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
}

/* =========================
   ✅ FILTERBAR (copied from Publications)
   ========================= */
.toolbar {
  position: sticky;
  top: calc(var(--header-h, 72px) + 10px);
  z-index: 5;

  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(10, 34, 59, 0.14);
  border-radius: 0;

  padding: 12px;
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: 1fr auto auto auto;
}
@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
}

/* Search */
.search-input {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(10, 34, 59, 0.14);
  border-radius: 0;
  background: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  padding: 10px 12px;
}
.search-input input {
  border: 0;
  outline: 0;
  width: 100%;
  font-size: 15px;
  background: transparent;
  color: var(--ink);
}

.icon-btn {
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}
.icon-btn:hover {
  opacity: 1;
}
.icon-btn svg {
  fill: rgba(11, 31, 51, 0.85);
}

/* Selects */
.select,
.sort {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(10, 34, 59, 0.14);
  border-radius: 0;
  background: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 10px;
  white-space: nowrap;
  font-weight: 700;
  color: var(--ink);
}
.select select,
.sort select {
  font-weight: 600;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: inherit;
  color: var(--ink);
  font-size: 14px;
}

/* Pill */
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

/* Active filters */
.active-filters {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

/* Chips */
.chip {
  border: 1px solid rgba(21, 138, 201, 0.4);
  background: rgba(21, 138, 201, 0.08);
  color: rgba(11, 31, 51, 0.9);
  font-weight: 900;
  padding: 8px 10px;
  border-radius: 0;
  cursor: pointer;
  display: inline-flex;
  gap: 10px;
  align-items: center;
}
.chip:hover {
  background: rgba(21, 138, 201, 0.14);
}
.chip-x {
  font-size: 16px;
  line-height: 1;
  opacity: 0.75;
}
.chip--ghost {
  border: 1px solid rgba(10, 34, 59, 0.18);
  background: #fff;
  color: rgba(11, 31, 51, 0.85);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}
.chip--ghost:hover {
  background: #f7fbff;
}
.chip--ghost:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Stats row */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: clamp(10px, 2vw, 14px);
  color: rgba(11, 31, 51, 0.72);
  font-size: 13px;
}
.stats-row .stat strong {
  font-size: 16px;
  color: rgba(11, 31, 51, 0.9);
}
@media (max-width: 720px) {
  .stats-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* ✅ Match Publications: unified control heights inside toolbar */
.toolbar .search-input,
.toolbar .select,
.toolbar .sort {
  height: 44px;
  padding: 0 12px;
  align-items: center;
  display: flex;
}

/* =========================
   (Rest of your Events styles kept as-is below)
   ========================= */

/* Grid */
.grid {
  margin-top: clamp(14px, 2.6vw, 28px);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(14px, 2.6vw, 28px);
}
@media (min-width: 780px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1200px) {
  .grid.compact {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
  }
  .grid.compact .event-body {
    padding: 14px 16px;
    gap: 10px;
  }
}

/* Event card */
.event-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  background: #fff;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  border: 1px solid rgba(10, 34, 59, 0.14);
  overflow: hidden;

  opacity: 0;
  transform: translateY(14px);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}
.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 54px rgba(0, 0, 0, 0.14);
}
.event-card.revealed {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition:
    opacity 0.55s ease,
    transform 0.55s ease,
    box-shadow 0.2s ease;
}

/* Banner */
.event-banner {
  background: #158ac9;
  color: #fff;
}
.banner-inner {
  padding: clamp(16px, 2.2cqw, 22px);
  display: grid;
  gap: 10px;
}
.event-title {
  margin: 0;
  font-size: clamp(18px, 2.6cqw, 22px);
  font-weight: 950;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1.18;
}
.event-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.86);
}
.event-speakers {
  font-weight: 900;
  color: #fff;
}
.event-date,
.event-time {
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.82);
}

/* Body */
.event-body {
  padding: clamp(16px, 2.2cqw, 22px);
  display: grid;
  gap: 12px;
}

/* Meta pills inside card */
.meta-row--pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.pill-chip {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: rgba(11, 31, 51, 0.03);
  padding: 8px 10px;
  font-weight: 900;
}
.pill-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(11, 31, 51, 0.6);
}
.pill-value {
  color: rgba(11, 31, 51, 0.9);
}

/* Tags */
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: rgba(11, 31, 51, 0.03);
  color: rgba(11, 31, 51, 0.84);
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 0;
}

/* Summary */
.summary {
  color: rgba(11, 31, 51, 0.78);
  font-size: 15px;
  margin: 0;
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
.summary-wrap {
  position: relative;
}
.summary-wrap[data-collapsed='true']::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 46px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff 70%);
}

/* Media strip */
.media-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
  padding: 0;
  border: 0;
}
.media-strip .chip {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}
.media-strip .chip svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* Thumbs */
.thumbs {
  display: flex;
  gap: 8px;
  overflow: auto;
}
.thumb {
  flex: 0 0 92px;
  aspect-ratio: 4/3;
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #eef6fd;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border-radius: 0;
}
.thumb:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}

/* visually hidden */
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

/* Bottom actions */
.event-actions--split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: stretch;
  padding-top: 10px;
  border-top: 1px solid rgba(10, 34, 59, 0.1);
}
.action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  height: 44px;
  padding: 0 12px;

  border-radius: 0;
  font-weight: 950;
  text-decoration: none;
  user-select: none;
  cursor: pointer;

  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #fff;
  color: rgba(11, 31, 51, 0.92);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
.action:hover {
  background: rgba(21, 138, 201, 0.06);
}
.action:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
.action--read {
  border-color: rgba(21, 138, 201, 0.35);
  color: rgba(21, 138, 201, 1);
}
.action--ics {
  border-color: rgba(10, 34, 59, 0.14);
  font-weight: 700;
}
.action-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.2s ease;
}
.action--read[aria-expanded='true'] .action-icon {
  transform: rotate(180deg);
}
@media (max-width: 520px) {
  .event-actions--split {
    grid-template-columns: 1fr;
  }
}

/* Pager */
.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: clamp(14px, 2.6vw, 28px);
}
.btn--load {
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #fff;
  color: var(--ink);
  padding: 12px 16px;
  font-weight: 950;
  cursor: pointer;
  border-radius: 0;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}
.btn--load:hover:enabled {
  background: #f7fbff;
}
.btn--load:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Lightbox */
dialog.lightbox {
  border: 0;
  width: min(1100px, 94vw);
  max-height: 90vh;
  background: var(--white);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
  padding: 0;
  border-radius: 0;
}
.lightbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(10, 34, 59, 0.14);
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
  border: 1px solid rgba(10, 34, 59, 0.14);
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
.close-btn {
  border: 1px solid rgba(10, 34, 59, 0.14);
  background: #fff;
  font-weight: 950;
  padding: 6px 10px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border-radius: 0;
}
.close-btn:hover {
  background: #f7fbff;
}

/* Motion preference */
@media (prefers-reduced-motion: reduce) {
  .event-card {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .event-card:hover {
    transform: none !important;
  }
}

/* Hero tune */
:deep(.stage--top--flat) {
  min-height: clamp(320px, 46vh, 520px);
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px;
}
:deep(.stage--top--flat::after) {
  content: none !important;
}
</style>
