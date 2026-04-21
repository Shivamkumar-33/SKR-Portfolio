import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/* ── constants ───────────────────────────────────────── */

const GITHUB_USERNAME = "Shivamkumar-33";

const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const USER_API = `https://api.github.com/users/${GITHUB_USERNAME}`;

const LEVEL_COLORS = [
  "rgba(207,163,85,0.04)",  // 0 — empty
  "rgba(207,163,85,0.18)",  // 1
  "rgba(207,163,85,0.38)",  // 2
  "rgba(207,163,85,0.62)",  // 3
  "#cfa355",                // 4 — max
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

/* ── data helpers ────────────────────────────────────── */

/**
 * Transform the flat contributions array into a 7-row × N-col grid
 * matching the GitHub calendar layout (week columns, day rows).
 */
function buildGrid(contributions) {
  if (!contributions?.length) return { grid: [], weeks: 0, monthLabels: [] };

  // Group contributions by ISO week
  const weeks = [];
  let currentWeek = [];

  contributions.forEach((entry) => {
    const d = new Date(entry.date);
    const dayOfWeek = d.getDay(); // 0 = Sunday

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(entry);
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  // Build 7-row × weeks-col grid
  const totalWeeks = weeks.length;
  const grid = Array.from({ length: 7 }, () => Array(totalWeeks).fill(0));

  weeks.forEach((week, wIdx) => {
    week.forEach((entry) => {
      const d = new Date(entry.date);
      const dayOfWeek = d.getDay();
      grid[dayOfWeek][wIdx] = entry.level;
    });
  });

  // Build month labels (placed at the first week that starts in that month)
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, wIdx) => {
    const firstEntry = week[0];
    if (!firstEntry) return;
    const month = new Date(firstEntry.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ text: MONTH_NAMES[month], col: wIdx });
      lastMonth = month;
    }
  });

  return { grid, weeks: totalWeeks, monthLabels };
}

/** Calculate the longest consecutive-day streak */
function calcStreak(contributions) {
  if (!contributions?.length) return 0;
  let max = 0;
  let current = 0;
  for (const entry of contributions) {
    if (entry.count > 0) {
      current++;
      if (current > max) max = current;
    } else {
      current = 0;
    }
  }
  return max;
}

/* ── component ───────────────────────────────────────── */

