import { motion } from 'framer-motion'
import Cross from './Cross'
import Reveal, { TextReveal } from './Reveal'
import Divider from './Divider'
import { verse } from '../data/content'

export default function BibleVerse() {
  return (
    <section id="blessing" data-tone="forest" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-32 text-center">
      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div className="relative mx-auto w-fit" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="absolute inset-0 -m-6 rounded-full bg-gold/25 blur-2xl" aria-hidden="true" />
          <Cross size={26} className="relative text-gold" />
        </motion.div>
        <div className="mt-12 font-serif text-[clamp(2rem,6vw,3.8rem)] font-medium italic leading-[1.3] text-cream">
          <TextReveal text={verse.line1} as="p" delay={0.3} stagger={0.12} />
          <TextReveal text={verse.line2} as="p" delay={1.4} stagger={0.14} className="mt-2" />
        </div>
        <Reveal delay={2.4} duration={2} className="mt-12">
          <Divider className="mb-6" />
          <p className="pl-[0.4em] font-display text-sm tracking-[0.4em] text-goldsoft">JEREMIAH 29:11</p>
        </Reveal>
      </div>
    </section>
  )
}
