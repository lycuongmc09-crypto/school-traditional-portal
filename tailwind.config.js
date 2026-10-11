/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        harvard: {
          crimson: "#A51C30",
          crimsonDark: "#801424",
          crimsonDeep: "#4E0A14",
          crimsonNight: "#2A050A",
          crimsonLight: "#FBF0F2",
          gold: "#C29B38",
          goldLight: "#DFB15B",
          goldBright: "#D4AF37",
          goldPale: "#F9F4E8",
          ink: "#1A1615",
          inkLight: "#38322F",
          muted: "#665E5A",
          paper: "#FAF7F2",
          parchment: "#F4EEE3",
          parchmentDark: "#E8DEC9",
          border: "#E4DCD0",
          borderGold: "#D8C7A5",
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-be-vietnam)', 'Be Vietnam Pro', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'vitrine': '0 20px 40px -15px rgba(26, 22, 21, 0.25), 0 0 0 1px rgba(194, 155, 56, 0.25)',
        'vitrine-hover': '0 25px 50px -12px rgba(78, 10, 20, 0.28), 0 0 0 1.5px rgba(194, 155, 56, 0.65)',
        'plaque': 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 2px 5px rgba(0, 0, 0, 0.15)',
        'academic': '0 10px 30px -5px rgba(26, 22, 21, 0.08), 0 0 0 1px rgba(228, 220, 208, 0.8)',
      },
    },
  },
  plugins: [],
};
