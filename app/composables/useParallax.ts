export function useParallax() {
  const { y } = useWindowScroll()
  const { width } = useWindowSize()

  function applyParallax(container: Ref<HTMLElement | null>) {
    onMounted(() => {
      if (!container.value) return
      const layers = container.value.querySelectorAll<HTMLElement>('[data-depth]')
      layers.forEach((layer) => {
        layer.style.willChange = 'transform'
      })
    })

    watchEffect(() => {
      if (!container.value) return

      // Pas de parallax sous 1024px
      if (width.value < 1024) {
        const layers = container.value.querySelectorAll<HTMLElement>('[data-depth]')
        layers.forEach((layer) => {
          layer.style.transform = 'none'
        })
        return
      }

      const maxScroll = window.innerHeight * 0.6
      const scrollClamped = Math.min(y.value, maxScroll)
      const layers = container.value.querySelectorAll<HTMLElement>('[data-depth]')

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth ?? '0')
        const translateY = -scrollClamped * depth
        layer.style.transform = `translate3d(0, ${translateY}px, 0)`
      })
    })
  }

  return { applyParallax }
}