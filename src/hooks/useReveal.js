import { useEffect } from 'react'

/**
 * Revela os elementos com a classe `.reveal` conforme entram na tela.
 * Basta chamar uma vez na pagina que contem os elementos.
 */
export default function useReveal() {
  useEffect(() => {
    const alvos = document.querySelectorAll('.reveal:not(.in)')
    if (!alvos.length) return

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('in')
          observer.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    alvos.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 80}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}
