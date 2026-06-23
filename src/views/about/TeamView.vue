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
                      :alt="portraitAlt(member)"
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
                      :href="mailto(member.email)"
                      :aria-label="emailAriaLabel(member)"
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
                      :aria-label="linkedinAriaLabel(member)"
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
                      :alt="portraitAlt(member)"
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
                      :href="mailto(member.email)"
                      :aria-label="emailAriaLabel(member)"
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
                      :aria-label="linkedinAriaLabel(member)"
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
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'
import { coreTeam as coreTeamData, advisoryBoard as advisoryBoardData } from '@/data/team.data'
import { TeamService } from '@/services/TeamService'
import '@/assets/pages/team.css'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

const coreTeam = computed(() => TeamService.normalizeMembers(coreTeamData))
const visitingAlumni = computed(() => TeamService.normalizeMembers(advisoryBoardData))

const initials = TeamService.initials
const mailto = TeamService.mailto
const portraitAlt = TeamService.portraitAlt
const emailAriaLabel = TeamService.emailAriaLabel
const linkedinAriaLabel = TeamService.linkedinAriaLabel
</script>
