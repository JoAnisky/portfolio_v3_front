export function useParallax() {
  const { width } = useWindowSize()

  function applyParallax(container: Ref<HTMLElement | null>) {
    let heroHeight = 0 // calculé une fois au montage

    const handleScroll = () => {
      if (!container.value) return

      const scrollY = window.pageYOffset
      const layers = container.value.querySelectorAll<HTMLElement>('[data-depth]')

      if (heroHeight > 0 && scrollY >= heroHeight) {
        layers.forEach((layer) => {
          layer.style.visibility = 'hidden'
        })
        return
      }

      layers.forEach((layer) => {
        layer.style.visibility = ''
        const depth = parseFloat(layer.dataset.depth ?? '0')

        if (width.value >= 1024) {
          // Desktop : parallax complet sur tous les layers
          const yPos = -(scrollY * depth)
          layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`
        } else {
          // Tablette/mobile : parallax léger uniquement sur le contenu texte
          // Les layers desktop sont cachés en CSS, seul hero__content a data-depth
          if (layer.classList.contains('hero__content')) {
            const yPos = scrollY * 0.15
            layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`
          }
          if (layer.classList.contains('hero__bg--sky')) {
            const yPos = scrollY * 0.1 // très léger — juste assez pour sentir le mouvement
            layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`
          }
        }
      })
    }

    onMounted(() => {
      nextTick(() => {
        heroHeight = (container.value?.offsetHeight ?? window.innerHeight) * 1.2
        window.addEventListener('scroll', handleScroll, { passive: true })
      })
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }

  return { applyParallax }
}