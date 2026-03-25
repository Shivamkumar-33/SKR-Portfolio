// Base theme with shared values
const baseTheme = {
  fonts: {
    montserrat: "'Montserrat', sans-serif",
    cardo: "'Cardo', serif",
  },
  CTA: {
    primary: "#fa2904",
    secondary: "#4356ff",
  },
  breakpoints: {
    lg: "64rem",
    md: "58.125rem",
    tablet: "64rem",
    sm: "48rem",
    xs: "31.25rem",
  },
};

// Dark theme (original)
export const darkTheme = {
  ...baseTheme,
  mode: 'dark',
  backgroundColor: {
    dark: "#0d0e0e",
    light: "#ffffff",
    orange: "#fc2904",
    darkGray: "#111",
    primary: "#0d0e0e",
    secondary: "#111",
    card: "#1a1a1a",
  },
  color: {
    dark: "#000000",
    darkGray: "#262637",
    lightGray: "#aaa",
    light: "#fff",
    secondaryLight: "#f1f1f1",
    tertiaryLight: "#d3d3d3",
    link: "#4353ff",
    text: "#fff",
    textSecondary: "#aaa",
  },
  border: {
    default: "#333",
    subtle: "#1a1a1a",
  },
};

// Default export for backward compatibility
export const theme = darkTheme;
