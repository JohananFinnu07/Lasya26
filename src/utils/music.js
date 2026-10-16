// Background music, shared by the "Open invitation" button and the music button.
// Drop one audio file (mp3 / m4a / ogg / wav) into src/assets/music/ to enable it.
const tracks = import.meta.glob("../assets/music/*.{mp3,m4a,ogg,wav}", {
  eager: true,
  query: "?url",
  import: "default",
});
const src = Object.values(tracks)[0];

const TARGET_VOLUME = 0.5;
let audio = null;
let state = "off"; // off | on | muted
let fade = null;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

export const hasMusic = () => Boolean(src);
export const getState = () => state;
export const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

function ensure() {
  if (!audio && src) {
    audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
  }
  return audio;
}

function fadeIn(a) {
  clearInterval(fade);
  fade = setInterval(() => {
    a.volume = Math.min(TARGET_VOLUME, a.volume + 0.02);
    if (a.volume >= TARGET_VOLUME) clearInterval(fade);
  }, 120);
}

/** Call this directly inside a click handler: browsers only allow sound after a tap. */
export function startMusic() {
  const a = ensure();
  if (!a || state !== "off") return;
  a.muted = false;
  a.play()
    .then(() => {
      state = "on";
      fadeIn(a);
      emit();
    })
    .catch(() => {
      state = "off";
      emit();
    });
}

/** off → play, on → mute, muted → unmute */
export function toggleMusic() {
  const a = ensure();
  if (!a) return;
  if (state === "off") return startMusic();
  a.muted = state === "on";
  state = state === "on" ? "muted" : "on";
  emit();
}

// Pause while the page is hidden (switching apps, locking the phone), resume when back.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!audio) return;
    if (document.hidden) audio.pause();
    else if (state !== "off") audio.play().catch(() => {});
  });
  ensure(); // start loading the file early so the music begins instantly on tap
}
