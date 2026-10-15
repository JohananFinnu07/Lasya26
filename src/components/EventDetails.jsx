import { motion } from 'framer-motion'
import { Mandala } from './Ornament'
import Reveal, { ease } from './Reveal'
import Divider from './Divider'
import { event } from '../data/content'

export default function EventDetails() {
  return (
    <section id="details" data-tone="teal" className="relative overflow-hidden px-6 py-32 text-center md:py-44">
      <div className="relative z-10 mx-auto max-w-3xl">
        <Mandala pos="c" tone="gold" opacity={0.22} className="w-[130%] max-w-[760px]" />
        <div className="relative">
          <motion.p className="font-display text-base text-goldsoft md:text-lg" initial={{ opacity: 0, letterSpacing: '1.2em' }} whileInView={{ opacity: 1, letterSpacing: '0.6em' }} viewport={{ once: true }} transition={{ duration: 2.2, ease }}>
            MONDAY
          </motion.p>
          <div className="overflow-hidden">
            <motion.p className="foil font-display text-[clamp(8rem,34vw,17rem)] leading-[1.05]" initial={{ y: '100%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 1.8, ease, delay: 0.2 }}>
              {event.day}
            </motion.p>
          </div>
          <Reveal delay={0.5} className="mt-2">
            <div className="flex items-center justify-center gap-5 md:gap-8">
              <span className="h-px w-10 bg-gold md:w-24" />
              <div className="pl-[0.4em] font-display text-base tracking-[0.5em] md:text-xl">
                <p>OCTOBER</p>
                <p className="mt-2">{event.year}</p>
              </div>
              <span className="h-px w-10 bg-gold md:w-24" />
            </div>
          </Reveal>
          <Reveal delay={0.7} className="mt-12">
            <p className="font-display text-3xl tracking-[0.2em] text-goldsoft md:text-4xl">{event.time}</p>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="relative mt-16">
          <Divider className="mb-10" />
          <p className="mx-auto max-w-md font-serif text-2xl italic leading-snug text-cream md:text-3xl">{event.tagline}</p>
          <div className="mt-12">
            <p className="pl-[0.5em] font-display text-sm tracking-[0.5em] text-goldsoft">LUNCH</p>
            <p className="mt-2 font-display text-xl tracking-[0.08em] md:text-2xl">{event.lunch}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
