<!-- src/views/HomeView.vue -->
<template>
  <div class="home">
    <!-- Hidden SVG filter defs (used by the looping "erosion" effect) -->
    <svg class="visually-hidden" width="0" height="0" aria-hidden="true" focusable="false">
      <filter id="erodeFilter" x="-20%" y="-20%" width="140%" height="140%">
        <!-- noise -->
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.1"
          numOctaves="3"
          seed="2"
          result="noise"
        >
          <!-- slow drift -->
          <animate
            attributeName="baseFrequency"
            dur="6s"
            values="0.9;1.4;0.9"
            repeatCount="indefinite"
          />
          <!-- subtle variation -->
          <animate
            attributeName="seed"
            dur="2.2s"
            values="1;2;3;4;5;6;7"
            repeatCount="indefinite"
          />
        </feTurbulence>

        <!-- turn noise into a moving alpha mask (controls how much gets "eaten") -->
        <feComponentTransfer in="noise" result="mask">
          <feFuncA type="gamma" amplitude="1.05" exponent="1" offset="-0.06">
            <animate
              attributeName="exponent"
              dur="3.8s"
              values="0.65;2.6;0.65"
              repeatCount="indefinite"
            />
          </feFuncA>
        </feComponentTransfer>

        <!-- apply mask to the text (erodes holes) -->
        <feComposite in="SourceGraphic" in2="mask" operator="in" result="cut" />

        <!-- wobble the remaining edges a bit -->
        <feDisplacementMap
          in="cut"
          in2="noise"
          scale="10"
          xChannelSelector="R"
          yChannelSelector="G"
        >
          <animate attributeName="scale" dur="5.2s" values="2;14;2" repeatCount="indefinite" />
        </feDisplacementMap>
      </filter>
    </svg>

    <!-- TOP HERO -->
    <section class="stage stage--top full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            FOCUS
          </div>

          <!-- Keep your word reveal animation (useWordReveal) -->
          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            WHEN <span class="accent">CLIMATE CHANGE</span> ERODES
            <!-- Looping erosion effect only on HUMAN RIGHTS -->
            <span class="erode-loop">HUMAN RIGHTS</span>
          </h1>

          <p class="hero-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          <div class="hero-actions">
            <RouterLink class="btn btn--primary" to="projects/hel">About Us</RouterLink>
            <RouterLink class="btn btn--ghost" to="/contact">Contact</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT (REPLACED) -->
    <section id="news" class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset">
          <!-- ================== TOP ROW: FOCUS (NEWS + PUBLICATION stacked) + AGENDA ================== -->
          <section class="feature-section" aria-label="Highlights">
            <h2 class="section-heading">Latest</h2>

            <div class="feature-grid focus-grid">
              <!-- ===== LEFT: stacked cards ===== -->
              <div class="focus-left">
                <!-- LAST NEWS -->
                <article class="feature-row" aria-label="Last News">
                  <div class="media-frame">
                    <figure class="feature-media">
                      <img
                        src="/images/backgrounds/background4.jpg"
                        alt="News cover"
                        loading="lazy"
                      />
                    </figure>
                    <div class="feature-card">
                      <div>
                        <div class="pill">Last News</div>
                        <h3 class="feature-title">Policy Brief: Climate Risk Disclosure</h3>
                        <p class="feature-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.
                        </p>
                        <p class="feature-meta">Published: 12 Oct 2025</p>
                      </div>
                      <p class="feature-actions actions-right">
                        <a class="feature-link" href="#">All News →</a>
                      </p>
                    </div>
                  </div>
                </article>

                <!-- LAST PUBLICATION -->
                <article class="feature-row" aria-label="Last Publication">
                  <div class="media-frame">
                    <figure class="feature-media">
                      <img
                        src="/images/backgrounds/rose.png"
                        alt="Publications cover"
                        loading="lazy"
                      />
                    </figure>
                    <div class="feature-card">
                      <div>
                        <div class="pill">Last Publication</div>
                        <h3 class="feature-title">Working Paper: Corporate Climate Duties</h3>
                        <p class="feature-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.
                        </p>
                        <p class="feature-meta">Published: 08 Oct 2025</p>
                      </div>
                      <p class="feature-actions actions-right">
                        <a
                          class="feature-link"
                          href="https://www.human-erosion-lab.com/publications"
                        >
                          All Publications →
                        </a>
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <!-- ===== RIGHT: AGENDA ===== -->
              <aside class="agenda" aria-label="Agenda">
                <section class="agenda-card" aria-labelledby="agenda-title">
                  <div class="agenda-header">
                    <div class="pill">Agenda</div>
                    <h3 id="agenda-title" class="agenda-title">Upcoming</h3>
                  </div>

                  <ol class="agenda-list" aria-live="polite">
                    <li v-if="upcomingAgenda.length === 0" class="agenda-item">
                      <div class="agenda-main">
                        <strong>No upcoming items.</strong>
                      </div>
                    </li>

                    <li v-for="(ev, idx) in upcomingAgenda" :key="idx" class="agenda-item">
                      <div class="agenda-date" aria-hidden="true">
                        <div class="day">{{ fmtDay(ev.start) }}</div>
                        <div class="month">{{ fmtMonth(ev.start) }}</div>
                      </div>

                      <div class="agenda-main">
                        <span class="agenda-link">{{ ev.title }}</span>
                        <div class="agenda-meta">
                          {{ fmtDateLong(ev.start) }} · {{ fmtTimeRange(ev.start, ev.end) }}
                          <span v-if="ev.location"> · {{ ev.location }}</span>
                        </div>

                        <div class="agenda-actions">
                          <button
                            class="icon-btn"
                            aria-haspopup="true"
                            :aria-expanded="openMenuIndex === idx ? 'true' : 'false'"
                            aria-label="Add to calendar"
                            @click.stop="toggleMenu(idx, $event)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path
                                d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm13 7H4v10h16V9zM6 11h5v5H6v-5z"
                              />
                            </svg>
                          </button>

                          <a class="feature-link" :href="ev.url || '#'">Details →</a>
                        </div>
                      </div>
                    </li>
                  </ol>

                  <div class="agenda-footer actions-right">
                    <a class="feature-link" href="https://www.human-erosion-lab.com/events">
                      All Events →
                    </a>
                  </div>
                </section>
              </aside>
            </div>
          </section>

          <!-- ================== PROJECTS 2×2 ================== -->
          <section class="projects-section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="projects-heading">Projects</h2>

            <div class="projects-grid">
              <!-- 1 -->
              <article class="project-row">
                <div class="media-frame">
                  <figure class="project-media">
                    <img src="/images/backgrounds/background4.jpg" alt="HEL cover" loading="lazy" />
                  </figure>
                  <div class="project-card">
                    <div>
                      <h3 class="project-title">HEL</h3>
                      <p class="project-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                    </div>
                    <p class="project-actions actions-right">
                      <RouterLink class="feature-link" to="/projects/hel">
                        Read the HEL project →
                      </RouterLink>
                    </p>
                  </div>
                </div>
              </article>

              <!-- 2 -->
              <article class="project-row">
                <div class="media-frame">
                  <figure class="project-media">
                    <img src="/images/backgrounds/bordeaux.png" alt="HRJUST cover" loading="lazy" />
                  </figure>
                  <div class="project-card">
                    <div>
                      <h3 class="project-title">HRJUST</h3>
                      <p class="project-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                    </div>
                    <p class="project-actions actions-right">
                      <RouterLink class="feature-link" to="/projects/hrjust">
                        Read the HRJUST project →
                      </RouterLink>
                    </p>
                  </div>
                </div>
              </article>

              <!-- 3 -->
              <article class="project-row">
                <div class="media-frame">
                  <figure class="project-media">
                    <img src="/images/backgrounds/rose.png" alt="GEM cover" loading="lazy" />
                  </figure>
                  <div class="project-card">
                    <div>
                      <h3 class="project-title">GEM</h3>
                      <p class="project-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                    </div>
                    <p class="project-actions actions-right">
                      <RouterLink class="feature-link" to="/projects/gem">
                        Read the GEM project →
                      </RouterLink>
                    </p>
                  </div>
                </div>
              </article>

              <!-- 4 -->
              <article class="project-row">
                <div class="media-frame">
                  <figure class="project-media">
                    <img src="/images/backgrounds/vert.png" alt="CLIMCO2 cover" loading="lazy" />
                  </figure>
                  <div class="project-card">
                    <div>
                      <h3 class="project-title">CLI-M-CO2</h3>
                      <p class="project-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                    </div>
                    <p class="project-actions actions-right">
                      <RouterLink class="feature-link" to="/projects/cli-m-co2">
                        Read the CLIMCO2 project →
                      </RouterLink>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>

      <!-- Popover -->
      <Teleport to="body">
        <div
          v-if="openMenuIndex !== null"
          class="agenda-popover"
          :style="{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }"
          aria-hidden="false"
          @click.stop
        >
          <button type="button" @click="downloadICS(upcomingAgenda[openMenuIndex])">
            Download .ics
          </button>
          <a
            :href="googleCalendarURL(upcomingAgenda[openMenuIndex])"
            target="_blank"
            rel="noopener"
          >
            Add to Google Calendar
          </a>
        </div>
      </Teleport>
    </section>

    <!-- BOTTOM IMAGE AREA -->
    <section class="stage stage--bottom full-bleed">
      <div class="container stage-inner stage-inner--bottom">
        <div class="partners">
          <div class="partners-kicker">THE PROJECT IS A COLLABORATIVE INITIATIVE BY</div>

          <div class="logos">
            <a
              class="logo-box"
              href="https://www.unibe.ch"
              target="_blank"
              rel="noopener"
              aria-label="University of Bern"
            >
              <img
                class="logo-img logo-img--unibe"
                src="/images/logos/unibe.png"
                alt="University of Bern logo"
              />
            </a>

            <a
              class="logo-box"
              href="https://www.wti.org/"
              target="_blank"
              rel="noopener"
              aria-label="World Trade Institute"
            >
              <img src="/images/logos/WTI.png" alt="World Trade Institute logo" />
            </a>
            <a
              class="logo-box"
              href="https://www.wti.org/"
              target="_blank"
              rel="noopener"
              aria-label="World Trade Institute"
            >
              <img src="/images/logos/SNF.png" alt="World Trade Institute logo" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useWordReveal } from '@/composables/useWordReveal'

