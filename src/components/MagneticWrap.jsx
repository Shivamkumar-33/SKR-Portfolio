import { useRef, useCallback } from "react";

/**
 * MagneticWrap — A wrapper that makes its children feel "magnetically" attracted
 * to the cursor on hover, then snaps back with a spring-like ease on leave.
 *
 * @param {number}  strength  - Pixel magnitude of max pull (default 12)
 * @param {string}  className - Extra classes for the outer wrapper
 * @param {object}  style     - Extra inline styles
 * @param {React.ReactNode} children
 */
const MagneticWrap = ({ children, strength = 12, className = "", style, ...rest }) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = ((e.clientX - centerX) / (rect.width / 2)) * strength;
      const deltaY = ((e.clientY - centerY) / (rect.height / 2)) * strength;

      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-wrap ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default MagneticWrap;
