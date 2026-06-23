<template>
  <div class="contact-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            contact
          </div>

          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            Get in <span class="accent">touch</span>
          </h1>

          <p class="hero-subtitle">Reach out for collaborations, questions, or media requests.</p>

          <div class="hero-actions hero-socials" aria-label="Social media links">
            <a
              v-for="social in socials"
              :key="social.key"
              :class="ContactService.socialClass(social)"
              :href="social.url"
              target="_blank"
              rel="noopener"
              :aria-label="social.label"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path v-if="social.iconPath" :d="social.iconPath" />
                <path v-for="path in social.iconPaths || []" :key="path" :d="path" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset">
          <section class="feature-section" aria-label="Contact content">
            <h2 class="section-heading">Contact</h2>

            <div class="contact-grid">
              <article class="contact-card" id="contact" aria-label="Contact form">
                <div class="card-head">
                  <div class="pill">Message</div>
                </div>

                <form class="contact-form" novalidate @submit.prevent="onSubmit">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      id="name"
                      v-model.trim="form.name"
                      :class="{ 'error-border': errors.name }"
                      type="text"
                      name="from_name"
                      autocomplete="name"
                    />
                    <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                  </div>

                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                      id="email"
                      v-model.trim="form.email"
                      :class="{ 'error-border': errors.email }"
                      type="email"
                      name="from_email"
                      autocomplete="email"
                      inputmode="email"
                    />
                    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                  </div>

                  <div class="form-group form-group--textarea">
                    <label for="message">Your message</label>
                    <textarea
                      id="message"
                      v-model="form.message"
                      :class="{ 'error-border': errors.message }"
                      name="message"
                      rows="7"
                      maxlength="400"
                    ></textarea>

                    <small
                      class="char-count"
                      :class="{ 'char-count--warn': form.message.length > 360 }"
                    >
                      {{ form.message.length }} / 400 characters
                    </small>

                    <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
                  </div>

                  <div class="form-actions">
                    <button class="btn btn--primary btn-submit" type="submit" :disabled="isSending">
                      <span aria-hidden="true">✉️</span>
                      <span>{{ isSending ? 'Sending…' : 'Send Message' }}</span>
                    </button>
                  </div>

                  <output
                    v-if="response.message"
                    class="response-msg"
                    :class="response.ok ? 'response-msg--ok' : 'response-msg--error'"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {{ response.message }}
                  </output>
                </form>
              </article>

              <aside class="location-card" id="location" aria-label="Location">
                <div class="card-head">
                  <div class="pill">Location</div>
                </div>

                <div class="map-frame" aria-label="Google map">
                  <iframe
                    title="Map — World Trade Institute"
                    :src="location.mapUrl"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                  ></iframe>
                </div>

                <div class="location-meta">
                  <img class="wti-logo" :src="location.logo" alt="WTI Logo" loading="lazy" />
                  <address class="address">
                    <strong>{{ location.name }}</strong
                    ><br />
                    {{ location.street }}<br />
                    {{ location.postalCode }} {{ location.city }}<br />
                    {{ location.country }}
                  </address>
                </div>

                <div class="location-actions">
                  <a
                    class="btn btn--primary btn-directions"
                    :href="location.directionsUrl"
                    target="_blank"
                    rel="noopener"
                  >
                    📍 Get Directions
                  </a>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import { useWordReveal } from '@/composables/useWordReveal'
import { CONTACT_CONFIG } from '@/data/contact.data'
import { ContactService } from '@/services/ContactService'
import '@/assets/pages/contact.css'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

const socials = CONTACT_CONFIG.socials
const location = CONTACT_CONFIG.location

const form = reactive(ContactService.createEmptyForm())
const errors = reactive(ContactService.createEmptyErrors())
const response = reactive(ContactService.createEmptyResponse())
const isSending = ref(false)

onMounted(() => {
  emailjs.init(CONTACT_CONFIG.emailjs.publicKey)
})

async function onSubmit() {
  ContactService.resetResponse(response)
  ContactService.resetErrors(errors)

  const validation = ContactService.validate(form)

  if (!validation.valid) {
    Object.assign(errors, validation.errors)
    return
  }

  isSending.value = true

  try {
    await emailjs.send(
      CONTACT_CONFIG.emailjs.serviceId,
      CONTACT_CONFIG.emailjs.templateId,
      ContactService.buildEmailPayload(form),
    )

    ContactService.setSuccess(response)
    ContactService.resetForm(form)

    globalThis.setTimeout(() => {
      response.message = ''
    }, 5000)
  } catch (err) {
    ContactService.setError(response)
    console.error(err)
  } finally {
    isSending.value = false
  }
}
</script>
