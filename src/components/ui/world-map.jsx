import { memo, useId, useMemo } from "react";
import { motion } from "motion/react";

const projectPoint = ({ lat, lng }) => ({
  x: (lng + 180) * (800 / 360),
  y: (90 - lat) * (400 / 180),
});

const createCurvedPath = (start, end) => {
  const midpointX = (start.x + end.x) / 2;
  const midpointY = Math.min(start.y, end.y) - 48;
  return `M ${start.x} ${start.y} Q ${midpointX} ${midpointY} ${end.x} ${end.y}`;
};

const mapSrc = "/images/world-map.svg";

const WorldMap = memo(({ dots = [], lineColor = "#b86cff", className = "" }) => {
  const id = useId().replace(/:/g, "");

  const origins = useMemo(() => {
    const unique = new Map();

    dots.forEach((dot) => {
      unique.set(`${dot.start.lat},${dot.start.lng}`, projectPoint(dot.start));
    });

    return [...unique.values()];
  }, [dots]);

  return (
    <div className={`world-map ${className}`.trim()}>
      <img
        src={mapSrc}
        alt=""
        aria-hidden="true"
        draggable="false"
        loading="lazy"
        decoding="async"
      />

      <svg viewBox="0 0 800 400" role="img" aria-label="Connections from Delhi to international cities">
        <defs>
          <linearGradient id={`route-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {dots.map((dot, index) => {
          const start = projectPoint(dot.start);
          const end = projectPoint(dot.end);
          const path = createCurvedPath(start, end);
          const routeKey = `${dot.start.lat}-${dot.start.lng}-${dot.end.lat}-${dot.end.lng}`;

          return (
            <g key={routeKey}>
              <motion.path
                d={path}
                fill="none"
                stroke={`url(#route-gradient-${id})`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: index * 0.25, ease: "easeOut" }}
              />

              <circle cx={end.x} cy={end.y} r="3.5" fill={lineColor} opacity="0.8" />

              <circle r="3.2" fill="#ffffff">
                <animateMotion
                  dur="2.5s"
                  begin={`${index * 0.6}s`}
                  repeatCount="indefinite"
                  path={path}
                />
              </circle>
            </g>
          );
        })}

        {origins.map((origin) => (
          <g key={`origin-${origin.x}-${origin.y}`}>
            <circle cx={origin.x} cy={origin.y} r="9" fill={lineColor} opacity="0.16">
              <animate attributeName="r" values="7;13;7" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={origin.x} cy={origin.y} r="4.5" fill={lineColor} />
          </g>
        ))}
      </svg>
    </div>
  );
});

WorldMap.displayName = "WorldMap";

export default WorldMap;
