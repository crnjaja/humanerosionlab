<template>
<header class="header">
  <div class="container header__inner">
    <RouterLink class="brand" to="/">
      <img class="brand__logo" src="/files/logo.png" alt="Logo" />
      <span class="brand__text">
        <span class="brand__name">Le P'tit Dodu</span>
        <span class="brand__tag">Site personnel</span>
      </span>
    </RouterLink>

    <nav class="nav">
      <RouterLink class="nav__link" to="/">Accueil</RouterLink>
      <RouterLink class="nav__link" to="/experience">Expérience</RouterLink>
      <RouterLink class="nav__link" to="/le-bon">Le Bon</RouterLink>
      <RouterLink class="nav__link" to="/contact">Contact</RouterLink>
    </nav>
  </div>
</header>

</template>

<script setup lang="ts"></script>
