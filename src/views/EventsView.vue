<template>
  <div class="events-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--events">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            content
          </div>

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

    <section class="content-block full-bleed">
      <div class="container">
        <section class="events-section" aria-labelledby="events-title">
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

            <label class="select" for="speaker">
              <span class="pill">Speaker</span>
              <select id="speaker" v-model="speaker">
                <option value="">All speakers</option>
                <option v-for="s in speakers" :key="s" :value="s">
                  {{ s }}
                </option>
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

          <div v-if="hasActiveFilters" class="active-filters" aria-label="Active filters">
            <button v-if="year" class="chip" type="button" @click="year = ''">
              Year: {{ year }} <span class="chip-x" aria-hidden="true">×</span>
            </button>
            <button v-if="speaker" class="chip" @click="speaker = ''">
              Speaker: {{ speaker }}
            </button>
            <button v-if="q" class="chip" type="button" @click="q = ''">
              Search: “{{ q }}” <span class="chip-x" aria-hidden="true">×</span>
            </button>
          </div>

          <div class="stats-row" aria-live="polite">
            <span class="stat">
              <strong>{{ totalCount }}</strong>
              result{{ totalCount === 1 ? '' : 's' }}
            </span>
            <span class="hint">Tip: click “Read more” under a description to expand it.</span>
          </div>

          <section class="grid" :class="{ compact }" aria-label="Events list">
            <article
              v-for="(it, idx) in visibleItems"
              :key="keyOf(it)"
              class="event-card"
              :data-k="keyOf(it)"
              :class="[
                `event-card--${it.category.toLowerCase()}`,
                {
                  revealed: revealedKeys.has(keyOf(it)),
                  expanded: !isCollapsed(it),
                },
              ]"
              :aria-labelledby="`e${idx}-title`"
              ref="cardEls"
            >
              <header class="event-header">
                <time class="event-datebox" :datetime="it.start">
                  <span class="datebox-month">{{ dateParts(it.start).month }}</span>
                  <span class="datebox-day">{{ dateParts(it.start).day }}</span>
                  <span class="datebox-year">{{ dateParts(it.start).year }}</span>
                </time>

                <div class="event-heading">
                  <div class="event-kicker-row">
                    <span class="event-category">{{ it.category }}</span>
                  </div>

                  <h3 :id="`e${idx}-title`" class="event-title">{{ it.title }}</h3>

                  <dl class="event-meta" aria-label="Event details">
                    <div v-if="(it.speakers || []).length" class="meta-item meta-item--wide">
                      <dt>Speaker</dt>
                      <dd>{{ (it.speakers || []).join(', ') }}</dd>
                    </div>
                    <div class="meta-item">
                      <dt>Location</dt>
                      <dd>{{ it.location }}</dd>
                    </div>
                  </dl>
                </div>
              </header>

              <div class="event-body">
                <div class="summary-wrap" :data-collapsed="isCollapsed(it) ? 'true' : 'false'">
                  <p class="summary" :id="`e${idx}-summary`">{{ it.summary }}</p>
                </div>

                <button
                  class="read-more-btn"
                  type="button"
                  :aria-controls="`e${idx}-summary`"
                  :aria-expanded="String(!isCollapsed(it))"
                  @click="toggle(it)"
                >
                  <span>{{ isCollapsed(it) ? 'Read more' : 'Show less' }}</span>
                  <svg
                    class="read-more-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </button>

                <fieldset
                  v-if="
                    it.links?.program ||
                    it.links?.flyer ||
                    it.links?.video ||
                    (it.gallery || []).length
                  "
                  class="media-strip"
                >
                  <legend class="visually-hidden">Event media</legend>

                  <button
                    v-if="it.links?.program"
                    class="chip"
                    type="button"
                    @click="openPdf(`${it.title} - Program`, it.links.program)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5z"
                      />
                    </svg>
                    Program
                  </button>

                  <button
                    v-if="it.links?.flyer"
                    class="chip"
                    type="button"
                    @click="openPdf(`${it.title} - Flyer`, it.links.flyer)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-4 4 4 4-4 6 6zM8.5 11A1.5 1.5 0 1 1 10 9.5 1.5 1.5 0 0 1 8.5 11z"
                      />
                    </svg>
                    Flyer
                  </button>

                  <button
                    v-if="it.links?.video"
                    class="chip"
                    type="button"
                    @click="openLightbox(it)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M1 7a2 2 0 0 1 2-2h12v2H3v10h12v2H3a2 2 0 0 1-2-2V7zm20-2h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-3 4 3 4h-6l-2 3-2-3-3 4h12l-2-3-2-2z"
                      />
                    </svg>
                    Gallery ({{ it.gallery.length }})
                  </button>
                </fieldset>
              </div>
            </article>
          </section>

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
              <iframe v-if="lbPdf" class="pdf-viewer" :src="lbPdf" title="PDF viewer"></iframe>

              <iframe
                v-else-if="lbItem?.links?.video"
                class="video-embed"
                :src="lbItem.links.video"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share;
                "
                allowfullscreen
                title="Event video"
              ></iframe>

              <ul v-if="!lbPdf && (lbItem?.gallery || []).length" class="gallery">
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
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

