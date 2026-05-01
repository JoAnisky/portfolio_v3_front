export function useParallax() {
  const { width } = useWindowSize()

  function applyParallax(container: Ref<HTMLElement | null>) {
    let heroHeight = 0 // calculé une fois au montage

    const handleScroll = () => {
      if (!container.value) return

      const scrollY = window.pageYOffset
      const layers = container.value.querySelectorAll<HTMLElement>('[data-depth]')

      if (scrollY >= heroHeight) {
        layers.forEach((layer) => {
          layer.style.visibility = 'hidden'
        })
        return
      }

      layers.forEach((layer) => {
        layer.style.visibility = 'visible'
        const depth = parseFloat(layer.dataset.depth ?? '0')
        const yPos = -(scrollY * depth)
        layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`
      })
    }

    onMounted(() => {
      if (width.value < 1024) return

      // Calculé une seule fois — insensible aux redimensionnements de la console
      heroHeight = (container.value?.offsetHeight ?? window.innerHeight) * 1.2

      window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }

  return { applyParallax }
}