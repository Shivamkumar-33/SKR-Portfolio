import { useRef, useState, useEffect, useCallback, useMemo } from "react";

const STORAGE_KEY = "shivam-reaction-board";
const MAX_BOARD = 3;

function loadBoard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function saveBoard(times) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(times.slice(0, MAX_BOARD)));
  } catch {
    /* ignore */
  }
}

const ReactionTimeTest = () => {
  const [phase, setPhase] = useState("idle");
  const [lastMs, setLastMs] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [board, setBoard] = useState([]);

  const timerRef = useRef(null);
  const goAtRef = useRef(0);

  useEffect(() => {
    setBoard(loadBoard());
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const average = useMemo(() => {
    if (!attempts.length) return null;
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
  }, [attempts]);

  const best = board[0] ?? null;

  const clearWait = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const armRound = useCallback(() => {
    clearWait();
    setPhase("waiting");
    setLastMs(null);
    const delay = 1200 + Math.random() * 2800;
    timerRef.current = setTimeout(() => {
      goAtRef.current = performance.now();
      setPhase("ready");
      timerRef.current = null;
    }, delay);
  }, [clearWait]);

  const recordScore = useCallback((ms) => {
    setLastMs(ms);
    setPhase("result");
    setAttempts((prev) => [...prev, ms].slice(-12));
    setBoard((prev) => {
      const next = [...prev, ms].sort((a, b) => a - b).slice(0, MAX_BOARD);
      saveBoard(next);
      return next;
    });
  }, []);

  const onPadPointer = useCallback(
    (e) => {
      e.preventDefault();
      if (phase === "idle" || phase === "result" || phase === "early") {
        armRound();
        return;
      }
      if (phase === "waiting") {
        clearWait();
        setPhase("early");
        setLastMs(null);
        return;
      }
      if (phase === "ready") {
        const ms = Math.round(performance.now() - goAtRef.current);
        recordScore(Math.max(1, ms));
      }
    },
    [phase, armRound, clearWait, recordScore]
  );

  const resetAll = useCallback((e) => {
    e.stopPropagation();
    clearWait();
    localStorage.removeItem(STORAGE_KEY);
    setBoard([]);
    setAttempts([]);
    setLastMs(null);
    setPhase("idle");
  }, [clearWait]);

  const copy = {
    idle: { title: "Tap to start", sub: "Wait for green" },
    waiting: { title: "Wait", sub: "Hold still" },
    ready: { title: "Go", sub: "Tap now" },
    early: { title: "Too soon", sub: "Try again" },
    result: {
      title: lastMs != null ? `${lastMs}` : "—",
      sub: lastMs != null ? "ms · tap to retry" : "tap to retry",
    },
  }[phase];

  // Always 3 slots so footer height never shifts
  const slots = [0, 1, 2].map((i) => board[i] ?? null);

  return (
    <div className="rt-wrap">
      <header className="rt-top">
        <span className="rt-label">Reaction</span>
        <button type="button" className="rt-clear" onClick={resetAll} aria-label="Clear scores">
          Clear
        </button>
      </header>

      <button
        type="button"
        className={`rt-pad rt-pad-${phase}`}
        onPointerDown={onPadPointer}
        aria-label="Reaction time pad"
      >
        <span className="rt-pad-aura" aria-hidden="true" />
        <span className="rt-pad-title">
          {copy.title}
          {phase === "result" && <span className="rt-ms">ms</span>}
        </span>
        <span className="rt-pad-sub">{copy.sub}</span>
      </button>

      <footer className="rt-stats">
        <div className="rt-stat">
          <span className="rt-stat-val">{lastMs ?? "—"}</span>
          <span className="rt-stat-key">Last</span>
        </div>
        <div className="rt-stat">
          <span className="rt-stat-val">{average ?? "—"}</span>
          <span className="rt-stat-key">Avg</span>
        </div>
        <div className="rt-stat">
          <span className="rt-stat-val">{best ?? "—"}</span>
          <span className="rt-stat-key">Best</span>
        </div>
      </footer>

      <div className="rt-tops" aria-label="Top times">
        {slots.map((ms, i) => (
          <span
            key={i}
            className={`rt-top-pill${ms != null && lastMs === ms && board.indexOf(lastMs) === i ? " is-hot" : ""}${ms == null ? " is-empty" : ""}`}
          >
            {ms != null ? `${ms}` : "·"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReactionTimeTest;
