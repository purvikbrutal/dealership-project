import { useEffect, useRef, useState } from 'react'

export function useReveal(options: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      })
    }, options)

    observer.observe(node)

    return () => observer.disconnect()
  }, [options, visible])

  return { ref, visible }
}
