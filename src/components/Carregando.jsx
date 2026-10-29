import { useEffect, useRef } from 'react'
import '../styles/carregando.css'

/* =========================================================
   Tela de carregamento — animacao de buraco negro em canvas.
   Portada do custom element <a-hole> para React:
   - as funcoes de easing foram embutidas (dispensa a lib via CDN)
   - OffscreenCanvas trocado por canvas comum (suporte universal)
   ========================================================= */

const TOTAL_DISCOS = 100
const TOTAL_LINHAS = 100
const TOTAL_PARTICULAS = 100

const linear = (p) => p
const easeInExpo = (p) => (p === 0 ? 0 : Math.pow(2, 10 * (p - 1)))

export default function Carregando({ saindo = false }) {
  const raizRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const raiz = raizRef.current
    const canvas = canvasRef.current
    if (!raiz || !canvas) return

    const ctx = canvas.getContext('2d')
    let raf = 0
    let rect, dpi
    let discoInicial, discoFinal, discos, recorte
    let canvasLinhas
    let particulas, areaParticulas

    /* ---------- utilitarios ---------- */

    const interpolar = (inicio, fim, p, suavizar = false) =>
      inicio + (fim - inicio) * (suavizar ? easeInExpo(p) : linear(p))

    const animarDisco = (disco) => {
      disco.x = interpolar(discoInicial.x, discoFinal.x, disco.p)
      disco.y = interpolar(discoInicial.y, discoFinal.y, disco.p, true)
      disco.w = interpolar(discoInicial.w, discoFinal.w, disco.p)
      disco.h = interpolar(discoInicial.h, discoFinal.h, disco.p)
      return disco
    }

    /* ---------- montagem ---------- */

    const definirTamanho = () => {
      rect = raiz.getBoundingClientRect()
      dpi = window.devicePixelRatio || 1
      canvas.width = rect.width * dpi
      canvas.height = rect.height * dpi
    }

    const definirDiscos = () => {
      const { width, height } = rect
      discos = []

      discoInicial = { x: width * 0.5, y: height * 0.45, w: width * 0.75, h: height * 0.7 }
      discoFinal = { x: width * 0.5, y: height * 0.95, w: 0, h: 0 }

      let baseAnterior = height
      recorte = {}

      for (let i = 0; i < TOTAL_DISCOS; i += 1) {
        const disco = animarDisco({ p: i / TOTAL_DISCOS })
        const base = disco.y + disco.h

        if (base <= baseAnterior) recorte = { disco: { ...disco }, i }
        baseAnterior = base

        discos.push(disco)
      }

      recorte.caminho = new Path2D()
      recorte.caminho.ellipse(
        recorte.disco.x, recorte.disco.y, recorte.disco.w, recorte.disco.h, 0, 0, Math.PI * 2
      )
      recorte.caminho.rect(
        recorte.disco.x - recorte.disco.w, 0, recorte.disco.w * 2, recorte.disco.y
      )
    }

    const definirLinhas = () => {
      const { width, height } = rect
      const linhas = []
      const anguloEntreLinhas = (Math.PI * 2) / TOTAL_LINHAS

      for (let i = 0; i < TOTAL_LINHAS; i += 1) linhas.push([])

      discos.forEach((disco) => {
        for (let i = 0; i < TOTAL_LINHAS; i += 1) {
          const angulo = i * anguloEntreLinhas
          linhas[i].push({
            x: disco.x + Math.cos(angulo) * disco.w,
            y: disco.y + Math.sin(angulo) * disco.h
          })
        }
      })

      canvasLinhas = document.createElement('canvas')
      canvasLinhas.width = width
      canvasLinhas.height = height
      const ctxLinhas = canvasLinhas.getContext('2d')

      linhas.forEach((linha) => {
        ctxLinhas.save()
        let dentro = false

        linha.forEach((p1, j) => {
          if (j === 0) return
          const p0 = linha[j - 1]

          if (
            !dentro &&
            (ctxLinhas.isPointInPath(recorte.caminho, p1.x, p1.y) ||
              ctxLinhas.isPointInStroke(recorte.caminho, p1.x, p1.y))
          ) {
            dentro = true
          } else if (dentro) {
            ctxLinhas.clip(recorte.caminho)
          }

          ctxLinhas.beginPath()
          ctxLinhas.moveTo(p0.x, p0.y)
          ctxLinhas.lineTo(p1.x, p1.y)
          ctxLinhas.strokeStyle = '#444'
          ctxLinhas.lineWidth = 2
          ctxLinhas.stroke()
          ctxLinhas.closePath()
        })

        ctxLinhas.restore()
      })
    }

    const iniciarParticula = (comecando = false) => {
      const sx = areaParticulas.sx + areaParticulas.sw * Math.random()
      const ex = areaParticulas.ex + areaParticulas.ew * Math.random()

      return {
        x: sx,
        sx,
        dx: ex - sx,
        y: comecando ? areaParticulas.h * Math.random() : areaParticulas.h,
        vy: 0.5 + Math.random(),
        p: 0,
        r: 0.5 + Math.random() * 4,
        c: `rgba(255,255,255,${Math.random()})`
      }
    }

    const definirParticulas = () => {
      const { width, height } = rect
      particulas = []

      areaParticulas = {
        sw: recorte.disco.w * 0.5,
        ew: recorte.disco.w * 2,
        h: height * 0.85
      }
      areaParticulas.sx = (width - areaParticulas.sw) / 2
      areaParticulas.ex = (width - areaParticulas.ew) / 2

      for (let i = 0; i < TOTAL_PARTICULAS; i += 1) particulas.push(iniciarParticula(true))
    }

    /* ---------- desenho ---------- */

    const desenharDiscos = () => {
      ctx.strokeStyle = '#444'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.ellipse(
        discoInicial.x, discoInicial.y, discoInicial.w, discoInicial.h, 0, 0, Math.PI * 2
      )
      ctx.stroke()
      ctx.closePath()

      discos.forEach((disco, i) => {
        if (i % 5 !== 0) return

        const recortar = disco.w < recorte.disco.w - 5
        if (recortar) {
          ctx.save()
          ctx.clip(recorte.caminho)
        }

        ctx.beginPath()
        ctx.ellipse(disco.x, disco.y, disco.w, disco.h, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.closePath()

        if (recortar) ctx.restore()
      })
    }

    const desenharLinhas = () => ctx.drawImage(canvasLinhas, 0, 0)

    const desenharParticulas = () => {
      ctx.save()
      ctx.clip(recorte.caminho)

      particulas.forEach((particula) => {
        ctx.fillStyle = particula.c
        ctx.beginPath()
        ctx.rect(particula.x, particula.y, particula.r, particula.r)
        ctx.closePath()
        ctx.fill()
      })

      ctx.restore()
    }

    /* ---------- movimento ---------- */

    const moverDiscos = () => {
      discos.forEach((disco) => {
        disco.p = (disco.p + 0.001) % 1
        animarDisco(disco)
      })
    }

    const moverParticulas = () => {
      particulas.forEach((particula) => {
        particula.p = 1 - particula.y / areaParticulas.h
        particula.x = particula.sx + particula.dx * particula.p
        particula.y -= particula.vy
        if (particula.y < 0) particula.y = iniciarParticula().y
      })
    }

    /* ---------- loop ---------- */

    const quadro = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpi, dpi)

      moverDiscos()
      moverParticulas()

      desenharDiscos()
      desenharLinhas()
      desenharParticulas()

      ctx.restore()
      raf = requestAnimationFrame(quadro)
    }

    const montar = () => {
      definirTamanho()
      if (!rect.width || !rect.height) return false
      definirDiscos()
      definirLinhas()
      definirParticulas()
      return true
    }

    if (!montar()) return

    const aoRedimensionar = () => montar()
    window.addEventListener('resize', aoRedimensionar)
    raf = requestAnimationFrame(quadro)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', aoRedimensionar)
    }
  }, [])

  return (
    <div className={`carregando${saindo ? ' saindo' : ''}`} role="status" aria-label="Carregando">
      <div className="buraco" ref={raizRef}>
        <canvas ref={canvasRef} />
        <div className="aura" />
        <div className="grade" />
      </div>

      <div className="carregando-marca">
        <span className="cm-nome">NEXT CODEXA</span>
        <span className="cm-sub">Desenvolvimento de Software</span>
        <span className="cm-barra"><i /></span>
      </div>
    </div>
  )
}
