"use client"

import * as React from "react"
import {
  rdfHex,
  rdfPack,
  RDF_BAYER,
  rdfDither,
  rdfHash,
  rdfNoise,
  rdfFbm,
  rdfSmooth,
  rdfEase,
  rdfRidgeline,
  rdfElevation,
  RidgelinePalette,
  RidgelinePreset,
  RidgelineTheme,
} from "./ridgeline-dither-footer"

export interface Peak {
  id: string
  name: string
  height: number // meters
  heightFt: number // feet
  rank: number
  range: string
  country: string
  xPercent: number // 0 to 1 West-to-East
  layerIndex: number // 0 (farthest back / tallest) to 3
}

export const FOURTEEN_PEAKS: Peak[] = [
  {
    id: "nanga-parbat",
    name: "Nanga Parbat",
    height: 8126,
    heightFt: 26660,
    rank: 9,
    range: "Nanga Parbat Himalaya",
    country: "Pakistan",
    xPercent: 0.075,
    layerIndex: 1,
  },
  {
    id: "k2",
    name: "K2",
    height: 8611,
    heightFt: 28251,
    rank: 2,
    range: "Baltoro Karakoram",
    country: "Pakistan / China",
    xPercent: 0.14,
    layerIndex: 0,
  },
  {
    id: "broad-peak",
    name: "Broad Peak",
    height: 8051,
    heightFt: 26414,
    rank: 12,
    range: "Baltoro Karakoram",
    country: "Pakistan / China",
    xPercent: 0.205,
    layerIndex: 2,
  },
  {
    id: "gasherbrum-1",
    name: "Gasherbrum I",
    height: 8080,
    heightFt: 26509,
    rank: 11,
    range: "Baltoro Karakoram",
    country: "Pakistan / China",
    xPercent: 0.27,
    layerIndex: 1,
  },
  {
    id: "gasherbrum-2",
    name: "Gasherbrum II",
    height: 8035,
    heightFt: 26362,
    rank: 13,
    range: "Baltoro Karakoram",
    country: "Pakistan / China",
    xPercent: 0.335,
    layerIndex: 2,
  },
  {
    id: "dhaulagiri-1",
    name: "Dhaulagiri I",
    height: 8167,
    heightFt: 26795,
    rank: 7,
    range: "Dhaulagiri Himalaya",
    country: "Nepal",
    xPercent: 0.405,
    layerIndex: 1,
  },
  {
    id: "annapurna-1",
    name: "Annapurna I",
    height: 8091,
    heightFt: 26545,
    rank: 10,
    range: "Annapurna Himalaya",
    country: "Nepal",
    xPercent: 0.47,
    layerIndex: 2,
  },
  {
    id: "manaslu",
    name: "Manaslu",
    height: 8163,
    heightFt: 26781,
    rank: 8,
    range: "Mansiri Himalaya",
    country: "Nepal",
    xPercent: 0.535,
    layerIndex: 1,
  },
  {
    id: "shishapangma",
    name: "Shishapangma",
    height: 8027,
    heightFt: 26335,
    rank: 14,
    range: "Jugal Himalaya",
    country: "Tibet",
    xPercent: 0.60,
    layerIndex: 2,
  },
  {
    id: "cho-oyu",
    name: "Cho Oyu",
    height: 8188,
    heightFt: 26864,
    rank: 6,
    range: "Mahalangur Himalaya",
    country: "Nepal / Tibet",
    xPercent: 0.67,
    layerIndex: 1,
  },
  {
    id: "everest",
    name: "Mt. Everest",
    height: 8848,
    heightFt: 29032,
    rank: 1,
    range: "Mahalangur Himalaya",
    country: "Nepal / Tibet",
    xPercent: 0.745,
    layerIndex: 0,
  },
  {
    id: "lhotse",
    name: "Lhotse",
    height: 8516,
    heightFt: 27940,
    rank: 4,
    range: "Mahalangur Himalaya",
    country: "Nepal / Tibet",
    xPercent: 0.81,
    layerIndex: 1,
  },
  {
    id: "makalu",
    name: "Makalu",
    height: 8485,
    heightFt: 27838,
    rank: 5,
    range: "Mahalangur Himalaya",
    country: "Nepal / Tibet",
    xPercent: 0.875,
    layerIndex: 0,
  },
  {
    id: "kangchenjunga",
    name: "Kangchenjunga",
    height: 8586,
    heightFt: 28169,
    rank: 3,
    range: "Kangchenjunga Himalaya",
    country: "India / Nepal",
    xPercent: 0.935,
    layerIndex: 1,
  },
]

