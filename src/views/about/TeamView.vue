<template>
  <div class="team-page">
    <!-- TOP HERO (COMPACT / FLAT) -->
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--team">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            CURRENT PROJECT
          </div>

          <!-- SAME WORD ANIMATION AS HOMEPAGE -->
          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            MEET <span class="accent">the Team</span>
          </h1>

          <p class="hero-subtitle">
            Researchers, assistants, and visiting fellows contributing to the lab’s work.
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
        <!-- Stronger offset (close to your reference team page) -->
        <div class="hero-offset team-hero-offset">
          <!-- =========================
               CORE TEAM
               ========================= -->
          <section
            class="team-section"
            aria-labelledby="core-team-title"
            aria-describedby="core-team-desc"
          >
            <h2 class="section-heading">Core Team</h2>

            <ul class="team-grid" aria-label="Core team members">
              <li v-for="member in coreTeam" :key="member.key" class="member-card">
                <div class="member-header">
                  <div class="avatar" :data-initials="initials(member.name)">
                    <img
                      v-if="member.photo"
                      :src="member.photo"
                      :alt="`Portrait of ${member.name}`"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div class="member-heading">
                    <div class="name">{{ member.name }}</div>
                    <div class="role">{{ member.role }}</div>
                  </div>
                </div>

                <div class="member-divider" aria-hidden="true"></div>

                <p class="bio">
                  {{ member.bio }}
                </p>

                <div class="meta" aria-label="Member contact details">
                  <div v-if="member.email" class="meta-row">
                    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 5h16v14H4z" stroke-width="1.6" />
                      <path d="M4 7l8 6 8-6" stroke-width="1.6" />
                    </svg>
                    <a
                      class="link"
                      :href="`mailto:${member.email}`"
                      :aria-label="`Send an email to ${member.name}`"
                    >
                      {{ member.email }}
                    </a>
                  </div>

                  <div v-if="member.linkedin" class="meta-row">
                    <svg class="fill-primary" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.47 4.73-2.47C22.4 7.73 24 10 24 14.06V24h-5v-8.5c0-2.03-.04-4.65-2.83-4.65-2.83 0-3.27 2.21-3.27 4.49V24H8z"
                      />
                    </svg>
                    <a
                      class="link"
                      :href="member.linkedin"
                      target="_blank"
                      rel="noopener"
                      :aria-label="`${member.name} on LinkedIn`"
                    >
                      LinkedIn
                    </a>
                  </div>

                  <div v-if="member.location" class="meta-row">
                    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"
                        stroke-width="1.6"
                      />
                      <circle cx="12" cy="9" r="2.5" stroke-width="1.6" />
                    </svg>
                    <span class="meta-text">{{ member.location }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <div class="spacer" aria-hidden="true"></div>

          <!-- =========================
               VISITING FELLOWS — CURRENT
               ========================= -->
          <section
            class="team-section"
            aria-labelledby="visiting-current-title"
            aria-describedby="visiting-current-desc"
          >
            <h2 class="section-heading">Visiting Fellows</h2>

            <ul class="team-grid" aria-label="Current visiting fellows">
              <li v-for="member in visitingCurrent" :key="member.key" class="member-card">
                <div class="member-header">
                  <div class="avatar" :data-initials="initials(member.name)">
                    <img
                      v-if="member.photo"
                      :src="member.photo"
                      :alt="`Portrait of ${member.name}`"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div class="member-heading">
                    <div class="name">{{ member.name }}</div>
                    <div class="role">{{ member.role }}</div>
                  </div>
                </div>

                <div class="member-divider" aria-hidden="true"></div>

                <p class="bio">
                  {{ member.bio }}
                </p>

                <div class="meta" aria-label="Member contact details">
                  <div v-if="member.email" class="meta-row">
                    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 5h16v14H4z" stroke-width="1.6" />
                      <path d="M4 7l8 6 8-6" stroke-width="1.6" />
                    </svg>
                    <a
                      class="link"
                      :href="`mailto:${member.email}`"
                      :aria-label="`Send an email to ${member.name}`"
                    >
                      {{ member.email }}
                    </a>
                  </div>

                  <div v-if="member.linkedin" class="meta-row">
                    <svg class="fill-primary" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.47 4.73-2.47C22.4 7.73 24 10 24 14.06V24h-5v-8.5c0-2.03-.04-4.65-2.83-4.65-2.83 0-3.27 2.21-3.27 4.49V24H8z"
                      />
                    </svg>
                    <a
                      class="link"
                      :href="member.linkedin"
                      target="_blank"
                      rel="noopener"
                      :aria-label="`${member.name} on LinkedIn`"
                    >
                      LinkedIn
                    </a>
                  </div>

                  <div v-if="member.location" class="meta-row">
                    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"
                        stroke-width="1.6"
                      />
                      <circle cx="12" cy="9" r="2.5" stroke-width="1.6" />
                    </svg>
                    <span class="meta-text">{{ member.location }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <div class="spacer" aria-hidden="true"></div>

          <!-- =========================
               VISITING FELLOWS — ALUMNI
               ========================= -->
          <section
            class="team-section"
            aria-labelledby="visiting-former-title"
            aria-describedby="visiting-former-desc"
          >
            <h2 class="section-heading">Alumni</h2>

            <ul class="team-grid" aria-label="Former visiting fellows">
              <li v-for="member in visitingAlumni" :key="member.key" class="member-card">
                <div class="member-header">
                  <div class="avatar" :data-initials="initials(member.name)">
                    <img
                      v-if="member.photo"
                      :src="member.photo"
                      :alt="`Portrait of ${member.name}`"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div class="member-heading">
                    <div class="name">{{ member.name }}</div>
                    <div class="role">{{ member.role }}</div>
                  </div>
                </div>

                <div class="member-divider" aria-hidden="true"></div>

                <p class="bio">
                  {{ member.bio }}
                </p>

                <div class="meta" aria-label="Member contact details">
                  <div v-if="member.email" class="meta-row">
                    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 5h16v14H4z" stroke-width="1.6" />
                      <path d="M4 7l8 6 8-6" stroke-width="1.6" />
                    </svg>
                    <a
                      class="link"
                      :href="`mailto:${member.email}`"
                      :aria-label="`Send an email to ${member.name}`"
                    >
                      {{ member.email }}
                    </a>
                  </div>

                  <div v-if="member.linkedin" class="meta-row">
                    <svg class="fill-primary" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.47 4.73-2.47C22.4 7.73 24 10 24 14.06V24h-5v-8.5c0-2.03-.04-4.65-2.83-4.65-2.83 0-3.27 2.21-3.27 4.49V24H8z"
                      />
                    </svg>
                    <a
                      class="link"
                      :href="member.linkedin"
                      target="_blank"
                      rel="noopener"
                      :aria-label="`${member.name} on LinkedIn`"
                    >
                      LinkedIn
                    </a>
                  </div>

                  <div v-if="member.location" class="meta-row">
                    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"
                        stroke-width="1.6"
                      />
                      <circle cx="12" cy="9" r="2.5" stroke-width="1.6" />
                    </svg>
                    <span class="meta-text">{{ member.location }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'

/* Same animation settings as homepage */
const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

/**
 * Turn a full name into initials (e.g., "Elisa Fornalé" => "EF")
 */
function initials(fullName) {
  if (!fullName || typeof fullName !== 'string') return ''
  const parts = fullName.trim().split(/\s+/g).filter(Boolean)

  const first = parts[0]?.[0] ?? ''
  const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : '') ?? ''
  return (first + last).toUpperCase()
}

/**
 * Replace the placeholder content below with your real bios/links/photos.
 * `photo` can be a local file (/files/...) or an imported asset.
 */
const coreTeam = [
  {
    key: 'elisa-fornale',
    name: 'Elisa Fornalé',
    role: 'Senior Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'elisa.fornale@unibe.ch',
    linkedin: 'https://ch.linkedin.com/in/elisa-fornal%C3%A9-622596283',
    location: 'Bern, Switzerland',
    photo: '',
  },
  {
    key: 'riccarda-heepen',
    name: 'Riccarda Heepen',
    role: 'Job Title',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'riccard.heepen@unibe.ch',
    linkedin: '#',
    location: 'Geneva, Switzerland',
    photo: '',
  },
  {
    key: 'martina-sardo',
    name: 'Martina Sardo',
    role: 'Job Title',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'martina.sardo@unibe.ch',
    linkedin: '#',
    location: 'Bern, Switzerland',
    photo: '',
  },
  {
    key: 'parinaz-tofighi',
    name: 'Parinaz Tofighi',
    role: 'Job Title',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'parinaz.tofighi@unibe.ch',
    linkedin: '#',
    location: 'Bern, Switzerland',
    photo: '',
  },
]

const visitingCurrent = [
  {
    key: 'john-doe-current-1',
    name: 'John Doe',
    role: 'Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'placeholder@placeholder.ch',
    linkedin: '#',
    location: 'Bern, Switzerland',
    photo: '',
  },
  {
    key: 'jane-doe-current-1',
    name: 'Jane Doe',
    role: 'Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'placeholder@placeholder.ch',
    linkedin: '#',
    location: 'Geneva, Switzerland',
    photo: '',
  },
  {
    key: 'john-doe-current-2',
    name: 'John Doe',
    role: 'Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'placeholder@placeholder.ch',
    linkedin: '#',
    location: 'Bern, Switzerland',
    photo: '',
  },
  {
    key: 'jane-doe-current-2',
    name: 'Jane Doe',
    role: 'Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'placeholder@placeholder.ch',
    linkedin: '#',
    location: 'Geneva, Switzerland',
    photo: '',
  },
]

const visitingAlumni = [
  {
    key: 'john-doe-alumni-1',
    name: 'John Doe',
    role: 'Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'placeholder@placeholder.ch',
    linkedin: '#',
    location: 'Zurich, Switzerland',
    photo: '',
  },
  {
    key: 'jane-doe-alumni-1',
    name: 'Jane Doe',
    role: 'Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'placeholder@placeholder.ch',
    linkedin: '#',
    location: 'Lausanne, Switzerland',
    photo: '',
  },
  {
    key: 'john-doe-alumni-2',
    name: 'John Doe',
    role: 'Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'placeholder@placeholder.ch',
    linkedin: '#',
    location: 'Bern, Switzerland',
    photo: '',
  },
  {
    key: 'jane-doe-alumni-2',
    name: 'Jane Doe',
    role: 'Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'placeholder@placeholder.ch',
    linkedin: '#',
    location: 'Geneva, Switzerland',
    photo: '',
  },
]
</script>

<style scoped>
/* =========================
   TEAM PAGE – matches your theme tokens (square corners, panel, accent)
   ========================= */

/* Stronger lift (closer to your reference team page) */
.team-hero-offset {
  margin-top: -20px;
  position: relative;
  z-index: 2;
}
@media (max-width: 900px) {
  .team-hero-offset {
    margin-top: 0px;
  }
}

/* ✅ IMPORTANT: make each team section a stretching grid
   so header + grid use EXACTLY the same available width */
.team-section {
  display: grid;
  justify-items: stretch;
  align-items: start;
  padding: clamp(10px, 1.6vw, 18px) 0;
}

/* Use your pill styling (already defined globally in cards.css for .feature-section etc),
   but we also support it here in case the team page is outside those sections. */
.pill {
  display: inline-block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 10px;
  border: 1px solid rgba(216, 75, 139, 0.55);
  color: var(--accent);
  background: #fff;
  margin-bottom: 6px;
  font-weight: 900;
  width: max-content;
}

.team-title {
  margin: 0;
  font-size: clamp(22px, 2.2vw, 30px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--navy);
  font-weight: 950;
  text-wrap: balance;
}

.team-desc {
  margin: 0;
  max-width: 76ch;
  color: var(--muted);
  font-size: clamp(14px, 1.35vw, 16px);
  line-height: 1.6;
  text-wrap: pretty;
}

/* ✅ Grid must also stretch full width (same reference as header) */
.team-grid {
  width: 100%;
  justify-self: stretch;
  box-sizing: border-box;

  list-style: none;
  padding: 0; /* remove UL left padding */
  margin-left: 0; /* remove default margin */
  margin-right: 0;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(16px, 2vw, 24px);
  margin-top: clamp(22px, 2.8vw, 32px);
}

@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

/* Member card (square, modern, matches your borders/shadows) */
.member-card {
  background: var(--white);
  border: 1px solid var(--border);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  outline: none;
  box-sizing: border-box;
}

.member-card:hover,
.member-card:focus-within {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
  border-color: rgba(216, 75, 139, 0.28);
}

/* Left accent rail on each card */
.member-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
  opacity: 0.9;
  pointer-events: none;
}

/* Header: avatar + name/role */
.member-header {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 16px;
  align-items: center;
}

.avatar {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  background: rgba(216, 75, 139, 0.08);
  border: 1px solid var(--border);
  user-select: none;
  position: relative;
  box-sizing: border-box;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Initials fallback if no image */
.avatar[data-initials]:not(:has(img))::after {
  content: attr(data-initials);
  font-weight: 900;
  letter-spacing: 0.02em;
  color: var(--accent);
  font-size: 18px;
}

.member-heading {
  display: grid;
  gap: 4px;
}

.name {
  font-weight: 950;
  font-size: 18px;
  letter-spacing: 0.01em;
  color: var(--ink);
  margin: 2px 0 0;
}

.role {
  color: rgba(216, 75, 139, 0.92);
  font-weight: 900;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.member-divider {
  height: 1px;
  background: rgba(10, 34, 59, 0.12);
  margin: 12px 0 0;
}

/* Justified bio (like your reference) */
.bio {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  text-wrap: pretty;
}

/* Meta rows (email / linkedin / location) */
.meta {
  display: grid;
  gap: 8px;
  margin: 14px 0 0;
  font-size: 14px;
  color: var(--ink);
}

.meta-row {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 10px;
  align-items: start;
}

.meta svg {
  width: 18px;
  height: 18px;
  display: block;
  stroke: rgba(216, 75, 139, 0.92);
}

.meta svg.fill-primary {
  stroke: none;
  fill: rgba(216, 75, 139, 0.92);
  width: 14px;
  height: 14px;
  margin-top: 2px;
}

.meta-text {
  color: var(--ink);
}

/* Links */
.link {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(216, 75, 139, 0.35);
  padding-bottom: 1px;
  width: max-content;
  display: inline-block;
}

.link:hover,
.link:focus-visible {
  border-color: rgba(216, 75, 139, 0.9);
}

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  .member-card {
    transition: none !important;
  }
  .member-card:hover {
    transform: none !important;
  }
}

/* Optional: tune the hero size just like your other inner pages */
:deep(.stage--top--flat) {
  min-height: clamp(320px, 46vh, 520px);
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px;
}

:deep(.stage--top--flat::after) {
  content: none !important;
}

.section-heading {
  display: inline-block;
  width: max-content;
}
</style>