const GitHubHeatmap = () => {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  const [contribData, setContribData] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── fetch live data ── */
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const [contribRes, userRes] = await Promise.all([
          fetch(CONTRIBUTIONS_API, { signal: controller.signal }),
          fetch(USER_API, { signal: controller.signal }),
        ]);

        if (!contribRes.ok) throw new Error("Failed to fetch contributions");

        const contribJson = await contribRes.json();
        const userJson = userRes.ok ? await userRes.json() : null;

        setContribData(contribJson);
        setUserStats(userJson);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          console.warn("GitHub data fetch failed:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  /* ── derived data ── */
  const { grid, weeks, monthLabels } = useMemo(
    () => buildGrid(contribData?.contributions),
    [contribData]
  );

  const totalContributions = contribData?.total?.lastYear ?? 0;
  const longestStreak = useMemo(
    () => calcStreak(contribData?.contributions),
    [contribData]
  );
  const publicRepos = userStats?.public_repos ?? "—";

  /* ── GSAP animate on data load ── */
  const runAnimations = useCallback(() => {
    if (hasAnimated.current || !containerRef.current || !grid.length) return;
    hasAnimated.current = true;

    const cells = containerRef.current.querySelectorAll(".gh-cell");
    if (!cells.length) return;

    gsap.fromTo(
      cells,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
        stagger: {
          each: 0.005,
          grid: [7, weeks],
          from: "start",
          axis: "x",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
        },
      }
    );

    // animate counter
    const numEl = containerRef.current.querySelector(".gh-count-num");
    if (numEl) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: totalContributions,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
        },
        onUpdate: () => {
          numEl.textContent = Math.round(obj.val).toLocaleString();
        },
      });
    }

    // fade in footer elements
    gsap.fromTo(
      containerRef.current.querySelectorAll(".gh-footer-item"),
      { y: 8, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        delay: 0.6,
      }
    );
  }, [grid, weeks, totalContributions]);

  useGSAP(
    () => {
      if (!isLoading && grid.length) runAnimations();
    },
    { scope: containerRef, dependencies: [isLoading, grid, runAnimations] }
  );

  /* ── loading state ── */
  if (isLoading) {
    return (
      <div ref={containerRef} className="gh-wrap">
        <div className="gh-header">
          <div className="gh-header-left">
            <span className="gh-label technical-label">Commit history</span>

            <h4 className="gh-title">
              <span className="gh-count-num gh-loading-pulse">—</span>
            </h4>
          </div>
        </div>
        <div className="gh-loading-grid">
          {Array.from({ length: 7 * 16 }, (_, i) => (
            <span key={i} className="gh-loading-cell" />
          ))}
        </div>
        <p className="gh-count-suffix">Loading live data from GitHub...</p>
      </div>
    );
  }

  /* ── error / empty state ── */
  if (error || !grid.length) {
    return (
      <div ref={containerRef} className="gh-wrap">
        <div className="gh-header">
          <div className="gh-header-left">
            <span className="gh-label technical-label">Commit history</span>

            <h4 className="gh-title">
              <span className="gh-count-num">—</span>
            </h4>
          </div>
        </div>
        <p className="gh-count-suffix" style={{ marginTop: "auto" }}>
          Unable to load GitHub data. <br />
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-profile-link"
          >
            View profile on GitHub →
          </a>
        </p>
      </div>
    );
  }

  /* ── main render ── */
  return (
    <div ref={containerRef} className="gh-wrap">
      {/* header */}
      <div className="gh-header">
        <div className="gh-header-left">
          <span className="gh-label technical-label">Commit history</span>

          <h4 className="gh-title">
            <span className="gh-count-num">
              {totalContributions.toLocaleString()}
            </span>{" "}
            <span className="gh-count-suffix">contributions</span>
          </h4>
        </div>
        {longestStreak > 0 && (
          <div className="gh-streak-badge">
            <span className="gh-streak-fire">🔥</span>
            <span className="gh-streak-num">{longestStreak}d</span>
            <span className="gh-streak-text">streak</span>
          </div>
        )}
      </div>

      {/* month labels */}
      <div className="gh-months" style={{ "--gh-cols": weeks }}>
        <span className="gh-month-spacer" />
        {Array.from({ length: weeks }, (_, i) => {
          const label = monthLabels.find((m) => m.col === i);
          return (
            <span key={i} className="gh-month-cell">
              {label ? label.text : ""}
            </span>
          );
        })}
      </div>

      {/* grid */}
      <div className="gh-grid-area">
        <div className="gh-day-col">
          {DAY_LABELS.map((label, i) => (
            <span key={i} className="gh-day">{label}</span>
          ))}
        </div>

        <div className="gh-grid" style={{ "--gh-cols": weeks }}>
          <div className="gh-grid-glow" />
          {grid.map((row, dayIdx) =>
            row.map((level, weekIdx) => (
              <span
                key={`${dayIdx}-${weekIdx}`}
                className={`gh-cell gh-cell-${level}`}
                style={{ background: LEVEL_COLORS[level] }}
                data-level={level}
              />
            ))
          )}
        </div>
      </div>

      {/* legend */}
      <div className="gh-legend">
        <span className="gh-legend-label">Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <span
            key={i}
            className="gh-legend-swatch"
            style={{ background: color }}
          />
        ))}
        <span className="gh-legend-label">More</span>
      </div>

      {/* footer stats — real data */}
      <div className="gh-footer">
        <a
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="gh-footer-item gh-stat-pill"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>
          <span>{publicRepos} Repos</span>
        </a>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="gh-footer-item gh-stat-pill"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
          <span>Profile</span>
        </a>
        <div className="gh-footer-item gh-stat-pill">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
          </svg>
          <span>{totalContributions} Commits</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubHeatmap;
