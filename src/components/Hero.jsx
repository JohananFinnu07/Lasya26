import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Cross from './Cross'
import { Frame } from './Ornament'
import cutout from '../assets/cover-lasya.webp'
import { ease } from './Reveal'

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yGirl = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -90])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const mask = 'linear-gradient(to bottom, #000 72%, transparent 100%)'

  return (
    <section id="home" data-tone="ink" ref={ref} className="relative flex h-[100svh] min-h-[620px] flex-col items-center overflow-hidden px-6 pb-[4.6rem] pt-[7.6rem] text-cream">
      <Frame ready={ready} className="inset-x-4 bottom-4 top-[4.9rem] md:inset-x-[5vmin] md:bottom-[5vmin] md:top-[5.6rem]" />

      <div className="pointer-events-none absolute left-1/2 top-[46%] z-[2] h-[85vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,162,77,0.22), rgba(142,59,70,0.14) 45%, transparent 70%)' }} />

      <motion.div style={{ opacity: fade }} className="relative z-[5] flex flex-col items-center text-center" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.8, delay: ready ? 0.6 : 0 }}>
        <Cross size={16} className="text-gold" />
        <p className="mt-3 pl-[0.3em] font-display text-[11px] tracking-[0.3em] text-cream/90 sm:text-sm">TALARI’S HALF SAREE CEREMONY</p>
      </motion.div>

      <motion.div style={{ y: yGirl }} className="relative z-[3] min-h-0 w-full flex-1">
        <div className="absolute inset-0 flex justify-center">
          <motion.img
            src={cutout}
            alt="Talari Lasya"
            fetchpriority="high"
            className="h-full w-auto max-w-full object-contain object-bottom"
            style={{ WebkitMaskImage: mask, maskImage: mask, filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.55))' }}
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.97 }}
            transition={{ duration: 2.2, delay: ready ? 0.3 : 0, ease }}
          />
        </div>
      </motion.div>

      <motion.div style={{ y: yText, opacity: fade }} className="relative z-[5] -mt-[clamp(2.8rem,8svh,5rem)] flex w-full flex-col items-center text-center">
        <h1 className="sr-only">Talari Lasya’s Half Saree Ceremony</h1>
        <p aria-hidden="true" className="pl-[0.5em] font-display text-xs tracking-[0.5em] text-goldsoft sm:text-sm">TALARI</p>
        <motion.p
          aria-hidden="true"
          className="-mt-1 px-6 font-script text-[clamp(4.4rem,20vw,8.5rem)] leading-[1.05] text-cream"
          style={{ textShadow: '0 6px 26px rgba(0,0,0,0.6)' }}
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          animate={ready ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          transition={{ duration: 2.4, delay: ready ? 1.1 : 0, ease }}
        >
          Lasya
        </motion.p>
        <motion.div
          className="flex w-full max-w-[460px] items-center justify-center gap-4 font-display text-lg tracking-[0.14em] md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.8, delay: ready ? 2.3 : 0 }}
        >
          <span className="h-px flex-1 bg-gold" />
          26/10/2026
          <span className="h-px flex-1 bg-gold" />
        </motion.div>
        <motion.p className="mt-2 pl-[0.35em] font-display text-xs tracking-[0.35em] text-goldsoft" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.8, delay: ready ? 2.6 : 0 }}>
          9:30 AM
        </motion.p>
        <motion.a href="#blessing" aria-label="Scroll to explore" className="mt-2 text-gold" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.6, delay: ready ? 3.2 : 0 }}>
          <motion.span className="block" aria-hidden="true" animate={{ y: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
