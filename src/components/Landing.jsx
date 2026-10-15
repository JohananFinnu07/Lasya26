import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Mandala } from './Ornament'

const ease = [0.22, 1, 0.36, 1]

/** First screen: the gold-framed cover with a tap-to-open icon. */
export default function Landing({ stage, onOpen, guest }) {
  const opened = stage !== 'closed'

  return (
    <AnimatePresence>
      {stage !== 'open' && (
        <motion.div
          key="landing"
          className="fixed inset-0 z-[60] overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at 50% 42%, #2b1c1d 0%, #150c0d 78%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease }}
          role="dialog"
          aria-label="Invitation cover"
        >
          <Mandala pos="tl" />
          <Mandala pos="tr" />
          <Mandala pos="bl" />
          <Mandala pos="br" />
          <Frame ready className="inset-5 sm:inset-8 md:inset-[7vmin]" />

          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center"
            animate={{ opacity: opened ? 0 : 1, y: opened ? -14 : 0, scale: opened ? 1.04 : 1 }}
            transition={{ duration: 1.1, ease }}
          >
            {guest && (
              <motion.p className="mb-6 font-serif text-lg italic text-goldsoft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 1.4 }}>
                Invitation for {guest}
              </motion.p>
            )}
            <motion.p
              className="pl-[0.55em] font-display text-base tracking-[0.55em] text-cream/90 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.8, ease }}
            >
              TALARI
            </motion.p>
            <motion.h1
              className="mt-2 pl-[0.2em] font-display text-[clamp(3.4rem,17vw,7rem)] leading-none tracking-[0.2em] text-cream"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 1.1, ease }}
            >
              LASYA
            </motion.h1>
            <motion.p
              className="mt-3 pl-[0.4em] font-display text-[10px] tracking-[0.4em] text-cream/80 sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 1.5 }}
            >
              HALF SAREE CEREMONY
            </motion.p>

            <motion.div className="mt-14 flex flex-col items-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, delay: 2.1, ease }}>
              <button type="button" onClick={onOpen} disabled={opened} aria-label="Open invitation" className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-ink/40 text-gold shadow-[0_0_24px_rgba(201,162,77,0.25)] transition-colors duration-700 hover:bg-gold hover:text-ink">
                {[0, 1.2].map((d) => (
                  <motion.span
                    key={d}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-gold/70"
                    animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                    transition={{ duration: 2.6, delay: d, repeat: Infinity, ease: 'easeOut' }}
                  />
                ))}
                <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="8" width="24" height="16" rx="1.5" />
                  <path d="M4.5 9.5L16 18l11.5-8.5" />
                </svg>
              </button>
              <p className="mt-4 pl-[0.4em] font-display text-[10px] tracking-[0.4em] text-goldsoft">OPEN INVITATION</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
