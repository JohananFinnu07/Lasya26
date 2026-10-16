import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { getState, hasMusic, subscribe, toggleMusic } from "../utils/music";

/** Speaker icon: waves pulse while playing, a cross shows when muted or not started. */
function Speaker({ playing }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
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
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M17.8 6.8a7.6 7.6 0 0 1 0 10.4"
            animate={{ opacity: [0.15, 1, 0.15] }}
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

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ink/75 shadow-[0_0_18px_rgba(201,162,77,0.2)] backdrop-blur-md transition-colors duration-500 hover:bg-ink ${state === "on" ? "text-gold" : "text-cream/80"}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 1.2, delay: visible ? 2 : 0 }}
    >
      <Speaker playing={state === "on"} />
    </motion.button>
  );
}
