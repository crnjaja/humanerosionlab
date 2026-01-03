<!-- src/views/ContactView.vue -->
<template>
  <div class="contact-page">
    <!-- TOP HERO (same language as your Project page) -->
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
              class="social-box facebook"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7
           1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12H16l-.4 3h-2.2v7A10 10 0 0 0 22 12z"
                />
              </svg>
            </a>

            <a
              class="social-box linkedin"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4.98 3.5A2.48 2.48 0 1 0 5 8.5a2.48 2.48 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-.9
        1.7-1.9 3.6-1.9 3.9 0 4.6 2.5 4.6 5.8V21h-4v-5.3c0-1.3 0-3-1.9-3s-2.2
        1.4-2.2 2.9V21H9z"
                />
              </svg>
            </a>

            <a
              class="social-box youtube"
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M23.5 6.2s-.2-1.6-.8-2.3c-.7-.8-1.6-.8-2-0.9C17.8 2.5
        12 2.5 12 2.5h0s-5.8 0-8.7.5c-.4.1-1.3.1-2 .9-.6.7-.8
        2.3-.8 2.3S0 8 0 9.8v1.7c0 1.8.5 3.6.5 3.6s.2
        1.6.8 2.3c.7.8 1.7.8 2.1.9 1.5.1 6.6.5
        8.6.5s5.8 0 8.7-.5c.4-.1 1.3-.1 2-.9
        .6-.7.8-2.3.8-2.3s.5-1.8.5-3.6V9.8c0-1.8-.5-3.6-.5-3.6zM9.8 14.6V7.9l6.2 3.4-6.2 3.3z"
                />
              </svg>
            </a>

            <a
              class="social-box x"
              href="https://x.com/"
              target="_blank"
              rel="noopener"
              aria-label="X (formerly Twitter)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18.9 2H22l-7.4 8.5L23 22h-6.6l-5.2-6.8L5.6 22H2.5l7.9-9.1L1 2h6.7
         l4.7 6.1L18.9 2zm-1.1 18h1.8L6.7 4h-1.9l13 16z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset">
          <section class="feature-section" aria-label="Contact content">
            <h2 class="section-heading">Contact</h2>

            <div class="contact-grid">
              <!-- LEFT: FORM -->
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
                      @input="onMessageInput"
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

              <!-- RIGHT: LOCATION -->
              <aside class="location-card" id="location" aria-label="Location">
                <div class="card-head">
                  <div class="pill">Location</div>
                </div>

                <div class="map-frame" aria-label="Google map">
                  <iframe
                    title="Map — World Trade Institute"
                    src="https://www.google.com/maps?q=Hallerstrasse+6,3012+Bern,Switzerland&output=embed"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                  ></iframe>
                </div>

                <div class="location-meta">
                  <img class="wti-logo" src="/images/logos/WTI.png" alt="WTI Logo" loading="lazy" />
                  <address class="address">
                    <strong>World Trade Institute</strong><br />
                    Hallerstrasse 6<br />
                    3012 Bern<br />
                    Switzerland
                  </address>
                </div>

                <div class="location-actions">
                  <a
                    class="btn btn--primary btn-directions"
                    href="https://www.google.com/maps/dir//Hallerstrasse+6,+3012+Bern,+Switzerland"
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

/** Same animation settings as homepage */
const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

/**
 * EmailJS config
 * - Replace with your real values (kept from your HTML example).
 */
const EMAILJS_PUBLIC_KEY = '6jwcoTo9J7a9hsz9I'
const EMAILJS_SERVICE_ID = 'service_z7aivyd'
const EMAILJS_TEMPLATE_ID = 'template_c111oep'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const response = reactive({
  ok: false,
  message: '',
})

const isSending = ref(false)

onMounted(() => {
  emailjs.init(EMAILJS_PUBLIC_KEY)
})

function clearErrors() {
  errors.name = ''
  errors.email = ''
  errors.message = ''
}

function sanitize(str) {
  // Keep it simple + safe: trim and remove potential invisible junk.
  // (EmailJS sends plain strings; Vue already escapes rendered output.)
  return String(str || '')
    .replaceAll('\u0000', '')
    .trim()
}

function validate() {
  clearErrors()
  let ok = true

  const name = sanitize(form.name)
  const email = sanitize(form.email)
  const message = sanitize(form.message)

  if (!name) {
    errors.name = 'Name is required.'
    ok = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    errors.email = 'Email is required.'
    ok = false
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.'
    ok = false
  }

  if (!message) {
    errors.message = 'Message is required.'
    ok = false
  } else if (message.length < 20) {
    errors.message = 'Message must be at least 20 characters.'
    ok = false
  } else if (message.length > 400) {
    errors.message = 'Message must be under 400 characters.'
    ok = false
  }

  return ok
}

function onMessageInput() {
  // no-op placeholder (kept for readability / future hooks)
}

