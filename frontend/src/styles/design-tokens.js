/**
 * Design tokens for ShieldHer platform.
 * Enhanced with accessibility, animations, and modern design system.
 */

export const colors = {
  // Primary - Empowering purple gradient (updated for better contrast)
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',  // Main primary - better contrast
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },

  // Secondary - Calming rose for warmth and support
  secondary: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',  // Main secondary
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },

  // Accent - Teal for positive actions and progress
  accent: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',  // Main accent
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },

  // Neutral - True grays for better readability
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },

  // Semantic colors with WCAG AA compliance
  success: {
    light: '#22c55e',
    main: '#16a34a',
    dark: '#15803d',
    bg: '#f0fdf4',
    text: '#166534',
  },
  warning: {
    light: '#fbbf24',
    main: '#f59e0b',
    dark: '#d97706',
    bg: '#fffbeb',
    text: '#92400e',
  },
  error: {
    light: '#f87171',
    main: '#ef4444',
    dark: '#dc2626',
    bg: '#fef2f2',
    text: '#991b1b',
  },
  info: {
    light: '#60a5fa',
    main: '#3b82f6',
    dark: '#2563eb',
    bg: '#eff6ff',
    text: '#1e40af',
  },

  // Emergency - High visibility for critical actions
  emergency: {
    main: '#dc2626',
    hover: '#b91c1c',
    active: '#991b1b',
    bg: '#fee2e2',
  },

  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f4f4f5',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Dark mode support
  dark: {
    background: {
      primary: '#18181b',
      secondary: '#27272a',
      tertiary: '#3f3f46',
    },
    text: {
      primary: '#fafafa',
      secondary: '#d4d4d8',
      tertiary: '#a1a1aa',
    },
  },
};

export const typography = {
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    display: ['Poppins', 'Inter', 'sans-serif'],
    mono: ['Fira Code', 'Consolas', 'monospace'],
  },

  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const spacing = {
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',   // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',    // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',   // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
};

export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
};

export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

export const transitions = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Accessibility helpers
export const accessibility = {
  focusRing: {
    default: '0 0 0 3px rgba(139, 92, 246, 0.5)', // primary-500 with opacity
    error: '0 0 0 3px rgba(239, 68, 68, 0.5)',
    success: '0 0 0 3px rgba(34, 197, 94, 0.5)',
  },
  minTouchTarget: '44px', // WCAG 2.1 Level AAA
};

export default {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  borderRadius,
  transitions,
  zIndex,
  accessibility,
};
