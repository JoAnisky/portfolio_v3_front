<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- Compteurs animés ---
interface Counter {
  label: string
  target: number
  suffix: string
  current: number
}

const counters = ref<Counter[]>([
  { label: "ans d'expérience",          target: 4,   suffix: '+',  current: 0 },
  { label: 'contributions à des projets', target: 10,  suffix: '+',  current: 0 },
  { label: 'technologies utilisées',    target: 8,   suffix: '+',  current: 0 },
  { label: 'remote-friendly',           target: 100, suffix: '%',  current: 0 },
])

const countersStarted = ref(false)
const countersRef = ref<HTMLElement | null>(null)

function animateCounters() {
  if (countersStarted.value) return
  countersStarted.value = true

  counters.value.forEach((counter) => {
    const duration = 1600
    const steps = 60
    const increment = counter.target / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), counter.target)
      counter.current = current
      if (current >= counter.target) clearInterval(timer)
    }, duration / steps)
  })
}

// --- Cards ---
interface Card {
  icon: string
  title: string
  description: string
}

const cards: Card[] = [
  {
    icon: '⚡',
    title: 'Autonomie totale',
    description: 'Du brief au déploiement, un seul interlocuteur',
  },
  {
    icon: '🧩',
    title: 'Code maintenable',
    description: 'Tests, documentation, bonnes pratiques',
  },
  {
    icon: '🚀',
    title: 'Stack moderne',
    description: 'Nuxt, Symfony, Laravel, Docker, Kubernetes',
  },
  {
    icon: '🎯',
    title: 'Vision produit',
    description: 'Je pense au-delà du ticket',
  },
]

