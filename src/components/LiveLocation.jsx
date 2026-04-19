import { useEffect, useMemo, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";

const CACHE_KEY = "liveLocationCacheV1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const TIMEOUT_MS = 5000;

const getCachedLocation = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.ts) return null;

    if (Date.now() - parsed.ts > CACHE_TTL_MS) {
      window.localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const setCachedLocation = (data) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...data, ts: Date.now() })
    );
  } catch {
    // Ignore cache write failures.
  }
};

const fetchLocation = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Location lookup failed");
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};

const LiveLocation = () => {
  const [state, setState] = useState("loading");
  const [location, setLocation] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;

    const cached = getCachedLocation();
    if (cached?.city || cached?.country_name) {
      setLocation(cached);
      setState("ready");
      return () => {
        mounted = false;
      };
    }

    setState("loading");

    fetchLocation()
      .then((data) => {
        if (!mounted) return;

        if (!data?.city && !data?.country_name) {
          throw new Error("No location data received");
        }

        setLocation(data);
        setCachedLocation(data);
        setState("ready");
      })
      .catch(() => {
        if (!mounted) return;
        setState("error");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const { line1, line2 } = useMemo(() => {
    if (state === "loading") {
      return {
        line1: "DETECTING LOCATION",
        line2: "...",
      };
    }

    if (state === "error") {
      return {
        line1: "BASED WORLDWIDE",
        line2: "REMOTE",
      };
    }

    const city = (location?.city || "").trim();
    const country =
      (location?.country_name || location?.country_code || "").trim() ||
      "INDIA";

    if (!city) {
      return {
        line1: `BASED IN ${country.toUpperCase()}`,
        line2: "",
      };
    }

    return {
      line1: `BASED IN ${city.toUpperCase()},`,
      line2: country.toUpperCase(),
    };
  }, [location, state]);

  const locationKey = `${line1}-${line2}`;

  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
      <div className="mb-2 flex items-center gap-2 text-gold">
        <span className="relative inline-flex size-3 items-center justify-center">
          <span className="absolute inline-flex size-3 rounded-full bg-gold" />
          {!reduceMotion && (
            <Motion.span
              className="absolute inline-flex size-3 rounded-full bg-gold"
              animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
          )}
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-gold/90">
          Live
        </span>
      </div>
      <Motion.div
        key={locationKey}
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.45, ease: "easeOut" }}
        className="live-location-copy flex flex-col"
      >
        <span className="live-location-primary uppercase font-bold">{line1}</span>
        {line2 ? <span className="live-location-secondary">{line2}</span> : null}
      </Motion.div>
    </div>
  );
};

export default LiveLocation;