export interface PeakMarkerPos {
  id: string
  name: string
  height: number
  heightFt: number
  rank: number
  range: string
  country: string
  x: number
  y: number
  stemHeight: number
  align: 'left' | 'center' | 'right'
}

export interface RidgelineDitherSceneProps {
  preset?: RidgelinePreset
  palette?: { paper?: string; ink?: string; muted?: string; line?: string; heart?: string; tones?: string[] }
  seed?: number
  ridges?: number
  pixel?: number
  mist?: number
  drift?: number
  radius?: number
  interactive?: boolean
  altimeter?: boolean
  showPeaks?: boolean
  height?: string
  className?: string
}

const PRESETS: Record<RidgelineTheme, RidgelinePalette> = {
  evergreen: {
    paper: "#f3f8f5",
    ink: "#14211a",
    muted: "#67776e",
    line: "#dce8e1",
    heart: "#e5484d",
    tones: ["#f3f8f5", "#d4ecdf", "#a5d7bb", "#69b38a", "#2e7c52", "#145131", "#0a2d1a"],
  },
  glacier: {
    paper: "#f2f6fa",
    ink: "#121b26",
    muted: "#637184",
    line: "#dae3ed",
    heart: "#e5484d",
    tones: ["#f2f6fa", "#d6e6f4", "#a8cae7", "#6b9ecc", "#34679a", "#1a3e66", "#0b2140"],
  },
  dusk: {
    paper: "#f8f4f7",
    ink: "#21151f",
    muted: "#7a6876",
    line: "#ecdfe8",
    heart: "#e5484d",
    tones: ["#f8f4f7", "#efdbe7", "#d9b2cb", "#b1789f", "#7a4975", "#4a2750", "#25102c"],
  },
  sepia: {
    paper: "#f7f2ea",
    ink: "#231a10",
    muted: "#7b6d5c",
    line: "#e9dfcf",
    heart: "#d6452f",
    tones: ["#f7f2ea", "#efdfc6", "#ddbb8d", "#bb8a55", "#8a5a2e", "#5a3518", "#2f1a0b"],
  },
  night: {
    paper: "#08100c",
    ink: "#e2eee7",
    muted: "#7d9286",
    line: "#18271f",
    heart: "#ff6369",
    tones: ["#08100c", "#0c1c14", "#123224", "#1a4b33", "#256a48", "#3a8c63", "#62b388"],
  },
}

const MONO_STACK = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace'

// Staggered stem heights (px) so adjacent peak tags sit on different vertical tiers
const STEM_HEIGHTS = [24, 48, 20, 42, 22, 46, 24, 44, 22, 48, 62, 28, 52, 34]

