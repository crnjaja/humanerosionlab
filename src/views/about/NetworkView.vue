<template>
  <div class="network-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            CURRENT PROJECT
          </div>

          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            Our <span class="accent">Network</span>
          </h1>

          <p class="hero-subtitle">
            Partner institutions and advisors supporting the Human Erosion Lab.
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
        <div class="network-hero-offset">
          <section class="network-section" aria-labelledby="partners-title">
            <div class="section-topline">
              <div>
                <div class="pill">Partners</div>
                <h2 id="partners-title" class="section-heading">Partner Network</h2>
              </div>
            </div>

            <ul class="partner-grid" aria-label="Partner institutions">
              <li v-for="partner in partners" :key="partner.key" class="partner-card">
                <a
                  class="partner-link"
                  :href="partner.url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="`Visit ${partner.name}`"
                >
                  <div class="partner-logo-wrap">
                    <img
                      class="partner-logo"
                      :src="partner.logo"
                      :alt="`${partner.name} logo`"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div class="partner-content">
                    <span class="partner-eyebrow">{{ partner.type }}</span>
                    <h3 class="partner-name">{{ partner.name }}</h3>
                    <p class="partner-text">{{ partner.description }}</p>
                  </div>

                  <span class="partner-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
          </section>

          <div class="spacer" aria-hidden="true"></div>

          <section class="network-section" aria-labelledby="advisory-title">
            <div class="section-topline">
              <div>
                <div class="pill">Advisory Board</div>
                <h2 id="advisory-title" class="section-heading">Scientific Advisors</h2>
              </div>

            </div>

            <ul class="advisor-grid" aria-label="Advisory board members">
              <li v-for="member in advisoryBoard" :key="member.key" class="advisor-card">
                <div class="advisor-header">
                  <div class="avatar" :data-initials="initials(member.name)">
                    <img
                      v-if="member.photo"
                      :src="member.photo"
                      :alt="portraitAlt(member)"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div class="advisor-heading">
                    <div class="name">{{ member.name }}</div>
                    <div class="role">{{ member.role }}</div>
                  </div>
                </div>

                <div class="member-divider" aria-hidden="true"></div>

                <p class="bio">
                  {{ member.bio }}
                </p>

                <div class="meta" aria-label="Advisor contact details">
                  <div v-if="member.email" class="meta-row">
                    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 5h16v14H4z" stroke-width="1.6" />
                      <path d="M4 7l8 6 8-6" stroke-width="1.6" />
                    </svg>
                    <a
                      class="link"
                      :href="mailto(member.email)"
                      :aria-label="emailAriaLabel(member)"
                    >
                      {{ member.email }}
                    </a>
                  </div>

                  <div v-if="member.linkedin && member.linkedin !== '#'" class="meta-row">
                    <svg class="fill-primary" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.47 4.73-2.47C22.4 7.73 24 10 24 14.06V24h-5v-8.5c0-2.03-.04-4.65-2.83-4.65-2.83 0-3.27 2.21-3.27 4.49V24H8z" />
                    </svg>
                    <a
                      class="link"
                      :href="member.linkedin"
                      target="_blank"
                      rel="noopener"
                      :aria-label="linkedinAriaLabel(member)"
                    >
                      LinkedIn
                    </a>
                  </div>

                  <div v-if="member.location" class="meta-row">
                    <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" stroke-width="1.6" />
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
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'
import { advisoryBoard as advisoryBoardData } from '@/data/team.data'
import { TeamService } from '@/services/TeamService'
import '@/assets/pages/network.css'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

const partners = [
  {
    key: 'university-of-bern',
    name: 'Gender Parity',
    type: 'Academic Partner',
    description: 'RLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere.',
    logo: '/images/logos/network/GQUAL.png',
    url: 'https://gqualcampaign.org/',
  },
  {
    key: 'partner-two',
    name: 'International Gender Champions',
    type: 'Research Partner in International Representation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere.',
    logo: '/images/logos/network/IGC.png',
    url: 'https://genderchampions.com/hub/geneva',
  },
  {
    key: 'partner-three',
    name: 'World Trade Organization',
    type: 'Network Partner',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non risus ac nulla luctus tincidunt. Maecenas at arcu non justo aliquam posuere.',
    logo: '/images/logos/network/wto.png',
    url: 'https://www.wto.org/',
  },
]

const advisoryBoard = computed(() => TeamService.normalizeMembers(advisoryBoardData))

const initials = TeamService.initials
const mailto = TeamService.mailto
const portraitAlt = TeamService.portraitAlt
const emailAriaLabel = TeamService.emailAriaLabel
const linkedinAriaLabel = TeamService.linkedinAriaLabel
</script>

