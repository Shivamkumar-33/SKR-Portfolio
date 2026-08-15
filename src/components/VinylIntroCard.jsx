import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { socials } from "../constants";

/* ── YouTube Music playlist ───────────────────────────── */

const PLAYLIST = [
  { id: "34Na4j8AVgA", title: "Starboy", artist: "The Weeknd" },
  { id: "fHI8X4OXluQ", title: "Blinding Lights", artist: "The Weeknd" },
  { id: "TUVcZfQe-Kw", title: "Levitating", artist: "Dua Lipa" },
  { id: "u6lihZAcy4s", title: "Save Your Tears", artist: "The Weeknd" },
  { id: "HZbsLxL7GeM", title: "Dandelions", artist: "Ruth B." },
  { id: "2Vv-BfVoq4g", title: "Perfect", artist: "Ed Sheeran" },
  { id: "JGwWNGJdvx8", title: "Shape of You", artist: "Ed Sheeran" },
  { id: "kJQP7kiw5Fk", title: "Despacito", artist: "Luis Fonsi" },
  { id: "RgKAFK5djSk", title: "See You Again", artist: "Wiz Khalifa" },
  { id: "OPf0YbXqDm0", title: "Uptown Funk", artist: "Mark Ronson" },
  { id: "09R8_2nJtjg", title: "Sugar", artist: "Maroon 5" },
  { id: "CevxZvSJLk8", title: "Roar", artist: "Katy Perry" },
];

const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

function formatTime(seconds) {
  const totalSec = Math.max(0, Math.floor(seconds || 0));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function loadYouTubeApi() {
  return new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve(window.YT);
    };
    const fail = (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    };

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      done();
    };

    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => fail(new Error("YouTube API failed to load"));
      document.body.appendChild(script);
    }

    window.setTimeout(() => {
      if (window.YT?.Player) done();
      else fail(new Error("YouTube API timed out"));
    }, 12000);
  });
}

/* ── component ───────────────────────────────────────── */

