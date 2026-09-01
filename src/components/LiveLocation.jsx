import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeriscope } from "@fortawesome/free-brands-svg-icons";
import { motion as Motion, useReducedMotion } from "motion/react";

const LiveLocation = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="live-location flex flex-col items-center gap-3 text-center"
    >
      <Motion.span
        className="live-location-pin relative inline-flex items-center justify-center"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -3, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
        }
      >
        <FontAwesomeIcon
          icon={faPeriscope}
          className="live-location-pin-icon relative z-10"
        />
        <span className="live-location-pin-glow" aria-hidden />
      </Motion.span>

      <div className="live-location-copy flex flex-col items-center leading-[1.2]">
        <span className="live-location-primary">Based in Delhi,</span>
        <span className="live-location-secondary">India</span>
      </div>
    </Motion.div>
  );
};

export default LiveLocation;
