// Mock framer-motion for Jest tests
import React from 'react';

const createMotionComponent = (tag) => {
  const Component = React.forwardRef(({ children, ...props }, ref) => {
    // Remove framer-motion specific props
    const {
      initial,
      animate,
      exit,
      variants,
      whileHover,
      whileTap,
      whileInView,
      viewport,
      transition,
      layout,
      layoutId,
      ...validProps
    } = props;
    return React.createElement(tag, { ref, ...validProps }, children);
  });
  Component.displayName = `motion.${tag}`;
  return Component;
};

// Create motion object with common HTML elements
export const motion = new Proxy({}, {
  get: (target, prop) => {
    if (typeof prop === 'string') {
      return createMotionComponent(prop);
    }
    return target[prop];
  }
});

export const AnimatePresence = ({ children }) => <>{children}</>;
export const useAnimation = () => ({
  start: jest.fn(),
  stop: jest.fn(),
  set: jest.fn(),
});
export const useMotionValue = (initial) => ({
  get: () => initial,
  set: jest.fn(),
  onChange: jest.fn(),
});
export const useTransform = () => ({
  get: () => 0,
  set: jest.fn(),
});
export const useSpring = () => ({
  get: () => 0,
  set: jest.fn(),
});
export const useInView = () => [null, true];
export const useScroll = () => ({
  scrollX: { get: () => 0 },
  scrollY: { get: () => 0 },
  scrollXProgress: { get: () => 0 },
  scrollYProgress: { get: () => 0 },
});
