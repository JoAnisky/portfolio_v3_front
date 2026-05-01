<script setup lang="ts">
import HeroSection from "~/components/sections/HeroSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import ProjectsSection from "~/components/sections/ProjectsSection.vue";
</script>
<template>
  <HeroSection/>
  <div class="relative min-h-screen bg-bg" style="z-index: 20">
    <AboutSection/>
    <ProjectsSection/>
  </div>
</template>