<!-- Events.vue -->
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
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>

              <input
                v-model="q"
                type="search"
                placeholder="Search title, representative, location, keywords…"
                autocomplete="off"
                @keydown.esc.prevent="q = ''"
              />

              <button
                v-if="q"
                class="icon-btn"
                type="button"
                @click="q = ''"
                aria-label="Clear search"
              >
                ×
              </button>
            </label>

            <label class="select">
              <span class="pill">Year</span>
              <select v-model="year">
                <option value="">All years</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </label>

            <label class="select">
              <span class="pill">Representative</span>
              <select v-model="speaker">
                <option value="">All representatives</option>
                <option v-for="s in speakers" :key="s" :value="s">{{ s }}</option>
              </select>
            </label>

            <label class="sort">
              <span class="pill">Sort</span>
              <select v-model="sort">
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
            <button v-if="speaker" class="chip" type="button" @click="speaker = ''">
              Representative: {{ speaker }} <span class="chip-x" aria-hidden="true">×</span>
            </button>
            <button v-if="q" class="chip" type="button" @click="q = ''">
              Search: “{{ q }}” <span class="chip-x" aria-hidden="true">×</span>
            </button>
          </div>

          <div class="stats-row" aria-live="polite">
            <span
              ><strong>{{ totalCount }}</strong> result{{ totalCount === 1 ? '' : 's' }}</span
            >
            <span class="hint">Expand a card to read the full event description.</span>
          </div>

          <section class="grid" :class="{ compact }" aria-label="Events list">
            <article
              v-for="(it, idx) in visibleItems"
              :id="it.id"
              :key="keyOf(it)"
              class="event-card"
              :class="[
                categoryClass(it),
                summaryBalanceClass(it),
                {
                  revealed: revealedKeys.has(keyOf(it)),
                  expanded: isExpanded(it),
                },
              ]"
              :data-k="keyOf(it)"
              :aria-labelledby="`e${idx}-title`"
              ref="cardEls"
            >
              <figure class="event-media">
                <img
                  :src="it.image || fallbackImage"
                  :alt="it.imageAlt || it.title"
                  loading="lazy"
                />

                <time class="event-datebox" :datetime="it.start">
                  <span>{{ dateParts(it.start).month }}</span>
                  <strong>{{ dateParts(it.start).day }}</strong>
                  <span>{{ dateParts(it.start).year }}</span>
                </time>
              </figure>

              <div class="event-content">
                <div class="event-tag-wrap">
                  <span class="event-category">{{ it.category }}</span>
                </div>

                <div class="event-main">
                  <h3 :id="`e${idx}-title`" class="event-title">{{ it.title }}</h3>

                  <dl class="event-meta">
                    <div v-if="(it.speakers || []).length">
                      <dt>Representative</dt>
                      <dd>{{ it.speakers.join(', ') }}</dd>
                    </div>

                    <div>
                      <dt>Location</dt>
                      <dd>{{ it.location }}</dd>
                    </div>
                  </dl>

                  <div class="summary-wrap" :class="{ open: isExpanded(it) }">
                    <p class="summary" :id="`e${idx}-summary`">{{ it.summary }}</p>
                  </div>

                  <div class="event-footer">
                    <div
                      v-if="
                        true ||
                        it.links?.program ||
                        it.links?.flyer ||
                        it.links?.video ||
                        it.links?.external ||
                        (it.gallery || []).length
                      "
                      class="event-resources"
                    >
                      <!-- Show More -->

                      <button
                        class="resource-btn resource-btn--primary"
                        type="button"
                        :aria-controls="`e${idx}-summary`"
                        :aria-expanded="String(isExpanded(it))"
                        @click="toggle(it)"
                      >
                        <svg
                          class="resource-icon resource-arrow"
                          :class="{ 'resource-arrow--open': isExpanded(it) }"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>

                        <span>{{ isExpanded(it) ? 'Less' : 'More' }}</span>
                      </button>

                      <!-- Program -->

                      <button
                        v-if="it.links?.program"
                        class="resource-btn"
                        type="button"
                        @click="openPdf(`${it.title} - Program`, it.links.program)"
                      >
                        <span class="resource-icon">PDF</span>
                        <span>Program</span>
                      </button>

                      <!-- Flyer -->

                      <button
                        v-if="it.links?.flyer"
                        class="resource-btn"
                        type="button"
                        @click="openPdf(`${it.title} - Flyer`, it.links.flyer)"
                      >
                        <span class="resource-icon">PDF</span>
                        <span>Flyer</span>
                      </button>

                      <!-- Video -->

                      <button
                        v-if="it.links?.video"
                        class="resource-btn"
                        type="button"
                        @click="openLightbox(it)"
                      >
                        <span class="resource-icon">▶</span>
                        <span>Video</span>
                      </button>

                      <!-- Gallery -->

                      <button
                        v-if="(it.gallery || []).length"
                        class="resource-btn"
                        type="button"
                        @click="openLightbox(it)"
                      >
                        <span class="resource-icon">IMG</span>
                        <span>Gallery</span>
                      </button>

                      <!-- External -->

                      <a
                        v-if="it.links?.external"
                        class="resource-btn"
                        :href="it.links.external"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span class="resource-icon">↗</span>
                        <span>Website</span>
                      </a>
                    </div>
                  </div>
                </div>
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
              <button class="close-btn" type="button" @click="closeLightbox">Close</button>
            </div>

            <div class="lightbox-body">
              <iframe v-if="lbPdf" class="pdf-viewer" :src="lbPdf" title="PDF viewer"></iframe>

              <iframe
                v-else-if="lbItem?.links?.video"
                class="video-embed"
                :src="lbItem.links.video"
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
import { events, fallbackImage } from '@/data/events.data'
import { EventsService } from '@/services/EventsService'
import '@/assets/pages/events.css'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

