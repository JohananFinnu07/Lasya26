import { useState } from 'react'
import Cross from './Cross'
import { Frame } from './Ornament'
import Divider from './Divider'
import { Stagger, Item } from './Reveal'
import { CheckIcon, LinkIcon, ShareIcon } from './Icons'

const btn =
  'inline-flex items-center justify-center gap-3 rounded-full border border-gold bg-ink/30 px-7 py-3.5 font-display text-xs tracking-[0.3em] text-cream backdrop-blur-sm transition-colors duration-700 hover:bg-gold hover:text-ink'

function ShareRow() {
  const [copied, setCopied] = useState(false)
  const url = typeof window === 'undefined' ? '' : `${window.location.origin}${window.location.pathname}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard unavailable */
    }
  }
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Talari Lasya’s Half Saree Ceremony', text: 'You are warmly invited to Lasya’s Half Saree Ceremony on 26 October 2026.', url })
      } catch {
        /* cancelled */
      }
    } else {
      copy()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <button type="button" onClick={share} className={btn}>
        <ShareIcon className="h-4 w-4" />
        SHARE
      </button>
      <button type="button" onClick={copy} className={btn} aria-live="polite">
        {copied ? <CheckIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
        {copied ? 'LINK COPIED' : 'COPY LINK'}
      </button>
    </div>
  )
}

/** A quiet, framed closing page. */
export default function Finale() {
  return (
    <section id="finale" data-tone="night" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,162,77,0.2), rgba(142,59,70,0.1) 45%, transparent 70%)', animation: 'glowpulse 9s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-20 text-center md:px-14 md:py-24">
        <Frame className="inset-0" />
        <Stagger gap={0.6} delay={0.4} amount={0.15}>
          <Item>
            <Cross size={20} className="mx-auto text-gold" />
          </Item>
          <Item className="mt-5">
            <p className="font-serif text-2xl italic text-goldsoft">With Love,</p>
            <p className="mt-1 pl-[0.2em] font-display text-lg tracking-[0.2em] md:text-xl">TALARI FAMILY</p>
          </Item>
          <Item className="mt-6">
            <p className="sr-only">Talari Lasya</p>
            <p aria-hidden="true" className="foil font-script text-[clamp(5rem,22vw,9rem)] leading-[1.05]">Lasya</p>
            <p className="pl-[0.3em] font-display text-sm tracking-[0.3em] text-cream/90 md:text-base">26 OCTOBER 2026</p>
          </Item>
          <Item className="mt-10">
            <Divider />
            <p className="mx-auto mt-8 max-w-sm font-serif text-xl leading-relaxed text-cream/90 md:text-2xl">
              We look forward to celebrating this beautiful day with you and your blessings.
            </p>
            <p className="mt-5 font-serif text-lg italic text-goldsoft md:text-xl">Thank you for being part of our celebration.</p>
          </Item>
          <Item className="mt-10">
            <ShareRow />
          </Item>
        </Stagger>
      </div>
    </section>
  )
}
