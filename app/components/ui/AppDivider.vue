<script setup lang="ts">
const id = useId()
const g0 = `divider-g0-${id}`
const g1 = `divider-g1-${id}`
</script>

<template>
  <div aria-hidden="true" class="max-w-[1100px] mx-auto">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3" viewBox="0 0 1340 3" preserveAspectRatio="none" fill="none">
      <path d="M211 2L701 0L1191 2H701H211Z" :fill="`url(#${g0})`"/>
      <path d="M0 2L670 3L1340 2H670H0Z" :fill="`url(#${g1})`"/>
      <defs>
        <linearGradient :id="g0" x1="701" y1="0" x2="701" y2="2" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0DCDEF" offset="0"/>
          <stop offset="1" stop-color="#1AD792"/>
        </linearGradient>
        <linearGradient :id="g1" x1="670" y1="3" x2="670" y2="2" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0DCDEF" offset="0"/>
          <stop offset="1" stop-color="#1AD792"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>