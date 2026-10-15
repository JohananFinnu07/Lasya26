import { motion } from "framer-motion";
import { Frame } from "./Ornament";
import Divider from "./Divider";
import { Stagger, Item, ease } from "./Reveal";
import { invitation, event } from "../data/content";

export default function Invitation() {
  return (
    <section
      id="invitation"
      data-tone="moss"
      className="relative overflow-hidden px-5 py-28 md:py-40"
      style={{ perspective: 1800 }}
    >
      <motion.div
        className="relative z-10 mx-auto max-w-2xl bg-ink/50 px-6 py-20 text-center backdrop-blur-[2px] md:px-16 md:py-28"
        style={{ transformOrigin: "top center" }}
        initial={{ opacity: 0, rotateX: -22, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.9, ease }}
      >
        <Frame className="inset-2 md:inset-3" />
        <Stagger gap={0.5} delay={0.5} amount={0.1}>
          <Item>
            <p className="font-serif text-xl italic text-goldsoft md:text-2xl">
              {invitation.blessingsLabel}
            </p>
            <p className="mt-3 font-display text-lg tracking-[0.08em] md:text-2xl">
              {invitation.blessingsFrom}
            </p>
          </Item>
          <Item className="mt-8">
            <Divider />
          </Item>
          <Item className="mt-8">
            <p className="mx-auto max-w-md font-serif text-xl leading-relaxed text-cream/90 md:text-2xl">
              {invitation.message}
            </p>
          </Item>
          <Item className="mt-12">
            <p className="foil font-script text-[clamp(3rem,10vw,4.6rem)] leading-tight">
              {event.celebrant}’s
            </p>
            <p className="mt-2 pl-[0.3em] font-display text-base tracking-[0.3em] text-cream md:text-xl">
              HALF SAREE CEREMONY
            </p>
          </Item>
        </Stagger>
      </motion.div>
    </section>
  );
}