async function onSubmit(e) {
  response.message = ''
  response.ok = false

  if (!validate()) return

  isSending.value = true

  try {
    // Send using the same template fields: from_name, from_email, message
    const payload = {
      from_name: sanitize(form.name),
      from_email: sanitize(form.email),
      message: sanitize(form.message),
    }

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload)

    response.ok = true
    response.message = '✅ Message sent successfully!'
    form.name = ''
    form.email = ''
    form.message = ''

    globalThis.setTimeout(() => {
      response.message = ''
    }, 5000)
  } catch (err) {
    response.ok = false
    response.message = `❌ Failed to send message. Please try again.`
    // If you want more detail in dev:
    console.error(err)
  } finally {
    isSending.value = false
  }
}
</script>

<style scoped>
/* Layout */
.contact-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: var(--gap);

  align-items: stretch;
}

@media (max-width: 980px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

/* Card base (match your current “panel” look: white, border, soft shadow, square corners) */
.contact-card,
.location-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft-3);
  overflow: hidden;
  position: relative;
}

/* Top accent line (like your old HTML’s ::before but aligned with your site gradient) */
.contact-card::before,
.location-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 5px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}

/* Head */
.card-head {
  padding: 18px 18px 0;
}

.card-title {
  margin: 0;
  font-size: 22px;
  font-weight: 950;
  color: var(--navy);
  letter-spacing: -0.01em;
}

.card-subtitle {
  margin: 8px 0 0;
  color: rgba(11, 31, 51, 0.7);
  line-height: 1.6;
  font-size: 14px;
}

/* Form */
.contact-form {
  padding: 18px;
  display: grid;
  gap: 14px;
}

.form-group {
  display: grid;
  gap: 6px;
  position: relative;
}

.form-group label {
  font-size: 14px;
  font-weight: 900;
  color: rgba(11, 31, 51, 0.82);
  letter-spacing: 0.01em;
  text-transform: none;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid rgba(10, 34, 59, 0.18);
  padding: 12px 12px;
  font-size: 15px;
  color: var(--ink);
  background: #fff;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: rgba(216, 75, 139, 0.55);
  box-shadow: 0 0 0 4px rgba(216, 75, 139, 0.18);
}

.form-group textarea {
  resize: vertical;
  min-height: 160px;
}

.form-group--textarea {
  padding-bottom: 2px;
}

.char-count {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
  color: rgba(11, 31, 51, 0.6);
  background: rgba(255, 255, 255, 0.88);
  padding: 2px 6px;
  border: 1px solid rgba(10, 34, 59, 0.12);
}

.char-count--warn {
  color: rgba(216, 75, 139, 0.95);
  border-color: rgba(216, 75, 139, 0.35);
}

.error-border {
  border-color: rgba(205, 57, 57, 0.85) !important;
  box-shadow: 0 0 0 4px rgba(205, 57, 57, 0.12) !important;
}

.error-message {
  font-size: 13px;
  color: rgba(205, 57, 57, 0.95);
  font-weight: 800;
}

/* Actions */
.form-actions {
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.btn-submit {
  gap: 10px;
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none !important;
}

.response-msg {
  margin: 2px 0 0;
  font-weight: 900;
  font-size: 14px;
  text-align: center;
}

.response-msg--ok {
  color: rgba(24, 135, 64, 0.98);
}

.response-msg--error {
  color: rgba(205, 57, 57, 0.98);
}

/* Location */
.location-card {
  padding-bottom: 16px;
}

.map-frame {
  padding: 14px 18px 0;
}

.map-frame iframe {
  width: 100%;
  height: 288px;
  border: 0;
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft-3);
  border: 1px solid rgba(10, 34, 59, 0.12);
}

.location-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding: 14px 18px 0;
}

@media (max-width: 520px) {
  .location-meta {
    flex-direction: column;
    text-align: center;
  }
}

.wti-logo {
  width: 250px;
  height: auto;
  display: block;
  filter: saturate(1.05);
}

.address {
  margin: 0;
  font-style: normal;
  color: rgba(11, 31, 51, 0.78);
  line-height: 1.65;
  font-size: 14px;
}

.location-actions {
  display: flex;
  justify-content: center;
  padding: 14px 18px 0;
}

/* PROJECT PAGE: flat/square banner (no V shape) + smaller height */
:deep(.stage--top--flat) {
  min-height: clamp(320px, 46vh, 520px);
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px;
}
:deep(.stage--top--flat::after) {
  content: none !important;
}
:deep(.contact-page .hero-offset) {
  margin-top: 0;
}
/* Social boxes in hero */
.hero-socials {
  display: flex;
  gap: 14px;
  margin-top: 10px;
}

/* Base box */
.social-box {
  width: 54px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius);

  transition:
    transform 160ms ease,
    background 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.social-box svg {
  width: 22px;
  height: 22px;
  fill: #ffffff;
}

/* Hover */
.social-box:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(216, 75, 139, 0.6);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
}

/* Optional: platform accent hint (subtle, not loud) */
.social-box.facebook:hover {
  border-color: #1877f2;
}
.social-box.linkedin:hover {
  border-color: #0a66c2;
}
.social-box.youtube:hover {
  border-color: #ff0033;
}
.social-box.twitter:hover {
  border-color: #1da1f2;
}

/* Mobile spacing */
@media (max-width: 520px) {
  .hero-socials {
    justify-content: center;
  }
}
.contact-card::before {
  display: none;
}
</style>
