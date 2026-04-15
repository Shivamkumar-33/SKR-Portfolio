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
    <div className="flex items-center gap-2 mt-1 sm:mt-1.5 text-slate-500 font-mono tracking-widest text-[9px] sm:text-[10px]">
      <div className="size-1.5 rounded-full bg-slate-700/50" />
      <span className="text-slate-400">LOCAL TIME • {time || "..."}</span>
    </div>
  );
};

export default LocalTime;