import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { getState, hasMusic, subscribe, toggleMusic } from "../utils/music";

/** Speaker icon: waves when playing, a cross when muted. */
function Speaker({ state }) {
  const playing = state === "on";
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
      {playing ? (
        <>
          <motion.path
            d="M15.2 9.3a4 4 0 0 1 0 5.4"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M17.8 6.8a7.6 7.6 0 0 1 0 10.4"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.8,
              delay: 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      ) : (
        <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" />
      )}
    </svg>
  );
}

export default function MusicButton({ visible }) {
  const state = useSyncExternalStore(subscribe, getState); // off | on | muted

  // Hidden on the live site until a track exists; shown in development with a hint.
  if (!hasMusic() && !import.meta.env.DEV) return null;

  const onClick = () => {
    if (!hasMusic()) {
      alert(
        "Add an audio file to src/assets/music to enable background music.",
      );
      return;
    }
    toggleMusic();
  };
  const label =
    state === "on"
      ? "Mute music"
      : state === "muted"
        ? "Unmute music"
        : "Play music";
  const text =
    state === "on"
      ? "MUSIC ON"
      : state === "muted"
        ? "MUSIC OFF"
        : "PLAY MUSIC";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-gold bg-ink/75 py-2.5 pl-3.5 pr-4 text-cream shadow-[0_0_18px_rgba(201,162,77,0.2)] backdrop-blur-md transition-colors duration-500 hover:bg-ink"
      initial={{ opacity: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 1.2, delay: visible ? 2 : 0 }}
    >
      <span className={state === "on" ? "text-gold" : "text-cream/80"}>
        <Speaker state={state} />
      </span>
      <span
        className="font-display text-[10px] tracking-[0.22em]"
        aria-live="polite"
      >
        {text}
      </span>
    </motion.button>
  );
}
