import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { getState, hasMusic, subscribe, toggleMusic } from "../utils/music";

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
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-ink/50 text-cream backdrop-blur-md transition-colors duration-500 hover:bg-ink/80"
      initial={{ opacity: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 1.2, delay: visible ? 2 : 0 }}
    >
      {state === "on" ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
          {[0, 0.4, 0.8].map((d) => (
            <motion.span
              key={d}
              className="w-[2px] rounded-full bg-gold"
              animate={{ height: ["30%", "100%", "30%"] }}
              transition={{
                duration: 1.8,
                delay: d,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
          {state === "muted" && <path d="M3 3l18 18" />}
        </svg>
      )}
    </motion.button>
  );
}