/**
 * Hero title word reveal animation (kept exactly as you already had it)
 */
const { el: heroTitleEl } = useWordReveal({
  stagger: 140, // even slower stagger
  duration: 1300, // longer easing per word
})

/**
 * Agenda mock data
 */
const agendaConfig = {
  timezone: 'Europe/Zurich',
  items: [
    {
      title: 'Conference: Climate Litigation — Plenary',
      start: '2026-01-24T09:30:00',
      end: '2026-01-24T11:00:00',
      location: 'Auditorium A, Uni Campus',
      url: '#',
    },
    {
      title: 'Webinar: Corporate Duty of Vigilance',
      start: '2026-03-05T17:00:00',
      end: '2026-03-05T18:15:00',
      location: 'Online (Zoom)',
      url: '#',
    },
    {
      title: 'Webinar: Corporate Duty of Vigilance',
      start: '2026-02-05T17:00:00',
      end: '2026-02-05T18:15:00',
      location: 'Online (Zoom)',
      url: '#',
    },
    {
      title: 'Workshop: Climate Claims Visuals',
      start: '2026-11-13T14:00:00',
      end: '2026-11-13T17:00:00',
      location: 'Lab 3, Digital Hub',
      url: '#',
    },
    {
      title: 'Seminar: Human Rights & Climate Justice',
      start: '2026-12-02T12:30:00',
      end: '2026-12-02T13:45:00',
      location: 'Room B',
      url: '#',
    },
  ],
}