export default function RidgelineDitherScene({
  preset = "sepia",
  palette,
  seed = 17,
  ridges = 6,
  pixel = 2,
  mist = 0.75,
  drift = 1,
  radius = 130,
  interactive = true,
  altimeter = true,
  showPeaks = true,
  height = "380px",
  className = "",
}: RidgelineDitherSceneProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const altRef = React.useRef<HTMLDivElement | null>(null)
  const altTextRef = React.useRef<HTMLSpanElement | null>(null)
  const revealAt = React.useRef<number | null>(null)
  const [inView, setInView] = React.useState(false)
  const [peakMarkers, setPeakMarkers] = React.useState<PeakMarkerPos[]>([])
  const [activePeakId, setActivePeakId] = React.useState<string | null>(null)
  const activeHoverRef = React.useRef<string | null>(null)
  const peakMarkersRef = React.useRef<PeakMarkerPos[]>([])

  const base = preset === "auto" ? PRESETS.sepia : PRESETS[preset] || PRESETS.sepia
  const colors = { ...base, ...(palette || {}) }
  const tones = colors.tones && colors.tones.length >= 2 ? colors.tones : base.tones
  const layers = Math.max(2, Math.min(9, Math.round(ridges)))

  const opts = React.useRef({ mist, drift, radius, interactive, altimeter })
  opts.current = { mist, drift, radius, interactive, altimeter }
  const key = [seed, layers, pixel, tones.join(",")].join("|")

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        if (revealAt.current === null) revealAt.current = reduced ? -Infinity : performance.now()
        setInView(true)
        io.disconnect()
      },
      { threshold: 0.1 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  React.useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pal = new Uint32Array(tones.map((t) => rdfPack(rdfHex(t) || [128, 128, 128])))
    const nTones = pal.length

    let p = 2
    let cols = 1
    let rows = 1
    let margin = 2
    let img: ImageData | null = null
    let buf = new Uint32Array(0)
    let tops: Float32Array[] = []
    let pools: Float32Array[] = []
    let colTop = new Float32Array(0)
    let colSlope = new Float32Array(0)
    let colPool = new Float32Array(0)
    let fog = new Float32Array(0)
    let fw = 1
    let fh = 1
    let ceil = 0
    let fadeTo = 1

    let raf = 0
    let visible = true
    let awake = true
    let lastDraw = 0
    let lastTick = performance.now()
    let tx = 0
    let ty = 0
    let ex = 0
    let ey = 0
    let inside = false
    let clear = 0
    let pt = 0
    let pe = 0
    let windV = 0
    let windX = 0
    let altShown = false
    let altLabel = ""

    const layout = () => {
      const rect = root.getBoundingClientRect()
      p = Math.max(1, Math.round(pixel))
      cols = Math.max(8, Math.ceil(rect.width / p))
      rows = Math.max(8, Math.ceil(rect.height / p))
      canvas.width = cols
      canvas.height = rows
      canvas.style.width = cols * p + "px"
      canvas.style.height = rows * p + "px"
      img = ctx.createImageData(cols, rows)
      buf = new Uint32Array(img.data.buffer as ArrayBuffer)
      margin = Math.ceil(cols * 0.045) + 3
      ceil = Math.max(rows * 0.16, 65 / p)
      fadeTo = Math.max(rows * 0.28, 95 / p)
      tops = []
      pools = []
      for (let i = 0; i < layers; i++) {
        const t = rdfRidgeline(cols, rows, i, layers, seed, margin)
        for (let x = 0; x < t.length; x++) if (t[x] < ceil) t[x] = ceil - (ceil - t[x]) * 0.2
        const pool = new Float32Array(t.length)
        for (let x = 0; x < t.length; x++) pool[x] = 0.45 + 1.1 * rdfFbm(((x - margin) / cols) * 4, i * 5.3, seed + 9, 2)
        tops.push(t)
        pools.push(pool)
      }
      colTop = new Float32Array(layers * cols)
      colSlope = new Float32Array(layers * cols)
      colPool = new Float32Array(layers * cols)
      fw = (cols >> 1) + 2
      fh = (rows >> 1) + 2
      fog = new Float32Array(fw * fh)
      awake = true

      // Calculate peak summit positions across the mountain range
      if (showPeaks) {
        const markers: PeakMarkerPos[] = FOURTEEN_PEAKS.map((peak, idx) => {
          const layer = Math.min(layers - 1, peak.layerIndex)
          const baseCol = Math.round(peak.xPercent * (cols - 1))
          const win = Math.max(4, Math.round(cols * 0.03))
          let bestCol = baseCol
          let minY = Infinity
          const t = tops[layer]
          if (t) {
            for (let c = Math.max(0, baseCol - win); c <= Math.min(cols - 1, baseCol + win); c++) {
              const at = c + margin
              if (at >= 0 && at < t.length) {
                const yVal = t[at]
                if (yVal < minY) {
                  minY = yVal
                  bestCol = c
                }
              }
            }
          }
          if (minY === Infinity) minY = rows * 0.4
          const rawPx = bestCol * p
          // Determine edge alignment to avoid any clipping on narrow mobile viewports
          const align = rawPx > rect.width - 70 ? 'right' : rawPx < 65 ? 'left' : 'center'
          const clampedX = Math.max(16, Math.min(rawPx, rect.width - 16))
          return {
            id: peak.id,
            name: peak.name,
            height: peak.height,
            heightFt: peak.heightFt,
            rank: peak.rank,
            range: peak.range,
            country: peak.country,
            x: Math.round(clampedX),
            y: Math.round(minY * p),
            stemHeight: STEM_HEIGHTS[idx] || 36,
            align,
          }
        })
        peakMarkersRef.current = markers
        setPeakMarkers(markers)
      }
    }

    const draw = (now: number) => {
      if (!img) return
      const o = opts.current
      const dt = Math.min(64, now - lastTick)
      lastTick = now
      const live = o.interactive && !reduced
      const age = revealAt.current === null ? -1 : now - revealAt.current

      const ease = 1 - Math.pow(0.82, dt / 16.7)
      const slow = 1 - Math.pow(0.93, dt / 16.7)
      ex += (tx - ex) * ease
      ey += (ty - ey) * ease
      clear += ((inside && o.interactive ? 1 : 0) - clear) * slow
      pe += ((live ? pt : 0) - pe) * slow
      windV *= Math.pow(0.965, dt / 16.7)
      windX += (windV * dt) / 1000
      const fogT = (reduced ? 0 : (now / 1000) * 0.045 * Math.max(0, o.drift)) + windX

      const sx = 9 / cols
      const sy = 4.4 / rows
      for (let gy = 0; gy < fh; gy++) {
        const ny = gy * sy
        for (let gx = 0; gx < fw; gx++) {
          const nx = gx * sx + fogT
          const warp = rdfNoise(nx * 0.45 - fogT * 0.6, ny * 0.8, 77) * 0.6
          const v = rdfFbm(nx + warp, ny + warp * 0.4, 31, 3)
          fog[gy * fw + gx] = rdfSmooth(0.3, 0.74, v)
        }
      }

      const rev = new Float32Array(layers)
      const k = new Float32Array(layers)
      const toneBase = new Float32Array(layers)
      const fogDepth = new Float32Array(layers)
      for (let i = 0; i < layers; i++) {
        k[i] = i / (layers - 1)
        rev[i] = age < 0 ? 0 : rdfEase((age - 380 - i * 170) / 1300)
        toneBase[i] = 0.16 + 0.76 * Math.pow(k[i], 1.6)
        fogDepth[i] = rows * (0.08 + 0.42 * k[i])
        const rise = (1 - rev[i]) * rows * 0.09
        const shift = Math.round(pe * (0.25 + k[i]) * 0.75 * (margin - 3))
        const t = tops[i]
        const last = t.length - 1
        for (let x = 0; x < cols; x++) {
          const at = x + margin + shift
          colTop[i * cols + x] = t[at] + rise
          colSlope[i * cols + x] = t[Math.min(last, at + 2)] - t[Math.max(0, at - 2)]
          colPool[i * cols + x] = fogDepth[i] * pools[i][at]
        }
      }
      const lift = age < 0 ? 1 : 1 - rdfEase((age - 900) / 1800)
      const mistK = Math.max(0, Math.min(1, o.mist))
      const r = Math.max(1, o.radius / p)
      const r2 = r * r

      for (let y = 0; y < rows; y++) {
        const fade = rdfSmooth(0, fadeTo, y)
        const frow = (y >> 1) * fw
        const by = (y & 7) * 8
        const dyc = (y - ey) * 1.5
        for (let x = 0; x < cols; x++) {
          let L = -1
          for (let i = layers - 1; i >= 0; i--) {
            if (y >= colTop[i * cols + x]) {
              L = i
              break
            }
          }
          let tone = 0
          let mk = 0.3
          if (L >= 0) {
            const kk = k[L]
            const d = y - colTop[L * cols + x]
            const depth = colPool[L * cols + x]
            const crest = 1 - rdfSmooth(0, depth, d) * (0.88 - 0.45 * kk)
            tone = toneBase[L] * crest
            const sl = colSlope[L * cols + x] * 0.06
            tone += (sl < -0.2 ? -0.2 : sl > 0.2 ? 0.2 : sl) * (1 - rdfSmooth(0, depth * 0.5, d))
            tone += (rdfHash(x + Math.round(colTop[L * cols + x] * 7), d | 0, L) - 0.5) * 0.07 * kk
            tone *= rev[L]
            mk = 0.95 - 0.5 * kk
          } else {
            tone = 0.05 * rdfSmooth(rows * 0.15, rows * 0.6, y)
          }

          let m = fog[frow + (x >> 1)] * mistK * mk
          if (clear > 0.01) {
            const dx = x - ex
            const q = (dx * dx + dyc * dyc) / r2
            if (q < 4) {
              const c = clear * Math.exp(-q)
              m *= 1 - c * 0.92
              if (L >= 0) tone += c * 0.16 * rev[L]
            }
          }
          if (tone > 0.93) tone = 0.93
          m += lift * 0.55
          if (m > 1) m = 1
          tone = (tone * (1 - m) + 0.09 * m * (1 - lift)) * fade

          buf[y * cols + x] = pal[rdfDither(tone, nTones, RDF_BAYER[by + (x & 7)])]
        }
      }
      ctx.putImageData(img, 0, 0)

      const alt = altRef.current
      const label = altTextRef.current
      let show = false
      // Only show generic altimeter if mouse is NOT currently over a 14-thousander peak marker
      if (alt && label && o.altimeter && inside && age > 1600 && !activeHoverRef.current) {
        const x = Math.max(0, Math.min(cols - 1, Math.round(ex)))
        for (let i = layers - 1; i >= 0; i--) {
          const crest = colTop[i * cols + x]
          if (ey >= crest - 6) {
            show = true
            alt.style.transform = "translate(" + (x * p).toFixed(1) + "px," + (crest * p).toFixed(1) + "px)"
            const text = rdfElevation(crest, rows, i, layers).toLocaleString("en-US") + " m"
            if (text !== altLabel) {
              altLabel = text
              label.textContent = text
            }
            break
          }
        }
      }
      if (alt && show !== altShown) {
        altShown = show
        alt.style.opacity = show ? "1" : "0"
      }

      const settling =
        Math.abs(tx - ex) + Math.abs(ty - ey) > 0.05 ||
        Math.abs((inside && o.interactive ? 1 : 0) - clear) > 0.005 ||
        Math.abs((live ? pt : 0) - pe) > 0.001 ||
        Math.abs(windV) > 0.002
      awake = (age >= 0 && age < 3400) || age < 0 || settling || (!reduced && o.drift > 0)
    }

    const busy = () => {
      const age = revealAt.current === null ? -1 : performance.now() - revealAt.current
      return (age >= 0 && age < 3400) || inside || Math.abs(windV) > 0.002 || Math.abs(pt - pe) > 0.001
    }

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      if (revealAt.current === null) {
        raf = requestAnimationFrame(loop)
        return
      }
      if (busy() || now - lastDraw > 32) {
        draw(now)
        lastDraw = now
      }
      if (awake) raf = requestAnimationFrame(loop)
    }
    const wake = () => {
      awake = true
      if (!raf && visible) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const o = opts.current
      if (!o.interactive && !o.altimeter) return
      const b = root.getBoundingClientRect()
      pt = b.width > 0 ? ((e.clientX - b.left) / b.width) * 2 - 1 : 0
      const lx = (e.clientX - b.left) / p
      const ly = (e.clientY - b.top) / p
      const was = inside
      inside = lx >= 0 && ly >= 0 && lx < cols && ly < rows
      tx = lx
      ty = ly
      if (inside && !was) {
        ex = tx
        ey = ty
      }

      // Check proximity to any 14-Thousander peak summit
      if (showPeaks) {
        const mouseX = e.clientX - b.left
        const mouseY = e.clientY - b.top
        let nearestPeak: string | null = null
        for (const pm of peakMarkersRef.current) {
          const dx = mouseX - pm.x
          const dy = mouseY - pm.y
          // Hover target: within 38px horizontally and near/above summit
          if (Math.abs(dx) < 38 && dy > -(pm.stemHeight + 35) && dy < 40) {
            nearestPeak = pm.id
            break
          }
        }
        if (nearestPeak !== activeHoverRef.current) {
          activeHoverRef.current = nearestPeak
          setActivePeakId(nearestPeak)
        }
      }

      wake()
    }
    const onLeave = () => {
      pt = 0
      inside = false
      if (activeHoverRef.current) {
        activeHoverRef.current = null
        setActivePeakId(null)
      }
      wake()
    }
    const onDown = (e: PointerEvent) => {
      if (!opts.current.interactive || reduced) return
      const b = root.getBoundingClientRect()
      const mouseX = e.clientX - b.left
      const mouseY = e.clientY - b.top

      if (showPeaks) {
        let nearestPeak: string | null = null
        for (const pm of peakMarkersRef.current) {
          const dx = mouseX - pm.x
          const dy = mouseY - pm.y
          if (Math.abs(dx) < 45 && dy > -(pm.stemHeight + 45) && dy < 50) {
            nearestPeak = pm.id
            break
          }
        }
        if (nearestPeak) {
          const next = activeHoverRef.current === nearestPeak ? null : nearestPeak
          activeHoverRef.current = next
          setActivePeakId(next)
        }
      }

      if (inside) {
        windV += tx < cols / 2 ? 1.4 : -1.4
      }
      wake()
    }

    layout()
    draw(performance.now())
    wake()

    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerleave", onLeave)
    root.addEventListener("pointerdown", onDown)
    const ro = new ResizeObserver(() => {
      layout()
      draw(performance.now())
      wake()
    })
    ro.observe(root)
    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true
      if (visible) {
        lastTick = performance.now()
        wake()
      }
    })
    io.observe(root)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
      root.removeEventListener("pointerdown", onDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, showPeaks])

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* ── 14 Peaks Explorer Top Bar ────────────────────────────── */}
      {showPeaks && (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pt-4 pb-2.5 flex flex-col gap-2.5 relative z-30 pointer-events-auto">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-zinc-200/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <span
                className="font-semibold text-zinc-900 tracking-wider uppercase text-[11px]"
                style={{ font: `600 11px/1 ${MONO_STACK}`, letterSpacing: ".08em" }}
              >
                The 14 Eight-Thousanders
              </span>
              <span className="text-zinc-300">|</span>
              <span
                className="text-zinc-500 text-[11px] hidden sm:inline"
                style={{ font: `400 11px/1 ${MONO_STACK}`, letterSpacing: ".04em" }}
              >
                Himalayan &amp; Karakoram Summits
              </span>
            </div>

            <div
              className="flex items-center gap-2 text-zinc-500 text-[11px]"
              style={{ font: `400 11px/1 ${MONO_STACK}`, letterSpacing: ".04em" }}
            >
              <span className="hidden md:inline">14 Peaks &gt; 8,000m</span>
              <span className="hidden md:inline text-zinc-300">·</span>
              <span className="text-zinc-700">West → East</span>
            </div>
          </div>

          {/* Interactive Peak Pills Carousel / Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-2 px-2 mask-linear">
            {FOURTEEN_PEAKS.map((peak) => {
              const isActive = activePeakId === peak.id
              return (
                <button
                  key={peak.id}
                  onClick={() => {
                    const next = isActive ? null : peak.id
                    activeHoverRef.current = next
                    setActivePeakId(next)
                  }}
                  onMouseEnter={() => {
                    activeHoverRef.current = peak.id
                    setActivePeakId(peak.id)
                  }}
                  onMouseLeave={() => {
                    activeHoverRef.current = null
                    setActivePeakId(null)
                  }}
                  className={`shrink-0 flex items-center gap-1.5 px-2 py-1 rounded bg-white/90 shadow-sm border transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "border-zinc-400 bg-zinc-100 text-zinc-950"
                      : "border-zinc-200 hover:border-zinc-300 text-zinc-800"
                  }`}
                  style={{
                    font: `500 10.5px/1 ${MONO_STACK}`,
                    letterSpacing: ".06em",
                  }}
                >
                  <span className={isActive ? "text-zinc-950 font-bold" : "text-zinc-400"}>
                    #{peak.rank}
                  </span>
                  <span>{peak.name}</span>
                  <span className={isActive ? "text-zinc-950 font-semibold" : "text-zinc-500"}>
                    {peak.height.toLocaleString()} m
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Mountain Canvas & Summit Markers Container ───────────── */}
      <div
        ref={rootRef}
        className="relative w-full overflow-hidden cursor-crosshair"
        style={{
          height,
          background: "transparent",
        }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute left-0 bottom-0 block w-full h-full pointer-events-auto"
          style={{ imageRendering: "pixelated" }}
        />

        {/* ── 14 Peaks Summit Pins on Canvas (Revealed ONLY on hover) ── */}
        {showPeaks && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {peakMarkers.map((pos) => {
              const isActive = activePeakId === pos.id

              return (
                <div
                  key={pos.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    zIndex: isActive ? 45 : 20,
                  }}
                  onClick={() => {
                    const next = isActive ? null : pos.id
                    activeHoverRef.current = next
                    setActivePeakId(next)
                  }}
                  onMouseEnter={() => {
                    activeHoverRef.current = pos.id
                    setActivePeakId(pos.id)
                  }}
                  onMouseLeave={() => {
                    activeHoverRef.current = null
                    setActivePeakId(null)
                  }}
                >
                  {/* Invisible generous hover hit area around the summit */}
                  <div
                    className="absolute -translate-x-1/2 -bottom-4 w-16 pointer-events-auto"
                    style={{ height: `${pos.stemHeight + 44}px` }}
                  />

                  {/* Visual Pin & Label: ONLY SHOWN WHEN HOVERED */}
                  <div
                    className={`transition-all duration-200 ease-out pointer-events-none ${
                      isActive
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-1"
                    }`}
                  >
                    {/* Summit Anchor Pin on Ridge */}
                    <i
                      className="absolute left-[-4px] top-[-4px] w-[8px] h-[8px] rounded-full bg-white transition-transform duration-150"
                      style={{
                        boxShadow: `0 0 0 1.5px ${colors.ink}`,
                      }}
                    />

                    {/* Vertical Hairline Stem */}
                    <b
                      className="absolute left-[-0.5px] bottom-[6px] w-[1px] transition-all duration-150"
                      style={{
                        height: `${pos.stemHeight}px`,
                        backgroundColor: colors.ink,
                        opacity: 0.55,
                      }}
                    />

                    {/* Peak Label Box - EXACT style as the reference box */}
                    <span
                      className={`absolute whitespace-nowrap px-2 py-1 rounded bg-white/90 shadow-sm border border-zinc-200 backdrop-blur text-zinc-800 transition-all duration-150 ${
                        pos.align === 'right'
                          ? 'right-0 translate-x-2'
                          : pos.align === 'left'
                          ? 'left-0 -translate-x-2'
                          : 'left-0 -translate-x-1/2'
                      }`}
                      style={{
                        bottom: `${pos.stemHeight + 8}px`,
                        font: `500 10.5px/1 ${MONO_STACK}`,
                        letterSpacing: ".08em",
                        color: colors.ink,
                      }}
                    >
                      {pos.name} {pos.height.toLocaleString()} m
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Built-in Altimeter Tooltip ───────────────────────── */}
        <div
          ref={altRef}
          className="absolute left-0 top-0 z-10 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            font: `500 10px/1 ${MONO_STACK}`,
            letterSpacing: ".08em",
            color: colors.ink,
          }}
          aria-hidden="true"
        >
          <b className="absolute left-[-0.5px] bottom-[6px] w-[1px] h-[26px] bg-current opacity-60" />
          <i className="absolute left-[-4px] top-[-4px] w-[8px] h-[8px] rounded-full bg-white shadow-[0_0_0_1.5px_currentColor]" />
          <span
            ref={altTextRef}
            className="absolute left-0 bottom-[34px] -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white/90 shadow-sm border border-zinc-200 backdrop-blur text-zinc-800"
          />
        </div>
      </div>
    </div>
  )
}
