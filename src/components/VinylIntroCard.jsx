import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { socials } from "../constants";

/* ── playlist data ───────────────────────────────────── */

const PLAYLIST = [
  { title: "Starboy", artist: "The Weeknd", duration: "3:50" },
  { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
  { title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
  { title: "Save Your Tears", artist: "The Weeknd", duration: "3:35" },
  { title: "Dandelions", artist: "Ruth B.", duration: "3:54" },
];

/* ── helpers ──────────────────────────────────────────── */

function parseDuration(str) {
  const [m, s] = str.split(":").map(Number);
  return m * 60 + s;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ── component ───────────────────────────────────────── */

const VinylIntroCard = () => {
  const wrapRef = useRef(null);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [clock, setClock] = useState("");

  const track = PLAYLIST[trackIndex];
  const totalSec = parseDuration(track.duration);
  const progress = totalSec > 0 ? Math.min((elapsed / totalSec) * 100, 100) : 0;

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    if (elapsed >= totalSec) {
      setTrackIndex((idx) => (idx + 1) % PLAYLIST.length);
      setElapsed(0);
    }
  }, [elapsed, isPlaying, totalSec]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    setTrackIndex((idx) => (idx + 1) % PLAYLIST.length);
    setElapsed(0);
  };

  const prevTrack = () => {
    setTrackIndex((idx) => (idx - 1 + PLAYLIST.length) % PLAYLIST.length);
    setElapsed(0);
  };

  /* ── GSAP entrance ── */
  useGSAP(
    () => {
      const el = wrapRef.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelector(".vinyl-fusion-disc"),
        { scale: 0.7, opacity: 0, rotation: -90 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );

      gsap.fromTo(
        el.querySelectorAll(".vinyl-fusion-fade-in"),
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          delay: 0.4,
        }
      );
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className="vinyl-fusion-card">
      <div className="vinyl-fusion-noise" />

      <header className="vinyl-fusion-header vinyl-fusion-fade-in">

        <h3 className="vinyl-fusion-name">
          Shivam <span>Kumar</span>
        </h3>
        <div className="vinyl-fusion-meta">
          <p className="vinyl-fusion-location">
            <Icon icon="mdi:map-marker-outline" width="15" height="15" />
            <span>BIHAR, IN</span>
            <span className="vinyl-fusion-bullet">•</span>
            <span>{clock || "--:-- --"}</span>
          </p>
          <p className="vinyl-fusion-status">
            <span className="vinyl-fusion-status-dot" />
            <span>Available for projects</span>
          </p>
        </div>
      </header>

      <div className="vinyl-fusion-player-shell">
        <div className="vinyl-fusion-glow" />
        <div className={`vinyl-fusion-disc ${isPlaying ? "vinyl-fusion-spinning" : ""}`}>
          <div className="vinyl-fusion-groove vinyl-fusion-groove-1" />
          <div className="vinyl-fusion-groove vinyl-fusion-groove-2" />
          <div className="vinyl-fusion-groove vinyl-fusion-groove-3" />
          <div className="vinyl-fusion-groove vinyl-fusion-groove-4" />
          <div className="vinyl-fusion-groove vinyl-fusion-groove-5" />
          <div className="vinyl-fusion-label" />
        </div>

        <div className="vinyl-fusion-track vinyl-fusion-fade-in">
          <span className="vinyl-fusion-now">Now playing</span>
          <p className="vinyl-fusion-track-title">{track.title}</p>
          <p className="vinyl-fusion-track-artist">{track.artist}</p>
        </div>

        <div className="vinyl-fusion-time-row vinyl-fusion-fade-in">
          <span>{formatTime(elapsed)}</span>
          <span>{track.duration}</span>
        </div>

        <div className="vinyl-fusion-progress vinyl-fusion-fade-in">
          <div className="vinyl-fusion-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="vinyl-fusion-controls vinyl-fusion-fade-in">
          <button type="button" onClick={prevTrack} className="vinyl-fusion-mini-btn" aria-label="Previous track">
            <Icon icon="mdi:skip-previous" width="17" height="17" />
          </button>

          <button type="button" onClick={togglePlay} className="vinyl-fusion-play-btn" aria-label={isPlaying ? "Pause" : "Play"}>
            <Icon
              icon={isPlaying ? "mdi:pause" : "mdi:play"}
              width="20"
              height="20"
            />
          </button>

          <button type="button" onClick={nextTrack} className="vinyl-fusion-mini-btn" aria-label="Next track">
            <Icon icon="mdi:skip-next" width="17" height="17" />
          </button>

          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className="vinyl-fusion-mini-btn"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <Icon icon={isMuted ? "mdi:volume-off" : "mdi:volume-high"} width="17" height="17" />
          </button>
        </div>
      </div>

      <footer className="vinyl-fusion-footer vinyl-fusion-fade-in">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="vinyl-fusion-social"
            title={social.name}
          >
            <Icon icon={social.icon} width="22" height="22" />
          </a>
        ))}
      </footer>
    </div>
  );
};

export default VinylIntroCard;
