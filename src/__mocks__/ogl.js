// Mock for ogl library - WebGL doesn't work in Jest/jsdom
export const Camera = jest.fn(() => ({
  fov: 45,
  position: { z: 20 },
  perspective: jest.fn(),
  aspect: 1,
}));

export const Mesh = jest.fn(() => ({
  setParent: jest.fn(),
  position: { x: 0, y: 0, z: 0 },
  rotation: { z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  program: {
    uniforms: {
      uPlaneSizes: { value: [0, 0] },
      uImageSizes: { value: [0, 0] },
      uTime: { value: 0 },
      uSpeed: { value: 0 },
    },
  },
}));

export const Plane = jest.fn(() => ({}));

export const Program = jest.fn(() => ({
  uniforms: {
    tMap: { value: null },
    uPlaneSizes: { value: [0, 0] },
    uImageSizes: { value: [0, 0] },
    uSpeed: { value: 0 },
    uTime: { value: 0 },
    uBorderRadius: { value: 0 },
  },
}));

const mockCanvas = document.createElement('canvas');
mockCanvas.width = 800;
mockCanvas.height = 600;

const mockGl = {
  canvas: mockCanvas,
  clearColor: jest.fn(),
  clear: jest.fn(),
  viewport: jest.fn(),
  enable: jest.fn(),
  disable: jest.fn(),
  blendFunc: jest.fn(),
  drawingBufferWidth: 800,
  drawingBufferHeight: 600,
};

export const Renderer = jest.fn(() => ({
  gl: mockGl,
  setSize: jest.fn(),
  render: jest.fn(),
}));

export const Texture = jest.fn(() => ({
  image: null,
}));

export const Transform = jest.fn(() => ({}));
