import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, 'reveal-visible' is added.
 * Pass `delay` as a CSS class string like 'delay-1', 'delay-2' etc.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}

/**
 * CountUp: animates a number from 0 to target when element enters viewport.
 */
export function useCountUp(target) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.unobserve(el)
          const duration = 1400
          const t0 = performance.now()
          const step = (now) => {
            const p = Math.min((now - t0) / duration, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.round(ease * target)
            if (p < 1) requestAnimationFrame(step)
            else el.textContent = target
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return ref
}
