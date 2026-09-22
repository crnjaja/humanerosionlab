<template>
  <div class="project-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--project">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>CURRENT PROJECT
          </div>
          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            HUMAN <span class="accent">EROSION</span>
          </h1>
          <p class="hero-subtitle">
            Reimagining international law for climate migration, temporal justice and the protection
            of human integrity in a progressively uninhabitable planet.
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
        <div class="project-hero-offset">
          <section class="project-section project-intro" aria-labelledby="project-title">
            <div class="section-topline">
              <div><h2 id="project-title" class="section-heading">Project</h2></div>
            </div>
            <div class="project-feature-grid">
              <article class="project-statement-card">
                <span class="statement-eyebrow">Core vision</span>
                <h3>Safeguarding the integrity of the human</h3>
                <p>
                  HUMAN EROSION bridges protection gaps opened by the intersection of climate
                  change, human mobility and time. Through empirical case studies and legal theory,
                  it asks how international law can respond when displacement unfolds slowly,
                  unevenly and across multiple temporal horizons.
                </p>
              </article>
              <dl class="project-facts" aria-label="Project facts">
                <div v-for="fact in facts" :key="fact.label" class="fact-card">
                  <dt>{{ fact.label }}</dt>
                  <dd>{{ fact.value }}</dd>
                </div>
              </dl>
            </div>
          </section>
          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>

          <section class="project-section" aria-labelledby="timeline-title">
            <div class="section-topline">
              <div><h2 id="timeline-title" class="section-heading">Timeline</h2></div>
            </div>
            <div class="timeline-shell" aria-label="Project timeline from year one to year five">
              <div class="timeline-years" aria-hidden="true">
                <span v-for="year in years" :key="year">Year {{ year }}</span>
              </div>
              <div class="timeline-rows">
                <article
                  v-for="item in timeline"
                  :key="item.key"
                  class="timeline-item"
                  :class="workPackageClass(item.workPackage)"
                  :style="timelineStyle(item)"
                >
                  <span>{{ item.workPackage }}</span
                  ><strong>{{ item.title }}</strong
                  ><small>{{ item.owner }}</small>
                </article>
              </div>
            </div>
          </section>

          <ul class="work-package-grid" aria-label="Work packages">
            <li v-for="workPackage in workPackages" :key="workPackage.id" class="work-package-card">
              <span class="case-index">{{ workPackage.index }}</span>
              <div>
                <h3>
                  <span>{{ workPackage.title }}</span
                  ><span class="work-package-subtitle">{{ workPackage.subtitle }}</span>
                </h3>
                <p>{{ workPackage.description }}</p>
                <p class="work-package-aims">Aims: {{ workPackage.aims }}</p>
              </div>
            </li>
          </ul>
          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>

          <section class="project-section" aria-labelledby="map-title">
            <div class="section-topline">
              <div><h2 id="map-title" class="section-heading">Case Studies</h2></div>
            </div>
            <ul class="case-grid" aria-label="Regional case studies">
              <li v-for="study in caseStudies" :key="study.key" class="case-card">
                <span class="case-index">{{ study.index }}</span>
                <div>
                  <h3>{{ study.region }}</h3>
                  <p>{{ study.description }}</p>
                </div>
              </li>
            </ul>
            <div class="word-map" aria-label="Detailed map of climate mobility routes">
              <img
                class="world-map-layer"
                src="/world-map-detailed.svg"
                alt=""
                aria-hidden="true"
              />
              <div class="map-glow" aria-hidden="true"></div>
              <svg
                class="map-routes"
                viewBox="0 0 1000 520"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <filter id="hel-route-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0.02 0 0 0 0 0.42 0 0 0 0 0.44 0 0 0 .55 0"
                      result="glow"
                    />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g
                  v-for="route in mapRoutes"
                  :key="route.key"
                  class="route-group"
                  :style="routeStyle(route)"
                >
                  <path
                    class="route-line route-line--aura"
                    :class="route.className"
                    :d="route.path"
                  />
                  <path
                    class="route-line route-line--rail"
                    :class="route.className"
                    :d="route.path"
                  />
                  <path
                    class="route-line route-line--reveal"
                    :class="route.className"
                    :d="route.path"
                  />
                  <path
                    class="route-line route-line--particles"
                    :class="route.className"
                    :d="route.path"
                  />
                </g>
              </svg>
              <div
                v-for="point in mapPoints"
                :key="point.key"
                class="map-point"
                :class="[point.type, point.labelClass]"
                :style="pointStyle(point)"
              >
                <span class="map-dot" aria-hidden="true"></span
                ><span class="map-label">{{ point.label }}</span>
              </div>
            </div>
          </section>
          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>

          <section class="project-section" aria-labelledby="outputs-title">
            <div class="section-topline">
              <div><h2 id="outputs-title" class="section-heading">Outputs</h2></div>
            </div>
            <div class="output-grid">
              <article v-for="group in outputs" :key="group.key" class="output-card">
                <span class="output-eyebrow">{{ group.type }}</span>
                <h3>{{ group.title }}</h3>
                <ul>
                  <li v-for="item in group.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </section>
          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'
import { HelService } from '@/services/HelService'
import '@/assets/pages/hel.css'

const { el: heroTitleEl } = useWordReveal({ stagger: 140, duration: 1300 })
const years = HelService.years()
const facts = HelService.facts
const caseStudies = HelService.caseStudies
const workPackages = HelService.workPackages
const timeline = HelService.timeline
const mapPoints = HelService.mapPoints
const mapRoutes = HelService.mapRoutes
const outputs = HelService.outputs

function workPackageClass(workPackage) {
  return HelService.workPackageClass(workPackage)
}
function timelineStyle(item) {
  return HelService.timelineStyle(item)
}
function pointStyle(point) {
  return HelService.pointStyle(point)
}
function routeStyle(route) {
  return HelService.routeStyle(route)
}
</script>
