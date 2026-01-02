<template>
  <section class="page full-bleed">
    <div class="container page-inner">
      <div class="page-card">
        <div class="section-head">
          <h1 class="page-title">Contact</h1>
          <div class="section-underline" aria-hidden="true"></div>
        </div>

        <form class="form" @submit.prevent>
          <label class="field">
            <span>Nom</span>
            <input type="text" placeholder="Votre nom" />
          </label>

          <label class="field">
            <span>Email</span>
            <input type="email" placeholder="vous@exemple.com" />
          </label>

          <label class="field">
            <span>Message</span>
            <textarea rows="5" placeholder="Votre message…"></textarea>
          </label>

          <button class="btn btn--primary" type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  </section>
</template>