// --- IntersectionObserver ---
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!countersRef.value) return
  observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) animateCounters()
      },
      { threshold: 0.3 },
  )
  observer.observe(countersRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section id="about" class="about">
    <!-- En-tête de section -->
    <div class="section-header">
      <h2 class="section-title">À propos</h2>
      <p class="section-quote">
        "L'espace entre une idée et sa réalité, c'est là que je travaille."
      </p>
    </div>

    <!-- Layout principal 2 colonnes -->
    <div class="about__main">
      <!-- Colonne gauche : photo + réseaux -->
      <div class="about__left">
        <!-- Icônes réseaux sociaux -->
        <div class="about__socials">
          <a href="https://www.linkedin.com/in/jonathanlore42" target="_blank" rel="noopener noreferrer" class="about__social-link" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="40" viewBox="0 0 39 40" fill="none">
              <rect x="0.5" y="0.5" width="37.4877" height="39" rx="4.5" stroke="currentColor"/>
              <path opacity="0.7" d="M14.5171 13.4608C14.5168 13.9563 14.3198 14.4314 13.9692 14.7817C13.6186 15.1319 13.1433 15.3285 12.6477 15.3282C12.1522 15.328 11.6771 15.1309 11.3269 14.7803C10.9766 14.4298 10.78 13.9544 10.7803 13.4589C10.7805 12.9634 10.9776 12.4882 11.3282 12.138C11.6787 11.7878 12.1541 11.5912 12.6496 11.5914C13.1451 11.5917 13.6203 11.7888 13.9705 12.1393C14.3207 12.4899 14.5173 12.9652 14.5171 13.4608ZM14.5731 16.7118H10.8363V28.408H14.5731V16.7118ZM20.4773 16.7118H16.7592V28.408H20.4399V22.2703C20.4399 18.8511 24.8961 18.5335 24.8961 22.2703V28.408H28.5862V20.9998C28.5862 15.2358 21.9907 15.4506 20.4399 18.2813L20.4773 16.7118Z" fill="currentColor"/>
            </svg>
          </a>
          <a href="https://www.malt.fr/profile/jonathanlore" target="_blank" rel="noopener noreferrer" class="about__social-link" aria-label="Malt">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="0.5" y="0.5" width="39" height="39" rx="4.5" stroke="currentColor"/>
              <path opacity="0.7" d="M21.5341 25.0069L20.8705 25.6915L22.8267 27.7062C23.7874 28.6973 25.3232 29.6557 26.758 28.1757C27.8293 27.0673 27.5796 25.91 26.9887 24.9809C26.799 24.9939 21.5341 25.0069 21.5341 25.0069ZM18.4909 17.4274L19.1545 16.7428L17.2331 14.764C16.2724 13.7762 14.8155 12.7395 13.305 14.2978C12.1957 15.4388 12.4422 16.5537 13.03 17.46L18.4909 17.4274ZM27.5291 18.7836C25.9419 20.4442 24.3502 22.1003 22.754 23.7518H26.4009C27.7598 23.7518 29.501 23.4226 29.501 21.2188C29.501 19.6018 28.5656 18.9922 27.5291 18.7836ZM17.2773 18.6825H13.5767C12.2178 18.6825 10.4766 19.1226 10.4766 21.2188C10.4766 22.7803 11.4467 23.4226 12.5023 23.6475C12.6287 23.4975 17.2773 18.6825 17.2773 18.6825ZM21.9671 28.593L20.0141 26.5783L18.0927 28.5571C17.9526 28.7008 17.8082 28.84 17.6597 28.9744C17.8809 30.06 18.5003 31.0575 20.0141 31.0575C21.5278 31.0575 22.1504 30.0567 22.3684 28.9679C22.2336 28.8505 22.0998 28.7255 21.9671 28.593ZM18.0927 13.8805L20.0141 15.8593L21.9671 13.8446C22.0964 13.7104 22.2314 13.5821 22.3716 13.4599C22.1662 12.3939 21.5784 11.429 20.0109 11.429C18.4435 11.429 17.8557 12.3972 17.6534 13.4665C17.7967 13.5925 17.941 13.7305 18.0927 13.8805ZM26.758 14.2619C25.3201 12.7819 23.7874 13.7403 22.8267 14.7314L13.7569 24.0876C12.7993 25.0754 11.7944 26.5815 13.305 28.1398C14.8155 29.6981 16.2755 28.6614 17.2331 27.6736L26.3029 18.3174C27.2636 17.3263 28.1927 15.742 26.758 14.2619Z" fill="currentColor"/>
            </svg>
          </a>
          <a href="https://github.com/JoAnisky" target="_blank" rel="noopener noreferrer" class="about__social-link" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="0.5" y="0.5" width="39" height="39" rx="4.5" stroke="currentColor"/>
              <path opacity="0.7" d="M20.3333 10.3975C19.0722 10.3975 17.8235 10.6458 16.6584 11.1284C15.4934 11.611 14.4348 12.3184 13.5431 13.2101C11.7422 15.0109 10.7305 17.4534 10.7305 20.0002C10.7305 24.2447 13.4865 27.8457 17.2988 29.1229C17.7789 29.1997 17.9326 28.902 17.9326 28.6428V27.0199C15.2726 27.5961 14.706 25.7331 14.706 25.7331C14.2643 24.6192 13.6401 24.3215 13.6401 24.3215C12.7663 23.7261 13.7073 23.7453 13.7073 23.7453C14.6676 23.8126 15.1766 24.7344 15.1766 24.7344C16.012 26.194 17.4236 25.7619 17.971 25.5315C18.0574 24.9073 18.3071 24.4848 18.5759 24.2447C16.4441 24.0046 14.2067 23.1788 14.2067 19.5201C14.2067 18.4542 14.5716 17.5996 15.1958 16.9178C15.0997 16.6777 14.7636 15.679 15.2918 14.3826C15.2918 14.3826 16.0984 14.1233 17.9326 15.3621C18.6912 15.1508 19.517 15.0452 20.3333 15.0452C21.1495 15.0452 21.9753 15.1508 22.734 15.3621C24.5681 14.1233 25.3747 14.3826 25.3747 14.3826C25.9029 15.679 25.5668 16.6777 25.4707 16.9178C26.0949 17.5996 26.4598 18.4542 26.4598 19.5201C26.4598 23.1884 24.2128 23.995 22.0714 24.2351C22.4171 24.5328 22.734 25.1185 22.734 26.0116V28.6428C22.734 28.902 22.8876 29.2093 23.3773 29.1229C27.1896 27.8361 29.936 24.2447 29.936 20.0002C29.936 18.7392 29.6877 17.4905 29.2051 16.3254C28.7225 15.1604 28.0152 14.1018 27.1235 13.2101C26.2318 12.3184 25.1732 11.611 24.0081 11.1284C22.843 10.6458 21.5943 10.3975 20.3333 10.3975Z" fill="currentColor"/>
            </svg>
          </a>
        </div>

        <!-- Photo de profil -->
        <div class="about__photo">
          <div class="about__photo-ring about__photo-ring--outer"></div>
          <div class="about__photo-ring"></div>
          <div class="about__photo-placeholder">
            <!-- Remplacer par : <img src="/profile.webp" alt="Jonathan Loré" /> -->
            <span class="about__photo-initials">JL</span>
          </div>
        </div>

        <!-- Pastille disponibilité -->
        <div class="about__availability">
          <span class="about__availability-dot"></span>
          <span>Disponible pour missions</span>
        </div>

        <!-- Boutons CTA -->
        <div class="about__cta">
          <a href="#contact" class="about__btn about__btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Collaborer
          </a>
          <a href="/cv-jonathan-lore.pdf" download class="about__btn about__btn--secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Télécharger le CV
          </a>
        </div>
      </div>

      <!-- Colonne droite : bio -->
      <div class="about__right">
        <h3 class="about__name">
          Développeur web Fullstack&nbsp;<span class="about__name-highlight">freelance</span>
        </h3>
        <div class="about__bio">
          <p>
            Développeur fullstack depuis plusieurs années, j'aime construire des choses qui tiennent -
            des interfaces soignées, des architectures qui évoluent et livrer des projets.
          </p>
          <p>
            Mon terrain de jeu va de l'UI jusqu'à l'infra :
            <strong>Vue/Nuxt</strong> côté front,
            <strong>Symfony</strong> ou <strong>Laravel</strong> côté back,
            et une vraie culture DevOps avec la mise en place d'outils tels que
            <span class="about__tech">Jenkins</span> et <span class="about__tech">Kubernetes</span>
            pour que tout ça vive sereinement en production.
          </p>
          <p>
            Ce qui me plaît, c'est de comprendre à la fois la vision du client et les contraintes
            techniques - et faire le pont entre les deux.
          </p>
        </div>
      </div>
    </div>

    <!-- Cards "Pourquoi travailler avec moi ?" -->
    <div class="about__cards">
      <h4 class="about__cards-title">
        Pourquoi <span>Travailler avec moi&nbsp;?</span>
      </h4>
      <div class="about__cards-grid">
        <div v-for="card in cards" :key="card.title" class="about__card">
          <span class="about__card-icon">{{ card.icon }}</span>
          <strong class="about__card-title">{{ card.title }}</strong>
          <p class="about__card-desc">{{ card.description }}</p>
        </div>
      </div>
    </div>

    <!-- Séparateur gradient -->
    <div class="about__divider" aria-hidden="true"></div>

    <!-- Compteurs -->
    <div ref="countersRef" class="about__counters">
      <div v-for="counter in counters" :key="counter.label" class="about__counter">
        <span class="about__counter-value">{{ counter.current }}{{ counter.suffix }}</span>
        <span class="about__counter-label">{{ counter.label }}</span>
      </div>
    </div>

    <!-- Séparateur gradient bas -->
    <div class="about__divider" aria-hidden="true"></div>
  </section>
</template>