const items = ref([
  {
    title:
      'Climate Litigation, ISDS Reform, and State Support Mechanisms: Data-Driven and Policy-Oriented Insights',
    start: '2026-06-11T15:00',
    end: '2026-06-11T16:30',
    location: 'Online',
    category: 'Webinar',
    speakers: ['Romain Marguet'],
    summary: `On 11 June 2026, the UNCITRAL Transdanubian Day 2026 hosted an online expert lecture and discussion on Climate Litigation, ISDS Reform, and State Support Mechanisms. Conducted in English via Zoom, the event brought together academics and practitioners to examine how climate change is increasingly shaping the landscape of international dispute settlement, including investor–State dispute settlement (ISDS).

    The discussion focused on several interconnected developments. Participants explored the growing body of climate litigation across domestic, regional, and international jurisdictions, as well as the implications of these cases for international investment law and dispute resolution. Particular attention was devoted to the ongoing reform efforts within the United Nations Commission on International Trade Law (UNCITRAL), especially the work of Working Group III on ISDS Reform, which continues to play a central role in shaping the future of investor–State dispute settlement.

    The panel also examined emerging State support mechanisms designed to help governments address increasingly complex climate-related disputes. Drawing on recent academic and empirical research, including new datasets on climate litigation, speakers highlighted evolving legal trends, risks, and the growing intersections between climate governance, investment protection, and human rights.

    The event concluded with an open discussion, providing participants with an opportunity to engage directly with the speakers and contribute to ongoing international debates on climate change, dispute settlement reform, and access to justice.`,
    links: {
      program: '',
      flyer: '',
      video: '',
    },
    gallery: [],
  },
  {
    title: 'Non-refoulement: legal issues around the return of refugees',
    start: '2026-02-10',
    end: '2026-02-10',
    location: 'University of London, UK',
    category: 'Seminar',
    speakers: ['Elisa Fornalé'],
    summary: `On 10 February 2026, Prof. Elisa Fornalé participated as a panellist in the seminar “Non-refoulement: legal issues around the return of refugees” organized by the Refugee Law Initiative at the School of Advanced Study, University of London.

    The event brought together leading scholars and practitioners to discuss the contemporary legal status of the principle of non-refoulement in light of recent developments in international and domestic jurisprudence. Discussions addressed the relationship between treaty-based and customary non-refoulement obligations, the possible characterization of non-refoulement as a jus cogens norm, and the implications of these developments for the protection of displaced persons, including those affected by climate-related harm.

    The seminar provided an opportunity to engage with current debates on international protection and the evolving legal responses to displacement in the context of global environmental change.`,

    links: {
      program: '',
      flyer: '',
      video: '',
    },
    gallery: [],
  },
  {
    title:
      'NERPS 2026: Advancing Climate Justice: Prospects and Challenges of the Judicial Dialogue between Science and Law before the Judge',
    start: '2026-03-06',
    end: '2026-03-06',
    location: 'United Nations University, Tokyo, Japan',
    category: 'Conference',
    speakers: ['Elisa Fornalé'],
    summary: `On 6 March 2026, Prof. Elisa Fornalé participated in the NERPS 2026 Conference hosted by the United Nations University in Tokyo, Japan. As part of the session “Advancing Climate Justice: Prospects and Challenges of the Judicial Dialogue between Science and Law before the Judge”, she presented the paper “The IACtHR and Climate Emergency: Framing Climate Harm within the Inter-American Human Rights System.”

    The presentation examined the role of the Inter-American Court of Human Rights in shaping emerging approaches to climate justice and explored how climate-related harm can be addressed through human rights law. Particular attention was devoted to the growing interaction between environmental degradation, human rights protection, and judicial responses to climate-related challenges.

    The conference offered an important forum for discussing the legal dimensions of climate governance and environmental justice from comparative and interdisciplinary perspectives.`,

    links: {
      program: '',
      flyer: '',
      video: '',
    },
    gallery: [],
  },
  {
    title: 'Sea Level Rise and Human Mobility',
    start: '2026-04-02',
    end: '2026-04-02',
    location: 'University of Palermo, Italy',
    category: 'Lecture',
    speakers: ['Martina Sardo'],
    summary: `On 2 April 2026, Dr. Martina Sardo delivered a guest lecture entitled “Sea Level Rise and Human Mobility” at the University of Palermo, Italy.

    The lecture was held within the International Law course taught by Prof. Diego Mauri and focused on the legal and human rights implications of sea-level rise. Particular attention was devoted to climate-induced mobility and displacement, examining how environmental degradation increasingly challenges existing legal frameworks and protection mechanisms.

    The event provided students with an opportunity to engage with contemporary debates on climate change, migration, and international law, while highlighting the relevance of socio-legal approaches to understanding the human consequences of environmental transformation. The lecture contributed to the dissemination of the project’s research themes within academic teaching and training activities. `,

    links: {
      program: '',
      flyer: '',
      video: '',
    },
    gallery: [],
  },
  {
    title:
      'Cosmografías de lo Posible: Slow Violence and Slow Peace: A Perspective from Indigenous Knowledge Systems',
    start: '2026-05-22',
    end: '2026-05-22',
    location: 'University of Turin, Italy',
    category: 'Seminar',
    speakers: ['Simone Ferrari'],
    summary: `On 22 May 2026, Dr. Simone Ferrari delivered the lecture “Slow Violence and Slow Peace: A Perspective from Indigenous Knowledge Systems” as part of the seminar series Cosmografías de lo Posible, organized by Furman University and the University of Turin.

    The presentation explored the dialogue between Latin American intellectual traditions and the concept of slow violence, focusing on the long-term impacts of climate change and environmental degradation. Particular attention was given to the contribution of Indigenous knowledge systems to alternative understandings of environmental justice, slow violence, and peace.

    Drawing on themes closely connected to the theoretical framework of Resisting Human Erosion project, the lecture examined how Indigenous perspectives can offer valuable insights into the temporal dimensions of environmental harm and the search for more equitable responses to ecological crises.The event fostered interdisciplinary dialogue on climate justice, cultural studies, and alternative approaches to environmental governance.`,
    links: {
      program: '',
      flyer: '',
      video: '',
    },
    gallery: [],
  },
])

