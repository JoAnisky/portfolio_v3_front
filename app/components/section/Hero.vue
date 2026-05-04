<script setup lang="ts">
const heroRef = ref<HTMLElement | null>(null)
const { applyParallax } = useParallax()

applyParallax(heroRef)
</script>
<template>
  <section class="hero" ref="heroRef">

    <!-- Couches parallax -->
    <div class="hero__layer hero__layer--sky" data-depth="0.01"></div>

    <div class="hero__layer hero__layer--moon " data-depth="0.06"></div>

    <!-- Hero title-->
    <div class="hero__layer hero__content" data-depth="0.08">
      <p class="hero__intro">Bonjour, je suis</p>
      <h1 class="hero__title">Jonathan Loré</h1>
      <span class="hero__badge">Développeur web Fullstack</span>
      <p class="hero__tagline">De la vision à la production, je construis des expériences qui ont du sens.</p>
    </div>

    <div class="hero__layer hero__layer--mountain-1 hero__layer--bottom" data-depth="0.10"></div>

    <div class="hero__layer hero__layer--mountain-1-trees hero__layer--bottom" data-depth="0.12"></div>

    <div class="hero__layer hero__layer--lake hero__layer--bottom " data-depth="0.14"></div>

    <div class="hero__layer hero__layer--trees-1 hero__layer--bottom " data-depth="0.25"></div>

    <div class="hero__layer hero__layer--cliff hero__layer--bottom " data-depth="0.32"></div>

    <div class="hero__layer hero__layer--mountain-2 hero__layer--bottom " data-depth="0.36"></div>

    <div class="hero__layer hero__layer--trees-2 hero__layer--bottom ]" data-depth="0.44"></div>

    <div class="hero__layer hero__layer--mountain-3 hero__layer--bottom ]" data-depth="0.49"></div>

    <!-- Brume seule (dégradés radiaux, mix-blend-mode) -->
    <div class="hero__layer hero__layer--brume hero__layer--bottom hero__layer--exclusion" data-depth="1"></div>

    <!-- Arbres seuls -->
    <div class="hero__layer hero__layer--trees-3 hero__layer--bottom" data-depth="1"></div>

  </section>
</template>