const tz = agendaConfig.timezone || 'Europe/Zurich'

function startOfDay(d) {
  const z = new Date(d)
  z.setHours(0, 0, 0, 0)
  return z
}

const upcomingAgenda = computed(() => {
  const now = new Date()
  const today = startOfDay(now)

  return (agendaConfig.items || [])
    .map((x) => ({
      ...x,
      start: new Date(x.start),
      end: x.end ? new Date(x.end) : null,
    }))
    .filter((x) => x.start >= today)
    .sort((a, b) => a.start - b.start)
    .slice(0, 8)
})

const fmtDay = (d) => new Intl.DateTimeFormat(undefined, { day: '2-digit', timeZone: tz }).format(d)
const fmtMonth = (d) =>
  new Intl.DateTimeFormat(undefined, { month: 'short', timeZone: tz }).format(d)
const fmtTime = (d) =>
  new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: tz,
    hour12: false,
  }).format(d)
const fmtDateLong = (d) =>
  new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: tz,
  }).format(d)

function fmtTimeRange(start, end) {
  if (!end) return fmtTime(start)
  return `${fmtTime(start)}–${fmtTime(end)}`
}

const openMenuIndex = ref(null)
const menuPos = ref({ top: 0, left: 0 })

function toggleMenu(idx, evt) {
  if (openMenuIndex.value === idx) {
    closeMenu()
    return
  }
  const rect = evt.currentTarget.getBoundingClientRect()
  openMenuIndex.value = idx
  menuPos.value = {
    top: Math.round(rect.bottom + 6),
    left: Math.round(rect.right - 180),
  }
}

