<template>
  <div class="home">
    <svg class="visually-hidden" width="0" height="0" aria-hidden="true" focusable="false">
      <filter id="erodeFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.1"
          numOctaves="3"
          seed="2"
          result="noise"
        >
          <animate
            attributeName="baseFrequency"
            dur="6s"
            values="0.9;1.4;0.9"
            repeatCount="indefinite"
          />
          <animate
            attributeName="seed"
            dur="2.2s"
            values="1;2;3;4;5;6;7"
            repeatCount="indefinite"
          />
        </feTurbulence>
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
        <feComposite in="SourceGraphic" in2="mask" operator="in" result="cut" />
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

    <section class="stage stage--top full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker"><span class="kicker-dot" aria-hidden="true"></span> FOCUS</div>
          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            WHEN <span class="accent">CLIMATE CHANGE</span> ERODES
            <span class="erode-loop">HUMAN RIGHTS</span>
          </h1>
          <p class="hero-subtitle">
            Exploring how climate change, migration, and international law intersect to protect
            human dignity in an increasingly uninhabitable world.
          </p>
          <div class="hero-actions">
            <RouterLink class="btn btn--primary" to="projects/hel">About Us</RouterLink>
            <RouterLink class="btn btn--ghost" to="/contact">Contact</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section id="news" class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset">
          <section class="feature-section" aria-label="Highlights">
            <h2 class="section-heading">Latest</h2>

            <div class="feature-grid focus-grid">
              <div class="focus-left">
                <article
                  v-for="item in latestItems"
                  :key="item.title"
                  class="feature-row"
                  :aria-label="item.label"
                >
                  <div class="media-frame">
                    <figure class="feature-media">
                      <img :src="item.image" :alt="item.imageAlt" loading="lazy" />
                    </figure>
                    <div class="feature-card">
                      <div>
                        <div class="pill">{{ item.label }}</div>
                        <h3 class="feature-title">{{ item.title }}</h3>
                        <p class="feature-text">{{ item.text }}</p>
                        <p class="feature-meta">Published: {{ item.published }}</p>
                      </div>
                      <p class="feature-actions actions-right">
                        <a class="feature-link" :href="item.link">{{ item.linkLabel }}</a>
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <aside class="agenda" aria-label="Agenda">
                <section class="agenda-card" aria-labelledby="agenda-title">
                  <div class="agenda-header">
                    <div class="pill">Agenda</div>
                    <h3 id="agenda-title" class="agenda-title">Upcoming</h3>
                  </div>

                  <ol class="agenda-list" aria-live="polite">
                    <li v-if="upcomingAgenda.length === 0" class="agenda-item">
                      <div class="agenda-main"><strong>No upcoming items.</strong></div>
                    </li>

                    <li v-for="(ev, idx) in upcomingAgenda" :key="ev.title" class="agenda-item">
                      <div class="agenda-date" aria-hidden="true">
                        <div class="day">{{ HomeService.formatDay(ev.start, tz) }}</div>
                        <div class="month">{{ HomeService.formatMonth(ev.start, tz) }}</div>
                      </div>

                      <div class="agenda-main">
                        <span class="agenda-link">{{ ev.title }}</span>
                        <div class="agenda-meta">
                          {{ HomeService.formatDateLong(ev.start, tz) }} ·
                          {{ HomeService.formatTimeRange(ev.start, ev.end, tz) }}
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
                    <a class="feature-link" href="https://www.human-erosion-lab.com/events"
                      >All Events →</a
                    >
                  </div>
                </section>
              </aside>
            </div>
          </section>

          <section class="projects-section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="projects-heading">Projects</h2>

            <div class="projects-grid">
              <article v-for="project in projects" :key="project.title" class="project-row">
                <div class="media-frame">
                  <figure class="project-media">
                    <img :src="project.image" :alt="project.imageAlt" loading="lazy" />
                  </figure>
                  <div class="project-card">
                    <div>
                      <h3 class="project-title">{{ project.title }}</h3>
                      <p class="project-text">{{ project.text }}</p>
                    </div>
                    <p class="project-actions actions-right">
                      <RouterLink class="feature-link" :to="project.to">{{
                        project.linkLabel
                      }}</RouterLink>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>

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
            :href="HomeService.googleCalendarURL(upcomingAgenda[openMenuIndex])"
            target="_blank"
            rel="noopener"
          >
            Add to Google Calendar
          </a>
        </div>
      </Teleport>
    </section>

    <section class="stage stage--bottom full-bleed">
      <div class="container stage-inner stage-inner--bottom">
        <div class="partners">
          <div class="partners-kicker">THE PROJECT IS A COLLABORATIVE INITIATIVE BY</div>

          <div class="logos">
            <a
              v-for="partner in partners"
              :key="partner.image"
              class="logo-box"
              :href="partner.href"
              target="_blank"
              rel="noopener"
              :aria-label="partner.ariaLabel"
            >
              <img :class="partner.imageClass" :src="partner.image" :alt="partner.imageAlt" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useWordReveal } from '@/composables/useWordReveal'
import { agendaConfig, latestItems, partners, projects } from '@/data/home.data'
import { HomeService } from '@/services/HomeService'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

const tz = agendaConfig.timezone || 'Europe/Zurich'
const upcomingAgenda = computed(() => HomeService.getUpcomingAgenda(agendaConfig.items, 8))

const openMenuIndex = ref(null)
const menuPos = ref({ top: 0, left: 0 })
let io = null

function toggleMenu(idx, event) {
  if (openMenuIndex.value === idx) {
    closeMenu()
    return
  }

  openMenuIndex.value = idx
  menuPos.value = HomeService.getPopoverPosition(event.currentTarget)
}

function closeMenu() {
  openMenuIndex.value = null
}

function downloadICS(event) {
  HomeService.downloadICS(event, tz)
  closeMenu()
}

function onDocKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}

function onDocClick() {
  if (openMenuIndex.value !== null) closeMenu()
}

function onAnyScrollOrResize() {
  if (openMenuIndex.value !== null) closeMenu()
}

onMounted(() => {
  io = HomeService.initReveal('.focus-left .feature-row, .projects-section .project-row, .agenda')
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
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

.erode-loop {
  display: inline-block;
  filter: url(#erodeFilter);
  will-change: filter, transform, opacity;
  animation: erodeFloat 5.2s ease-in-out infinite;
}

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

@media (prefers-reduced-motion: reduce) {
  .erode-loop {
    filter: none;
    animation: none;
  }
}
</style>
