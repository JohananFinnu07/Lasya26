import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const musicFiles = import.meta.glob("../assets/music/*.{mp3,m4a,ogg,wav}", {
  eager: true,
  query: "?url",
  import: "default",
});

const musicSrc = Object.values(musicFiles)[0];

export default function MusicButton({ visible = true }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!musicSrc) {
      console.warn("No music file found in src/assets/music/");
      return;
    }

    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play music:", error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggleMusic}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
      aria-label={
        isPlaying ? "Pause background music" : "Play background music"
      }
      aria-pressed={isPlaying}
      className="fixed bottom-5 right-5 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a96e]/60 bg-[#211414]/90 text-[#e8d2a2] shadow-lg backdrop-blur-md transition-colors hover:bg-[#392323] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]"
      style={{
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {isPlaying ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      )}
    </motion.button>
  );
}
