<script setup lang="ts">
const { activeHash, setManualScroll } = useActiveSection()
const { y: scrollY } = useWindowScroll()
const { width } = useWindowSize()

const links: { label: string; to: string }[] = [
  { label: 'Accueil',  to: '/#hero' },
  { label: 'À propos', to: '/#about' },
  { label: 'Projets',  to: '/#projects' },
  { label: 'Parcours', to: '/#experiences' },
  { label: 'Contact',  to: '/#contact' },
]

const heroHeight = ref(0)
onMounted(() => {
  const hero = document.getElementById('hero')
  if (hero) heroHeight.value = hero.offsetHeight
})

const isScrolled = computed(() => scrollY.value > heroHeight.value * 0.8)
const isMobile = computed(() => width.value < 1024)

// ── Menu ────────────────────────────────────────────────────
const isOpen = ref(false)

function openDrawer() {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeDrawer() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function toggleDrawer() {
  isOpen.value ? closeDrawer() : openDrawer()
}

const handleLinkClick = (hash: string) => {
  setManualScroll()
  activeHash.value = hash
  closeDrawer()
}

watch(isMobile, (mobile) => {
  if (!mobile) closeDrawer()
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar-wrapper" :class="{ 'navbar-wrapper--scrolled': isScrolled }">

    <!-- ── Desktop ──────────────────────────────────────── -->
    <div class="navbar-outer navbar-outer--desktop">
      <NuxtLink to="/" class="navbar-logo" aria-label="Accueil">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38" fill="none">
          <path d="M0.500002 27.5695L0.500003 9.56955L17 0.569549L33.5 9.56955L33.5 27.5695L17 36.5695L0.500002 27.5695Z" stroke="#0DCDEF"/>
          <path d="M25.9284 24.2899L27.3237 24.8399L25.9284 25.4476H21.2192L18.9518 23.8865V11.6207L20.696 14.9635C20.696 14.9635 19.9983 22.3966 20.696 23.4724C21.3936 24.5481 25.9284 24.2899 25.9284 24.2899Z" fill="#0DCDEF"/>
          <path d="M7.7503 24.2899L6.35498 24.8399L7.7503 25.4476H12.4595L14.7269 23.8865V11.6207L12.9827 14.9635C12.9827 14.9635 13.6804 22.3966 12.9827 23.4724C12.2851 24.5481 7.7503 24.2899 7.7503 24.2899Z" fill="#0DCDEF"/>
        </svg>
      </NuxtLink>

      <nav class="navbar" aria-label="Navigation principale">
        <ul class="navbar__links">
          <li v-for="link in links" :key="link.to">
            <a :href="link.to" class="nav-link" :class="{ 'nav-link--active': activeHash === '#' + link.to.split('#')[1] }" @click="handleLinkClick('#' + link.to.split('#')[1])">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- ── Mobile ──────────────────────────────────────── -->
    <div class="navbar-mobile">
      <NuxtLink to="/" class="navbar-logo" :class="{ 'navbar-logo--hidden': isOpen }" aria-label="Accueil" @click="closeDrawer">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38" fill="none">
          <path d="M0.500002 27.5695L0.500003 9.56955L17 0.569549L33.5 9.56955L33.5 27.5695L17 36.5695L0.500002 27.5695Z" stroke="#0DCDEF"/>
          <path d="M25.9284 24.2899L27.3237 24.8399L25.9284 25.4476H21.2192L18.9518 23.8865V11.6207L20.696 14.9635C20.696 14.9635 19.9983 22.3966 20.696 23.4724C21.3936 24.5481 25.9284 24.2899 25.9284 24.2899Z" fill="#0DCDEF"/>
          <path d="M7.7503 24.2899L6.35498 24.8399L7.7503 25.4476H12.4595L14.7269 23.8865V11.6207L12.9827 14.9635C12.9827 14.9635 13.6804 22.3966 12.9827 23.4724C12.2851 24.5481 7.7503 24.2899 7.7503 24.2899Z" fill="#0DCDEF"/>
        </svg>
      </NuxtLink>

      <button
          class="navbar-burger"
          :class="{ 'navbar-burger--open': isOpen }"
          @click="toggleDrawer"
          :aria-expanded="isOpen"
          aria-label="Menu"
      >
        <svg class="navbar-burger__svg" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
          <rect class="navbar-burger__bar navbar-burger__bar--top" x="4.375" y="5.833" width="26.25" height="2.917" rx="1" fill="#1AD792"/>
          <rect class="navbar-burger__bar navbar-burger__bar--mid" x="13.125" y="16.042" width="17.5" height="2.917" rx="1" fill="#1AD792"/>
          <rect class="navbar-burger__bar navbar-burger__bar--bot" x="4.375" y="26.25" width="26.25" height="2.917" rx="1" fill="#1AD792"/>
        </svg>
      </button>
    </div>

  </header>

  <!-- ── Overlay ──────────────────────────────────────── -->
  <Teleport to="body">
    <Transition name="navbar-overlay">
      <div v-if="isOpen" class="navbar-overlay" @click="closeDrawer" aria-hidden="true" />
    </Transition>
  </Teleport>

  <!-- ── Drawer ────────────────────────────────────────── -->
  <Teleport to="body">
    <Transition name="navbar-drawer">
      <nav v-if="isOpen" class="navbar-drawer" aria-label="Navigation mobile">
        <ul class="navbar-drawer__links">
          <li v-for="link in links" :key="link.to">
            <a :href="link.to" class="navbar-drawer__link" :class="{ 'navbar-drawer__link--active': activeHash === '#' + link.to.split('#')[1] }" @click="handleLinkClick('#' + link.to.split('#')[1])">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </Teleport>

</template>