const PAGE_SIZE = 8
const page = ref(1)
const q = ref('')
const year = ref('')
const speaker = ref('')
const sort = ref('date-desc')

const compact = ref(false)

function toggleCompact() {
  compact.value = !compact.value
}

const hasActiveFilters = computed(() => !!q.value || !!year.value || !!speaker.value)

function clearAll() {
  q.value = ''
  year.value = ''
  speaker.value = ''
  sort.value = 'date-desc'
  page.value = 1
}

const expandedKeys = ref(new Set())
const revealedKeys = ref(new Set())

const years = computed(() => {
  const set = new Set(items.value.map((x) => (x.start || '').slice(0, 4)).filter(Boolean))
  return Array.from(set).sort((a, b) => b.localeCompare(a))
})

const speakers = computed(() => {
  const set = new Set(items.value.flatMap((x) => x.speakers || []).filter(Boolean))

  return Array.from(set).sort((a, b) => a.localeCompare(b))
})

const filtered = computed(() => {
  const qq = q.value.trim().toLowerCase()
  const yy = year.value
  const sp = speaker.value
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
      ]
        .join(' ')
        .toLowerCase()

      const matchQ = !qq || hay.includes(qq)
      const matchY = !yy || it.y === yy
      const matchSpeaker = !sp || (it.speakers || []).includes(sp)

      return matchQ && matchY && matchSpeaker
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

function keyOf(it) {
  return `${it.title}__${it.start}__${it.location || ''}`
}

watch([q, year, speaker, sort], async () => {
  page.value = 1
  expandedKeys.value = new Set()
  revealedKeys.value = new Set()

  await nextTick()
  observeCards()
})

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

function dateParts(startISO) {
  const d = new Date(startISO)

  if (!Number.isFinite(d.getTime())) {
    return { day: '--', month: '', year: '' }
  }

  return {
    day: new Intl.DateTimeFormat(undefined, { day: '2-digit' }).format(d),
    month: new Intl.DateTimeFormat(undefined, { month: 'short' }).format(d),
    year: new Intl.DateTimeFormat(undefined, { year: 'numeric' }).format(d),
  }
}

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

const lbEl = ref(null)
const lbItem = ref(null)
const lbTitle = ref('')
const lbPdf = ref(null)

function openLightbox(item) {
  lbItem.value = item
  lbPdf.value = null
  lbTitle.value = item?.title || 'Event media'
  lbEl.value?.showModal?.()
}

function openPdf(title, pdfUrl) {
  lbItem.value = null
  lbPdf.value = pdfUrl
  lbTitle.value = title || 'PDF'
  lbEl.value?.showModal?.()
}

function closeLightbox() {
  lbEl.value?.close?.()
  lbItem.value = null
  lbPdf.value = null
  lbTitle.value = ''
}

function onBackdrop(e) {
  if (e.target === lbEl.value) closeLightbox()
}
</script>
