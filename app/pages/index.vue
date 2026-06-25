<script setup lang="ts">
import WelcomeToast from "~/components/ui/WelcomeToast.vue";

useSeoMeta({
  title: 'Développeur web Fullstack freelance',
  description: 'Jonathan Loré, développeur web Fullstack freelance basé en France. Spécialisé Vue/Nuxt, Symfony, Laravel et DevOps. Disponible pour vos projets.',
  ogTitle: 'Développeur web Fullstack freelance - Jonathan Loré',
  ogDescription: 'Jonathan Loré, développeur web Fullstack freelance basé en France. Spécialisé Vue/Nuxt, Symfony, Laravel et DevOps.',
  ogUrl: 'https://jonathanlore.fr',
  ogType: 'website',
  ogImage: 'https://jonathanlore.fr/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterImage: 'https://jonathanlore.fr/og-image.png',
})
</script>
<template>
  <WelcomeToast />
  <SectionHero/>
  <div class="relative min-h-screen bg-bg" style="z-index: 20">
    <SectionAbout/>
    <SectionProjects/>
    <SectionExperiences/>
    <SectionContact/>
  </div>
</template>