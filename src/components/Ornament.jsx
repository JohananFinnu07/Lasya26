import { memo } from 'react'
import { motion } from 'framer-motion'

/* The gold diamond-chain frame with corner brackets, and faint maroon mandala corners. */

const GOLD = '%23C9A24D'
const tileH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12'%3E%3Cpath d='M0 6L8 0L16 6L8 12Z' fill='none' stroke='${GOLD}' stroke-width='.9'/%3E%3Cpath d='M4.5 6L8 3L11.5 6L8 9Z' fill='${GOLD}' fill-opacity='.55'/%3E%3C/svg%3E")`
const tileV = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='16'%3E%3Cpath d='M6 0L12 8L6 16L0 8Z' fill='none' stroke='${GOLD}' stroke-width='.9'/%3E%3Cpath d='M6 4.5L9 8L6 11.5L3 8Z' fill='${GOLD}' fill-opacity='.55'/%3E%3C/svg%3E")`

function Bracket({ flip = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={`absolute left-[14px] top-[14px] w-11 md:w-16 ${flip}`} fill="none" stroke="#C9A24D" strokeWidth="1">
      <path d="M2 2H58M2 2V58M9 9H44M9 9V44M2 2L9 9" />
      <circle cx="58" cy="2" r="1.7" fill="#C9A24D" stroke="none" />
      <circle cx="2" cy="58" r="1.7" fill="#C9A24D" stroke="none" />
      <circle cx="44" cy="9" r="1.4" fill="#C9A24D" stroke="none" />
      <circle cx="9" cy="44" r="1.4" fill="#C9A24D" stroke="none" />
    </svg>
  )
}

/** Position it with className (inset-*). ready: true/false to control it, or leave undefined to reveal on scroll. */
export function Frame({ className = 'inset-4', ready }) {
  const hide = { opacity: 0, clipPath: 'inset(50% 50% 50% 50%)' }
  const show = { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }
  const trigger = ready === undefined ? { whileInView: show, viewport: { once: true, amount: 0.2 } } : { animate: ready ? show : hide }
  const strip = { backgroundRepeat: 'repeat-x', backgroundPosition: 'center' }
  const stripV = { backgroundRepeat: 'repeat-y', backgroundPosition: 'center' }
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-[4] ${className}`}
      style={{ filter: 'drop-shadow(0 0 7px rgba(201,162,77,0.28))' }}
      initial={hide}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      {...trigger}
    >
      <div className="absolute left-5 right-5 top-0 h-3" style={{ ...strip, backgroundImage: tileH }} />
      <div className="absolute bottom-0 left-5 right-5 h-3" style={{ ...strip, backgroundImage: tileH }} />
      <div className="absolute bottom-5 left-0 top-5 w-3" style={{ ...stripV, backgroundImage: tileV }} />
      <div className="absolute bottom-5 right-0 top-5 w-3" style={{ ...stripV, backgroundImage: tileV }} />
      {['left-[1px] top-[1px]', 'right-[1px] top-[1px]', 'left-[1px] bottom-[1px]', 'right-[1px] bottom-[1px]'].map((p) => (
        <span key={p} className={`absolute h-2.5 w-2.5 rotate-45 bg-gold ${p}`} />
      ))}
      <Bracket />
      <div className="absolute inset-0 -scale-x-100"><Bracket /></div>
      <div className="absolute inset-0 -scale-y-100"><Bracket /></div>
      <div className="absolute inset-0 scale-[-1]"><Bracket /></div>
    </motion.div>
  )
}

const petal = 'M0 0C-9 -14 -10 -34 0 -52C10 -34 9 -14 0 0Z'
const POS = {
  tl: '-left-[24%] -top-[14%]',
  tr: '-right-[24%] -top-[14%]',
  bl: '-left-[24%] -bottom-[14%]',
  br: '-right-[24%] -bottom-[14%]',
  c: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
}
const rings = [26, 44, 62, 78, 92]
const outer = Array.from({ length: 18 }, (_, i) => i * 20)
const inner = Array.from({ length: 12 }, (_, i) => i * 30 + 15)
const dots = Array.from({ length: 48 }, (_, i) => i * 7.5)

/** Fine line mandala. pos: tl | tr | bl | br | c. tone 'gold' for a golden one. */
export const Mandala = memo(function Mandala({ pos = 'tl', className = 'w-[78vw] max-w-[560px]', tone = 'maroon', opacity = 0.4, spin = true }) {
  const stroke = tone === 'gold' ? '#C9A24D' : '#9a4a47'
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute z-[1] ${POS[pos]} ${className}`} style={{ opacity }}>
      <motion.svg
        viewBox="-100 -100 200 200"
        className="block w-full"
        fill="none"
        stroke={stroke}
        strokeWidth="0.55"
        animate={spin ? { rotate: 360 } : undefined}
        transition={{ duration: 260, repeat: Infinity, ease: 'linear' }}
      >
        {rings.map((r) => (
          <circle key={r} r={r} />
        ))}
        {outer.map((a) => (
          <path key={a} d={petal} transform={`rotate(${a}) translate(0 -44) scale(.9)`} />
        ))}
        {inner.map((a) => (
          <path key={a} d={petal} transform={`rotate(${a}) translate(0 -14) scale(.5)`} />
        ))}
        {dots.map((a) => (
          <circle key={a} cx="0" cy="-86" r="0.9" fill={stroke} stroke="none" transform={`rotate(${a})`} />
        ))}
      </motion.svg>
    </div>
  )
})

/** One fixed layer of faint mandalas behind the whole page, so nothing is cut off at section edges. */
export function MandalaLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <Mandala pos="tl" opacity={0.3} />
      <Mandala pos="tr" opacity={0.3} />
      <Mandala pos="bl" opacity={0.3} />
      <Mandala pos="br" opacity={0.3} />
    </div>
  )
}
