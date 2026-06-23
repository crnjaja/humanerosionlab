<template>
  <div class="team-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--team">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            CURRENT PROJECT
          </div>

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

    <section class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset team-hero-offset">
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

          <div class="spacer" aria-hidden="true"></div>

          <section
            class="team-section"
            aria-labelledby="visiting-former-title"
            aria-describedby="visiting-former-desc"
          >
            <h2 class="section-heading">Advisory Board</h2>

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

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

function initials(fullName) {
  if (!fullName || typeof fullName !== 'string') return ''
  const parts = fullName.trim().split(/\s+/g).filter(Boolean)

  const first = parts[0]?.[0] ?? ''
  const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : '') ?? ''
  return (first + last).toUpperCase()
}

const coreTeam = [
  {
    key: 'elisa-fornale',
    name: 'Prof. Elisa Fornalé',
    role: 'Professor',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'elisa.fornale@unibe.ch',
    linkedin: 'https://ch.linkedin.com/in/elisa-fornal%C3%A9-622596283',
    location: 'Bern, Switzerland',
    photo: '',
  },
  {
    key: 'simone-ferrari',
    name: 'Dr. Simone Ferrari',
    role: 'Senior Postdoctoral Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'simone.ferrari.fs@gmail.com',
    linkedin: '#',
    location: 'Bern, Switzerland',
    photo: '',
  },

  {
    key: 'martina-sardo',
    name: 'Dr. Martina Sardo',
    role: 'Postdoctoral Researcher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'martina.sardo@unibe.ch',
    linkedin: '#',
    location: 'Bern, Switzerland',
    photo: '',
  },

  {
    key: 'camilla-paglia',
    name: 'Camilla Paglia',
    role: 'PhD Candidate',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'camilla.paglia@students.unibe.ch',
    linkedin: '#',
    location: 'Bern, Switzerland',
    photo: '',
  },
  {
    key: 'riccarda-heepen',
    name: 'Riccarda Heepen',
    role: 'Research Assist.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'riccard.heepen@unibe.ch',
    linkedin: '#',
    location: 'Geneva, Switzerland',
    photo: '',
  },
  {
    key: 'romain-marguet',
    name: 'Romain Marguet',
    role: 'Developer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'romain.marguet@unibe.ch',
    linkedin: '#',
    location: 'Geneva, Switzerland',
    photo: '',
  },
]

const visitingAlumni = [
  {
    key: 'shannon-o-lear',
    name: "Prof. Shannon O'Lear",
    role: '',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'olear@ku.edu',
    linkedin: '#',
    location: 'University of Kansas, Lawrence, USA',
    photo: '',
  },
  {
    key: 'zaker-ahmad',
    name: 'Dr. Zaker Ahmad',
    role: '',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'ahmad@mpil.de',
    linkedin: '#',
    location: 'Max Planck Institute, Heidelberg, Germany',
    photo: '',
  },
  {
    key: 'maura-marchegiani',
    name: 'Prof. Maura Marchegiani',
    role: '',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'maura.marchegiani@unistrapg.it',
    linkedin: '#',
    location: 'UniStraPg, Perugia, Italy',
    photo: '',
  },
  {
    key: 'asuncion-fresnoza-flot',
    name: 'Prof. Asuncion Fresnoza-Flot',
    role: '',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    email: 'Asuncion.Fresnoza@ulb.be',
    linkedin: '#',
    location: 'Université Libre de Bruxelles, Brussels, Belgium',
    photo: '',
  },
]
</script>

<style scoped>
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

.team-section {
  display: grid;
  justify-items: stretch;
  align-items: start;
  padding: clamp(10px, 1.6vw, 18px) 0;
}

.pill {
  display: inline-block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 10px;
  border: 1px solid var(--accent);
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

.team-grid {
  width: 100%;
  justify-self: stretch;
  box-sizing: border-box;

  list-style: none;
  padding: 0;
  margin-left: 0;
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

.member-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
  opacity: 0.9;
  pointer-events: none;
}

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
  background: color-mix(in srgb, var(--accent) 8%, transparent);
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
  color: var(--accent);
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
  stroke: var(--accent);
}

.meta svg.fill-primary {
  stroke: none;
  fill: var(--accent);
  width: 14px;
  height: 14px;
  margin-top: 2px;
}

.meta-text {
  color: var(--ink);
}

.link {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--accent);
  padding-bottom: 1px;
  width: max-content;
  display: inline-block;
}

.link:hover,
.link:focus-visible {
  border-color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .member-card {
    transition: none !important;
  }
  .member-card:hover {
    transform: none !important;
  }
}

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
