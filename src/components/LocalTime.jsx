import { useState, useEffect } from "react";

const LocalTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="local-time-wrap mt-1 flex items-center gap-2 font-mono text-[9px] tracking-widest sm:mt-1.5 sm:text-[10px]">
      <div className="local-time-dot size-1.5 rounded-full" />
      <span className="local-time-text">LOCAL TIME • {time || "..."}</span>
    </div>
  );
};

export default LocalTime;