<script setup lang="ts">
useSeoMeta({
  title: 'Développeur web Fullstack freelance',
  description: 'Jonathan Loré, développeur web Fullstack freelance basé en France. Spécialisé Vue/Nuxt, Symfony, Laravel et DevOps. Disponible pour vos projets.',
  ogTitle: 'Développeur web Fullstack freelance - Jonathan Loré',
  ogDescription: 'Jonathan Loré, développeur web Fullstack freelance basé en France. Spécialisé Vue/Nuxt, Symfony, Laravel et DevOps.',
  ogUrl: 'https://jonathanlore.fr',
  ogType: 'website',
  twitterCard: 'summary',
})
</script>
<template>
  <SectionHero/>
  <div class="relative min-h-screen bg-bg" style="z-index: 20">
    <SectionAbout/>
    <SectionProjects/>
    <SectionExperiences/>
    <SectionContact/>
  </div>
</template>