const VinylIntroCard = () => {
  const wrapRef = useRef(null);
  const playerHostRef = useRef(null);
  const playerRef = useRef(null);
  const trackIndexRef = useRef(0);
  const pollRef = useRef(null);
  const playingIntentRef = useRef(false);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Loading…");
  const [clock, setClock] = useState("");

  const track = PLAYLIST[trackIndex];
  const art = ytThumb(track.id);
  const progress = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  const stopPoll = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const startPoll = useCallback(() => {
    stopPoll();
    pollRef.current = setInterval(() => {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      try {
        setPosition(player.getCurrentTime() || 0);
        const d = player.getDuration?.() || 0;
        if (d && Number.isFinite(d)) setDuration(d);
      } catch {
        /* player may be mid-load */
      }
    }, 250);
  }, [stopPoll]);

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

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
    let disposed = false;

    const boot = async () => {
      try {
        const YT = await loadYouTubeApi();
        if (disposed || !playerHostRef.current) return;

        playerRef.current = new YT.Player(playerHostRef.current, {
          width: "320",
          height: "180",
          videoId: PLAYLIST[0].id,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            iv_load_policy: 3,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (disposed) return;
              setReady(true);
              setStatus("YouTube Music");
              try {
                const d = event.target.getDuration?.() || 0;
                if (d) setDuration(d);
              } catch {
                /* ignore */
              }
            },
            onStateChange: (event) => {
              if (disposed) return;
              const YTStates = window.YT.PlayerState;
              const state = event.data;

              if (state === YTStates.PLAYING) {
                playingIntentRef.current = true;
                setIsPlaying(true);
                setStatus("Now playing");
                startPoll();
                try {
                  const d = event.target.getDuration?.() || 0;
                  if (d) setDuration(d);
                } catch {
                  /* ignore */
                }
              } else if (state === YTStates.PAUSED) {
                playingIntentRef.current = false;
                setIsPlaying(false);
                setStatus("Paused");
                stopPoll();
              } else if (state === YTStates.BUFFERING) {
                setStatus("Buffering…");
              } else if (state === YTStates.ENDED) {
                stopPoll();
                const next = (trackIndexRef.current + 1) % PLAYLIST.length;
                trackIndexRef.current = next;
                setTrackIndex(next);
                setPosition(0);
                setDuration(0);
                playingIntentRef.current = true;
                setStatus("Now playing");
                event.target.loadVideoById(PLAYLIST[next].id);
              } else if (state === YTStates.CUED) {
                setIsPlaying(false);
                if (!playingIntentRef.current) setStatus("YouTube Music");
              }
            },
            onError: () => {
              if (disposed) return;
              setStatus("Skipping…");
              const next = (trackIndexRef.current + 1) % PLAYLIST.length;
              trackIndexRef.current = next;
              setTrackIndex(next);
              setPosition(0);
              const player = playerRef.current;
              if (!player) return;
              if (playingIntentRef.current) player.loadVideoById(PLAYLIST[next].id);
              else player.cueVideoById(PLAYLIST[next].id);
            },
          },
        });
      } catch {
        if (!disposed) {
          setReady(false);
          setStatus("Player unavailable");
        }
      }
    };

    boot();

    return () => {
      disposed = true;
      stopPoll();
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [startPoll, stopPoll]);

  const playTrackAt = useCallback((index, shouldPlay) => {
    const player = playerRef.current;
    if (!player?.loadVideoById) return;

    setTrackIndex(index);
    setPosition(0);
    setDuration(0);
    playingIntentRef.current = shouldPlay;

    if (shouldPlay) {
      setStatus("Now playing");
      player.loadVideoById(PLAYLIST[index].id);
    } else {
      setStatus("YouTube Music");
      player.cueVideoById(PLAYLIST[index].id);
    }
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player?.playVideo) return;

    if (isPlaying) {
      playingIntentRef.current = false;
      player.pauseVideo();
      return;
    }

    playingIntentRef.current = true;
    setStatus("Now playing");
    player.playVideo();
  };

  const nextTrack = () => {
    const next = (trackIndex + 1) % PLAYLIST.length;
    playTrackAt(next, isPlaying || playingIntentRef.current);
  };

  const prevTrack = () => {
    const player = playerRef.current;
    if (!player) return;

    if (position > 3) {
      player.seekTo(0, true);
      setPosition(0);
      return;
    }

    const prev = (trackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    playTrackAt(prev, isPlaying || playingIntentRef.current);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player?.mute) return;

    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

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

      <div className="vinyl-fusion-yt-host" aria-hidden="true">
        <div ref={playerHostRef} />
      </div>

      <header className="vinyl-fusion-header vinyl-fusion-fade-in">
        <h3 className="vinyl-fusion-name">
          Shivam<span className="animated-gradient-text">Kumar</span>
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
        <div
          className={`vinyl-fusion-disc ${isPlaying ? "vinyl-fusion-spinning" : ""}`}
        >
          <div className="vinyl-fusion-groove vinyl-fusion-groove-1" />
          <div className="vinyl-fusion-groove vinyl-fusion-groove-2" />
          <div className="vinyl-fusion-groove vinyl-fusion-groove-3" />
          <div className="vinyl-fusion-groove vinyl-fusion-groove-4" />
          <div className="vinyl-fusion-groove vinyl-fusion-groove-5" />
          <div
            className="vinyl-fusion-label"
            style={{
              backgroundImage: `url(${art})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="vinyl-fusion-track vinyl-fusion-fade-in">
          <span className="vinyl-fusion-now">
            <Icon icon="simple-icons:youtubemusic" width="11" height="11" />
            {status}
            <span className="vinyl-fusion-track-count">
              {trackIndex + 1}/{PLAYLIST.length}
            </span>
          </span>
          <p className="vinyl-fusion-track-title">{track.title}</p>
          <p className="vinyl-fusion-track-artist">{track.artist}</p>
        </div>

        <div className="vinyl-fusion-time-row vinyl-fusion-fade-in">
          <span>{formatTime(position)}</span>
          <span>{duration ? formatTime(duration) : "--:--"}</span>
        </div>

        <div className="vinyl-fusion-progress vinyl-fusion-fade-in">
          <div
            className="vinyl-fusion-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="vinyl-fusion-controls vinyl-fusion-fade-in">
          <button
            type="button"
            onClick={prevTrack}
            className="vinyl-fusion-mini-btn"
            aria-label="Previous track"
            disabled={!ready}
          >
            <Icon icon="mdi:skip-previous" width="17" height="17" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="vinyl-fusion-play-btn"
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={!ready}
          >
            <Icon
              icon={isPlaying ? "mdi:pause" : "mdi:play"}
              width="20"
              height="20"
            />
          </button>

          <button
            type="button"
            onClick={nextTrack}
            className="vinyl-fusion-mini-btn"
            aria-label="Next track"
            disabled={!ready}
          >
            <Icon icon="mdi:skip-next" width="17" height="17" />
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="vinyl-fusion-mini-btn"
            aria-label={isMuted ? "Unmute" : "Mute"}
            disabled={!ready}
          >
            <Icon
              icon={isMuted ? "mdi:volume-off" : "mdi:volume-high"}
              width="17"
              height="17"
            />
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
        <a
          href="/assets/resume/Shivamkumar_resume.pdf"
          download="Shivamkumar_resume.pdf"
          aria-label="Download resume"
          className="vinyl-fusion-social vinyl-fusion-download"
          title="Download Resume"
        >
          <Icon icon="ph:file-arrow-down-duotone" width="22" height="22" />
        </a>
      </footer>
    </div>
  );
};

export default VinylIntroCard;
