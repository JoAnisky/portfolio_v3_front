export function useParallax() {
  const { width } = useWindowSize()

  function applyParallax(container: Ref<HTMLElement | null>) {
    let heroHeight = 0
    let rafId: number | null = null

    const handleScroll = () => {
      if (!container.value || rafId !== null) return

      rafId = requestAnimationFrame(() => {
        rafId = null
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
            layer.style.transform = `translate3d(0px, ${-(scrollY * depth)}px, 0px)`
          } else {
            if (layer.classList.contains('hero__content')) {
              layer.style.transform = `translate3d(0px, ${scrollY * 0.15}px, 0px)`
            }
            if (layer.classList.contains('hero__bg--sky')) {
              layer.style.transform = `translate3d(0px, ${scrollY * 0.1}px, 0px)`
            }
          }
        })
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
      if (rafId !== null) cancelAnimationFrame(rafId)
    })
  }

  return { applyParallax }
}
