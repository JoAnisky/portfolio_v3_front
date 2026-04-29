export function useParallax() {
  const { y } = useWindowScroll()

  function applyParallax(container: Ref<HTMLElement | null>) {
    // Prépare le GPU sur chaque couche au montage
    onMounted(() => {
      if (!container.value) return
      const layers = container.value.querySelectorAll<HTMLElement>('[data-depth]')
      layers.forEach((layer) => {
        layer.style.willChange = 'transform'
      })
    })

    watchEffect(() => {
      if (!container.value) return

      const scrollY = y.value
      const layers = container.value.querySelectorAll<HTMLElement>('[data-depth]')

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth ?? '0')
        const maxScroll = window.innerHeight * 0.60 // limite à 65% du viewport
        const scrollClamped = Math.min(scrollY, maxScroll)
        const translateY = -scrollClamped * depth

        layer.style.transform = `translate3d(0, ${translateY}px, 0)`
      })
    })
  }

  return { applyParallax }
}