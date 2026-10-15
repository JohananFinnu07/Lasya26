import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Place your music file inside src/assets/music/
// Supported formats: mp3, m4a, ogg, wav
const tracks = import.meta.glob("../assets/music/*.{mp3,m4a,ogg,wav}", {
  eager: true,
  query: "?url",
  import: "default",
});

const src = Object.values(tracks)[0];

export default function MusicButton({ visible }) {
  const audio = useRef(null);
  const [state, setState] = useState("off"); // off | on | muted

  useEffect(() => {
    if (!src) {
      console.warn("No music file found in src/assets/music/");
      return;
    }

    const player = new Audio(src);
    player.loop = true;
    player.volume = 0.45;
    player.preload = "auto";

    const handlePlay = () => setState("on");

    const handlePause = () => {
      if (state !== "muted") setState("off");
    };

    const handleError = () => {
      console.error("Music failed to load:", player.error, src);
      setState("off");
    };

    player.addEventListener("play", handlePlay);
    player.addEventListener("pause", handlePause);
    player.addEventListener("error", handleError);

    audio.current = player;

    return () => {
      player.pause();
      player.removeEventListener("play", handlePlay);
      player.removeEventListener("pause", handlePause);
      player.removeEventListener("error", handleError);
      player.src = "";
      audio.current = null;
    };
  }, []);

  // Hide the button on the live site if no music file exists.
  if (!src && !import.meta.env.DEV) return null;

  const toggle = async () => {
    const player = audio.current;

    if (!player) {
      console.error(
        "No music file found. Add an MP3, M4A, OGG, or WAV file to src/assets/music/.",
      );
      return;
    }

    try {
      // Playing: mute the music.
      if (!player.paused && !player.muted) {
        player.muted = true;
        setState("muted");
        return;
      }

      // Already playing but muted: unmute it.
      if (!player.paused && player.muted) {
        player.muted = false;
        setState("on");
        return;
      }

      // Start playback directly from the user's tap/click.
      player.muted = false;
      await player.play();
      setState("on");
    } catch (error) {
      console.error("Could not play music:", error);
      setState("off");
    }
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
      onClick={toggle}
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
          {[0, 0.4, 0.8].map((delay) => (
            <motion.span
              key={delay}
              className="w-[2px] rounded-full bg-gold"
              animate={{ height: ["30%", "100%", "30%"] }}
              transition={{
                duration: 1.8,
                delay,
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
