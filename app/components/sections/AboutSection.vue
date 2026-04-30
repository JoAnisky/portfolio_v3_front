<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppDivider from "~/components/ui/AppDivider.vue";

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.7022 19.942C11.8329 19.942 11.9669 19.9126 12.1042 19.854C12.2415 19.7953 12.3525 19.7236 12.4372 19.639L20.2332 11.842C20.4845 11.5906 20.6785 11.334 20.8152 11.072C20.9512 10.8086 21.0192 10.52 21.0192 10.206C21.0192 9.88796 20.9512 9.57929 20.8152 9.27996C20.6785 8.97996 20.4845 8.70662 20.2332 8.45996L16.4832 4.70996C16.2359 4.45862 15.9815 4.27429 15.7202 4.15696C15.4595 4.03962 15.1702 3.98096 14.8522 3.98096C14.5382 3.98096 14.2465 4.03962 13.9772 4.15696C13.7079 4.27429 13.4542 4.45829 13.2162 4.70896L12.3442 5.58096L14.1942 7.43596C14.3929 7.63129 14.5412 7.85329 14.6392 8.10196C14.7365 8.35062 14.7852 8.60296 14.7852 8.85896C14.7852 9.37962 14.6149 9.81029 14.2742 10.151C13.9335 10.4916 13.5032 10.6616 12.9832 10.661C12.7265 10.661 12.4762 10.622 12.2322 10.544C11.9882 10.466 11.7685 10.3293 11.5732 10.134L10.1022 8.66996C9.98686 8.55462 9.83953 8.49696 9.66019 8.49696C9.48019 8.49696 9.33253 8.55462 9.21719 8.66996L5.34219 12.545C5.24153 12.6463 5.16586 12.7613 5.11519 12.89C5.06453 13.0186 5.03919 13.1486 5.03919 13.28C5.03919 13.516 5.11486 13.7103 5.26619 13.863C5.41686 14.0163 5.61019 14.093 5.84619 14.093C5.97686 14.093 6.11086 14.0636 6.24819 14.005C6.38553 13.9456 6.49653 13.8736 6.58119 13.789L9.39619 10.974C9.48953 10.8806 9.60353 10.8296 9.73819 10.821C9.87286 10.8123 9.99486 10.8633 10.1042 10.974C10.2109 11.0806 10.2642 11.1986 10.2642 11.328C10.2642 11.4573 10.2109 11.5753 10.1042 11.682L7.29419 14.497C7.19286 14.5983 7.11686 14.7133 7.06619 14.842C7.01619 14.9713 6.99119 15.1013 6.99119 15.232C6.99119 15.4553 7.06986 15.6456 7.22719 15.803C7.38453 15.9603 7.57486 16.0393 7.79819 16.04C7.92886 16.04 8.06286 16.0103 8.20019 15.951C8.33753 15.8916 8.44853 15.82 8.53319 15.736L11.5792 12.696C11.6725 12.602 11.7862 12.5506 11.9202 12.542C12.0542 12.5333 12.1762 12.5843 12.2862 12.695C12.3929 12.8016 12.4462 12.9196 12.4462 13.049C12.4462 13.1783 12.3929 13.2963 12.2862 13.403L9.24619 16.449C9.15819 16.5336 9.08553 16.6446 9.02819 16.782C8.97086 16.9193 8.94219 17.0533 8.94219 17.184C8.94219 17.4066 9.02119 17.5966 9.17919 17.754C9.33719 17.9126 9.52753 17.992 9.75019 17.992C9.88086 17.992 10.0109 17.9666 10.1402 17.916C10.2695 17.8653 10.3842 17.7893 10.4842 17.688L13.5312 14.648C13.6245 14.554 13.7382 14.5026 13.8722 14.494C14.0062 14.486 14.1285 14.537 14.2392 14.647C14.3452 14.7536 14.3982 14.8716 14.3982 15.001C14.3982 15.1303 14.3449 15.2483 14.2382 15.355L11.1932 18.4C11.0925 18.5013 11.0169 18.623 10.9662 18.765C10.9155 18.907 10.8902 19.0366 10.8902 19.154C10.8902 19.39 10.9732 19.5803 11.1392 19.725C11.3052 19.8696 11.4932 19.942 11.7032 19.942M11.6972 20.942C11.1832 20.942 10.7432 20.754 10.3772 20.378C10.0112 20.002 9.85053 19.5373 9.89519 18.984C9.32853 18.9906 8.85686 18.8216 8.48019 18.477C8.10353 18.1323 7.92453 17.651 7.94319 17.033C7.32586 17.0396 6.83919 16.863 6.48319 16.503C6.12719 16.143 5.96519 15.669 5.99719 15.081C5.44119 15.0876 4.97586 14.931 4.60119 14.611C4.22719 14.2923 4.04019 13.8483 4.04019 13.279C4.04019 13.0223 4.08986 12.7656 4.18919 12.509C4.28853 12.2516 4.43519 12.0256 4.62919 11.831L8.52419 7.93596C8.83086 7.62996 9.20886 7.47696 9.65819 7.47696C10.1075 7.47696 10.4855 7.63029 10.7922 7.93696L12.2432 9.38796C12.3279 9.47662 12.4325 9.54962 12.5572 9.60696C12.6819 9.66429 12.8222 9.69262 12.9782 9.69196C13.1922 9.69196 13.3812 9.61729 13.5452 9.46796C13.7092 9.31862 13.7915 9.12396 13.7922 8.88396C13.7922 8.72796 13.7635 8.58796 13.7062 8.46396C13.6489 8.33929 13.5762 8.23462 13.4882 8.14996L10.0482 4.70996C9.80019 4.45862 9.54253 4.27429 9.27519 4.15696C9.00786 4.03962 8.71519 3.98096 8.39719 3.98096C8.08319 3.98096 7.79786 4.03962 7.54119 4.15696C7.28519 4.27429 7.03153 4.45862 6.78019 4.70996L3.73519 7.75996C3.38586 8.10862 3.16119 8.53429 3.06119 9.03696C2.96119 9.53962 3.00686 10.0196 3.19819 10.477C3.23553 10.6063 3.21886 10.7313 3.14819 10.852C3.07753 10.9726 2.97753 11.0493 2.84819 11.082C2.71886 11.1146 2.59053 11.0973 2.46319 11.03C2.33586 10.9626 2.25586 10.8636 2.22319 10.733C2.00786 10.0863 1.96086 9.43329 2.08219 8.77396C2.20353 8.11462 2.51686 7.53229 3.02219 7.02696L6.04619 4.00196C6.39486 3.65662 6.76386 3.39996 7.15319 3.23196C7.54253 3.06462 7.96353 2.98096 8.41619 2.98096C8.86886 2.98096 9.28619 3.06496 9.66819 3.23296C10.0509 3.40029 10.4149 3.65662 10.7602 4.00196L11.6302 4.87296L12.5022 4.00196C12.8509 3.65662 13.2165 3.39996 13.5992 3.23196C13.9819 3.06462 14.3995 2.98096 14.8522 2.98096C15.3049 2.98096 15.7259 3.06496 16.1152 3.23296C16.5039 3.40029 16.8705 3.65662 17.2152 4.00196L20.9412 7.72696C21.2859 8.07162 21.5519 8.45862 21.7392 8.88796C21.9265 9.31729 22.0199 9.75829 22.0192 10.211C22.0192 10.6643 21.9259 11.082 21.7392 11.464C21.5525 11.846 21.2865 12.21 20.9412 12.556L13.1442 20.346C12.9369 20.554 12.7109 20.7053 12.4662 20.8C12.2222 20.8946 11.9665 20.942 11.6972 20.942Z" fill="#010511"/>
            </svg>
            Collaborer
          </a>
          <a href="/cv-jonathan-lore-developpeur-web-fullstack.pdf" download class="about__btn about__btn--secondary">
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
          <div class="about__card-heading">
            <strong class="about__card-title">{{ card.title }}</strong>
            <span class="about__card-icon">{{ card.icon }}</span>
          </div>
          <p class="about__card-desc">{{ card.description }}</p>
        </div>
      </div>
    </div>

    <!-- Séparateur gradient -->
    <AppDivider />

    <!-- Compteurs -->
    <div ref="countersRef" class="about__counters">
      <div v-for="counter in counters" :key="counter.label" class="about__counter">
        <span class="about__counter-value">{{ counter.current }}<span class="about__counter-value-suffix">{{ counter.suffix }}</span></span>
        <span class="about__counter-label">{{ counter.label }}</span>
      </div>
    </div>

    <!-- Séparateur gradient bas -->
    <AppDivider />

  </section>
</template>