function closeMenu() {
  openMenuIndex.value = null
}

function toUTCBlock(d) {
  const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()
  return iso.replaceAll(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

function googleCalendarURL(ev) {
  if (!ev) return '#'
  const text = encodeURIComponent(ev.title || 'Event')
  const details = encodeURIComponent((ev.url || '') + (ev.url ? '\n' : '') + (ev.location || ''))
  const location = encodeURIComponent(ev.location || '')
  const start = toUTCBlock(ev.start)
  const end = toUTCBlock(ev.end || new Date(ev.start.getTime() + 60 * 60 * 1000))
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}%2F${end}&details=${details}&location=${location}`
}

function toICSDate(d, tzid) {
  const dtf = new Intl.DateTimeFormat('en-CA', {
    timeZone: tzid,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  const parts = Object.fromEntries(dtf.formatToParts(d).map((p) => [p.type, p.value]))
  return parts.year + parts.month + parts.day + 'T' + parts.hour + parts.minute + parts.second
}

function downloadICS(ev) {
  if (!ev) return

  const dtStart = toICSDate(ev.start, tz)
  const dtEnd = toICSDate(ev.end || new Date(ev.start.getTime() + 60 * 60 * 1000), tz)
  const uid = 'agenda-' + Math.random().toString(36).slice(2) + '@site'

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Your Site//Agenda//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date(), 'UTC')}Z`,
    `DTSTART;TZID=${tz}:${dtStart}`,
    `DTEND;TZID=${tz}:${dtEnd}`,
    `SUMMARY:${(ev.title || '').replaceAll('\n', ' ')}`,
    ev.location ? `LOCATION:${String(ev.location).replaceAll('\n', ' ')}` : '',
    ev.url ? `URL:${ev.url}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  const blob = new Blob([lines], { type: 'text/calendar;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download =
    (ev.title || 'event')
      .replaceAll(/[^\w\s-]+/g, '')
      .trim()
      .replaceAll(/\s+/g, '-') + '.ics'
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(a.href)
  a.remove()

  closeMenu()
}

// Reveal animation
let io = null

function initReveal() {
  const targets = document.querySelectorAll(
    '.focus-left .feature-row, .projects-section .project-row, .agenda',
  )
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io?.unobserve(e.target)
        }
      })
    },
    { threshold: 0.15 },
  )
  targets.forEach((t) => io.observe(t))
}

function onDocKeydown(e) {
  if (e.key === 'Escape') closeMenu()
}
function onDocClick() {
  if (openMenuIndex.value !== null) closeMenu()
}
function onAnyScrollOrResize() {
  if (openMenuIndex.value !== null) closeMenu()
}

onMounted(() => {
  initReveal()
  document.addEventListener('keydown', onDocKeydown)
  document.addEventListener('click', onDocClick)
  window.addEventListener('resize', onAnyScrollOrResize)
  window.addEventListener('scroll', onAnyScrollOrResize, true)
})

onBeforeUnmount(() => {
  io?.disconnect()
  document.removeEventListener('keydown', onDocKeydown)
  document.removeEventListener('click', onDocClick)
  window.removeEventListener('resize', onAnyScrollOrResize)
  window.removeEventListener('scroll', onAnyScrollOrResize, true)
})
</script>

<style scoped>
/* Hidden SVG defs helper */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

/* Looping "erosion" effect only on the HUMAN RIGHTS span */
.erode-loop {
  display: inline-block;
  filter: url(#erodeFilter);
  will-change: filter, transform, opacity;
  animation: erodeFloat 5.2s ease-in-out infinite;
}

/* premium micro-motion so it feels modern, not gimmicky */
@keyframes erodeFloat {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  50% {
    transform: translate3d(0.5px, -0.5px, 0);
    opacity: 0.98;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

/* accessibility */
@media (prefers-reduced-motion: reduce) {
  .erode-loop {
    filter: none;
    animation: none;
  }
}
</style>