const items = ref(events)

const page = ref(1)
const q = ref('')
const year = ref('')
const speaker = ref('')
const sort = ref('date-desc')
const compact = ref(false)
const expandedKeys = ref(new Set())
const expandedOrder = ref([])
const revealedKeys = ref(new Set())

const hasActiveFilters = computed(() => !!q.value || !!year.value || !!speaker.value)
const years = computed(() => EventsService.getYears(items.value))
const speakers = computed(() => EventsService.getSpeakers(items.value))

const filtered = computed(() =>
  EventsService.filterAndSort(items.value, {
    q: q.value,
    year: year.value,
    speaker: speaker.value,
    sort: sort.value,
  }),
)

const totalCount = computed(() => filtered.value.length)
const baseVisibleItems = computed(() =>
  filtered.value.slice(0, EventsService.PAGE_SIZE * page.value),
)
const visibleItems = computed(() =>
  EventsService.putExpandedFirst(baseVisibleItems.value, expandedOrder.value),
)
const canLoadMore = computed(() => baseVisibleItems.value.length < filtered.value.length)

function keyOf(it) {
  return EventsService.keyOf(it)
}

function categoryClass(it) {
  return EventsService.categoryClass(it)
}

function summaryBalanceClass(it) {
  return EventsService.summaryBalanceClass(it)
}

function dateParts(startISO) {
  return EventsService.dateParts(startISO)
}

function isExpanded(it) {
  return expandedKeys.value.has(keyOf(it))
}

async function toggle(it) {
  const k = keyOf(it)
  const next = new Set(expandedKeys.value)

  if (next.has(k)) {
    next.delete(k)
    expandedOrder.value = expandedOrder.value.filter((x) => x !== k)
  } else {
    next.add(k)
    expandedOrder.value = [...expandedOrder.value.filter((x) => x !== k), k]
  }

  expandedKeys.value = next

  await nextTick()
  observeCards()

  if (next.has(k)) {
    scrollToCard(k)
  }
}

function scrollToCard(k, extraOffset = 60) {
  const selector = `[data-k="${CSS.escape(k)}"]`
  const el = document.querySelector(selector)
  if (!el) return

  const headerOffset =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72

  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset - extraOffset

  window.scrollTo({
    top,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

function toggleCompact() {
  compact.value = !compact.value
}

function clearAll() {
  q.value = ''
  year.value = ''
  speaker.value = ''
  sort.value = 'date-desc'
  page.value = 1
}

function loadMore() {
  if (canLoadMore.value) {
    page.value += 1
    nextTick(observeCards)
  }
}

watch([q, year, speaker, sort], async () => {
  page.value = 1
  expandedKeys.value = new Set()
  expandedOrder.value = []
  revealedKeys.value = new Set()
  await nextTick()
  observeCards()
})

const cardEls = ref([])
let io = null

function observeCards() {
  if (io) io.disconnect()

  const els = cardEls.value?.filter(Boolean) || []
  if (!els.length) return

  io = new IntersectionObserver(
    (entries) => {
      const next = new Set(revealedKeys.value)

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const k = entry.target.dataset.k
          if (k) next.add(k)
          io?.unobserve(entry.target)
        }
      })

      revealedKeys.value = next
    },
    {
      threshold: 0.01,
      rootMargin: '200px 0px 200px 0px',
    },
  )

  els.forEach((el) => io.observe(el))
}

onMounted(async () => {
  await nextTick()
  observeCards()

  const id = window.location.hash.replace('#', '')
  const fromHome = new URLSearchParams(window.location.search).get('from') === 'home'

  if (!id) return

  history.replaceState(null, '', window.location.pathname + window.location.search)

  const event = items.value.find((it) => it.id === id)
  if (!event) return

  expandedKeys.value = new Set([keyOf(event)])
  expandedOrder.value = [keyOf(event)]

  await nextTick()
  observeCards()
  scrollToCard(keyOf(event), fromHome ? 120 : 60)
})

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
