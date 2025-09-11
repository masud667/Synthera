/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#4f46e5",   
          "secondary": "#ec4899", 
          "accent": "#f59e0b",    
          "neutral": "#f3f4f6",   
          "base-100": "#ffffff",
        },
      },
      {
        dark: {
          "primary": "#6366f1",   // Indigo-500
          "secondary": "#db2777", // Pink-600
          "accent": "#fbbf24",    // Amber-400
          "neutral": "#111827",   // Gray-900
          "base-100": "#1f2937",
        },
      },
    ], 
  },
}
