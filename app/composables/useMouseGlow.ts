export function useMouseGlow() {
    function applyGlow(el: HTMLElement) {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            el.style.setProperty('--glow-x', `${x}px`)
            el.style.setProperty('--glow-y', `${y}px`)
        }

        const handleMouseEnter = () => {
            el.style.setProperty('--glow-opacity', '1')
        }

        const handleMouseLeave = () => {
            el.style.setProperty('--glow-opacity', '0')
        }

        el.addEventListener('mousemove', handleMouseMove)
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            el.removeEventListener('mousemove', handleMouseMove)
            el.removeEventListener('mouseenter', handleMouseEnter)
            el.removeEventListener('mouseleave', handleMouseLeave)
        }
    }

    return { applyGlow }
}